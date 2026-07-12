import type { SubStatus } from "@/generated/prisma";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { Webhooks } from "@dodopayments/nextjs";

export const maxDuration = 60;

type SubscriptionPayload = {
  subscription_id: string;
  customer?: { customer_id?: string } | null;
  metadata?: Record<string, unknown> | null;
  status?: string | null;
  trial_period_days?: number | null;
  next_billing_date?: Date | string | null;
  cancelled_at?: Date | string | null;
};

/**
 * Retrouve le Business ciblé : d'abord par metadata.businessId (posé au
 * checkout), sinon par identifiants Dodo déjà connus. Idempotent : chaque
 * handler pose un état absolu, un retry Dodo ne change rien.
 */
const findBusiness = async (payload: SubscriptionPayload) => {
  const businessId = payload.metadata?.businessId;
  if (typeof businessId === "string" && businessId.length > 0) {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      select: { id: true },
    });
    if (business) return business;
  }

  return prisma.business.findFirst({
    where: {
      OR: [
        { dodoSubscriptionId: payload.subscription_id },
        ...(payload.customer?.customer_id
          ? [{ dodoCustomerId: payload.customer.customer_id }]
          : []),
      ],
    },
    select: { id: true },
  });
};

const applySubscriptionState = async (
  payload: SubscriptionPayload,
  status: SubStatus,
) => {
  const business = await findBusiness(payload);

  if (!business) {
    logger.error("[dodo webhook] Business introuvable", {
      subscriptionId: payload.subscription_id,
      metadata: payload.metadata,
    });
    return;
  }

  const isTrial =
    status === "ACTIVE" &&
    typeof payload.trial_period_days === "number" &&
    payload.trial_period_days > 0 &&
    payload.next_billing_date &&
    new Date(payload.next_billing_date) > new Date();

  await prisma.business.update({
    where: { id: business.id },
    data: {
      dodoCustomerId: payload.customer?.customer_id ?? undefined,
      dodoSubscriptionId: payload.subscription_id,
      subscriptionStatus: isTrial ? "TRIALING" : status,
      trialEndsAt:
        isTrial && payload.next_billing_date
          ? new Date(payload.next_billing_date)
          : undefined,
      cancelledAt:
        status === "CANCELLED"
          ? payload.cancelled_at
            ? new Date(payload.cancelled_at)
            : new Date()
          : null,
    },
  });

  logger.info("[dodo webhook] Business mis à jour", {
    businessId: business.id,
    status: isTrial ? "TRIALING" : status,
  });
};

export const POST = Webhooks({
  webhookKey: env.DODO_PAYMENTS_WEBHOOK_KEY ?? "",
  onSubscriptionActive: async (payload) => {
    await applySubscriptionState(payload.data, "ACTIVE");
  },
  onSubscriptionRenewed: async (payload) => {
    await applySubscriptionState(payload.data, "ACTIVE");
  },
  onSubscriptionPlanChanged: async (payload) => {
    await applySubscriptionState(payload.data, "ACTIVE");
  },
  onSubscriptionOnHold: async (payload) => {
    await applySubscriptionState(payload.data, "PAST_DUE");
  },
  onSubscriptionFailed: async (payload) => {
    await applySubscriptionState(payload.data, "PAST_DUE");
  },
  onSubscriptionCancelled: async (payload) => {
    await applySubscriptionState(payload.data, "CANCELLED");
  },
  onSubscriptionExpired: async (payload) => {
    await applySubscriptionState(payload.data, "CANCELLED");
  },
  onPayload: async (payload) => {
    logger.debug("[dodo webhook] event reçu", { type: payload.type });
  },
});
