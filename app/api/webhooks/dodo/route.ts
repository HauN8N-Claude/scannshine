import type { SubStatus } from "@/generated/prisma";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { Webhooks } from "@dodopayments/nextjs";
import type { NextRequest } from "next/server";

export const maxDuration = 60;

type SubscriptionPayload = {
  subscription_id: string;
  customer?: { customer_id?: string } | null;
  metadata?: Record<string, unknown> | null;
  status?: string | null;
  next_billing_date?: Date | string | null;
  cancelled_at?: Date | string | null;
  created_at?: Date | string | null;
};

// Rang de chaque état dans le cycle de vie, pour ignorer un webhook qui
// tenterait de ré-avancer un abonnement déjà annulé (livraison hors-ordre).
const STATE_RANK: Record<SubStatus, number> = {
  ONBOARDING: 0,
  TRIALING: 1,
  ACTIVE: 2,
  PAST_DUE: 3,
  CANCELLED: 4,
};

/**
 * Retrouve le Business ciblé : d'abord par metadata.businessId (posé au
 * checkout), sinon par identifiants Dodo déjà connus.
 */
const findBusiness = async (payload: SubscriptionPayload) => {
  const businessId = payload.metadata?.businessId;
  if (typeof businessId === "string" && businessId.length > 0) {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      select: { id: true, subscriptionStatus: true, cancelledAt: true },
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
    select: { id: true, subscriptionStatus: true, cancelledAt: true },
  });
};

const applySubscriptionState = async (
  payload: SubscriptionPayload,
  target: SubStatus,
) => {
  const business = await findBusiness(payload);

  if (!business) {
    logger.error("[dodo webhook] Business introuvable", {
      subscriptionId: payload.subscription_id,
    });
    return;
  }

  // Le statut TRIALING vient EXCLUSIVEMENT du payload Dodo, jamais déduit des
  // dates : un renouvellement post-essai arrive avec status="active" et ne doit
  // pas repiéger un client payant en essai.
  const nextStatus: SubStatus =
    target === "ACTIVE" && payload.status === "trialing" ? "TRIALING" : target;

  // Anti-régression : un CANCELLED ne peut pas être ré-activé par un événement
  // en retard. On n'autorise ACTIVE/TRIALING que si l'état courant est antérieur.
  const current = business.subscriptionStatus;
  if (
    current === "CANCELLED" &&
    nextStatus !== "CANCELLED" &&
    STATE_RANK[nextStatus] < STATE_RANK.CANCELLED
  ) {
    logger.info("[dodo webhook] événement ignoré (abonnement déjà annulé)", {
      businessId: business.id,
      attempted: nextStatus,
    });
    return;
  }

  await prisma.business.update({
    where: { id: business.id },
    data: {
      dodoCustomerId: payload.customer?.customer_id ?? undefined,
      dodoSubscriptionId: payload.subscription_id,
      subscriptionStatus: nextStatus,
      trialEndsAt:
        nextStatus === "TRIALING" && payload.next_billing_date
          ? new Date(payload.next_billing_date)
          : undefined,
      cancelledAt:
        nextStatus === "CANCELLED"
          ? // Ne pas faire glisser la fenêtre de grâce sur un retry : on garde
            // la première date d'annulation connue.
            (business.cancelledAt ??
            (payload.cancelled_at ? new Date(payload.cancelled_at) : new Date()))
          : null,
    },
  });

  logger.info("[dodo webhook] Business mis à jour", {
    businessId: business.id,
    status: nextStatus,
  });
};

const webhookKey = env.DODO_PAYMENTS_WEBHOOK_KEY;

const dodoWebhookHandler = Webhooks({
  webhookKey: webhookKey ?? "dev-unset-key",
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

// La clé est vérifiée à la requête (pas au chargement du module) pour ne pas
// casser le build tant que le compte Dodo n'est pas configuré. Sans clé en
// production : 503 explicite, jamais de webhook accepté sans signature.
export const POST = async (request: NextRequest) => {
  if (!webhookKey) {
    logger.error(
      "[dodo webhook] DODO_PAYMENTS_WEBHOOK_KEY manquant — webhook rejeté (503)",
    );
    return new Response("Webhook non configuré", { status: 503 });
  }
  return dodoWebhookHandler(request);
};
