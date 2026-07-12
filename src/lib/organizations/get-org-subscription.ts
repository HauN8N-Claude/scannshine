import type { Subscription } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { redisClient } from "@/lib/redis";
import { CacheKeys, CacheTTL } from "@/lib/redis-keys";
import type { OverrideLimits, PlanLimit } from "../auth/stripe/auth-plans";
import { getPlanLimits } from "../auth/stripe/auth-plans";
import { logger } from "../logger";

/**
 * ScanNShine : la facturation est gérée par Dodo Payments sur le modèle
 * Business (user-scoped). Les abonnements d'organisation sont dormants —
 * cette fonction ne lit plus que la base, sans vérification Stripe.
 */
export const getOrgActiveSubscription = async (
  organizationId: string,
): Promise<
  | (Subscription & {
      status: string | null;
      cancelAtPeriodEnd: boolean | null;
      limits: PlanLimit;
    })
  | null
> => {
  const cacheKey = CacheKeys.orgSubscription(organizationId);

  try {
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    logger.error("[Cache Error] getOrgActiveSubscription:", error);
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      referenceId: organizationId,
      OR: [
        { status: "active" },
        { status: "trialing" },
        { status: "past_due" },
      ],
    },
  });

  if (!subscription) {
    return null;
  }

  const result = {
    ...subscription,
    status: subscription.status,
    cancelAtPeriodEnd: subscription.cancelAtPeriodEnd ?? null,
    limits: getPlanLimits(
      subscription.plan,
      subscription.overrideLimits as OverrideLimits | null,
    ),
  };

  try {
    await redisClient.setex(
      cacheKey,
      CacheTTL.ORG_SUBSCRIPTION,
      JSON.stringify(result),
    );
  } catch (cacheError) {
    logger.error("[Cache Error] setex getOrgActiveSubscription:", cacheError);
  }

  return result;
};
