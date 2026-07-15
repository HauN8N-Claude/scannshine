import type { SubStatus } from "@/generated/prisma";
import { getDodoClient, isDodoConfigured } from "@/lib/dodo";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

/**
 * Cron C3 — filet de sécurité contre un webhook Dodo manqué.
 *
 * Fonctionnement normal : Dodo pilote tout par webhooks (essai → actif à J+7,
 * impayé, annulation). Si un webhook se perd, un compte peut rester coincé dans
 * un état obsolète. Ce cron quotidien réconcilie les états à risque avec la
 * vérité côté Dodo (source d'autorité), pour les rattraper.
 *
 * Cibles : essais dont la fin est dépassée (conversion peut-être manquée) et
 * comptes en impayé (peuvent avoir été régularisés ou définitivement annulés).
 * On ne touche JAMAIS un CANCELLED (état terminal) ni un ONBOARDING (pas
 * d'abonnement Dodo). Déclenché par Vercel Cron (voir vercel.json).
 */

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// On laisse d'abord ~24 h au webhook pour faire son travail avant de rattraper.
const GRACE_MS = 24 * 60 * 60 * 1000;
const MAX_PER_RUN = 100;

// Statut Dodo → statut interne. `pending`/inconnu ⇒ null (on ne touche pas).
const mapDodoStatus = (status: string): SubStatus | null => {
  switch (status) {
    case "active":
      return "ACTIVE";
    case "on_hold":
    case "failed":
      return "PAST_DUE";
    case "cancelled":
    case "expired":
      return "CANCELLED";
    default:
      return null;
  }
};

type Candidate = {
  id: string;
  subscriptionStatus: SubStatus;
  dodoSubscriptionId: string | null;
  cancelledAt: Date | null;
};

/**
 * Réconcilie UN commerce avec Dodo. Renvoie le changement appliqué, ou null si
 * rien à faire (état déjà à jour, statut Dodo en attente, ou échec API).
 */
const reconcileOne = async (
  client: ReturnType<typeof getDodoClient>,
  business: Candidate,
  now: Date,
): Promise<{ businessId: string; from: SubStatus; to: SubStatus } | null> => {
  if (!business.dodoSubscriptionId) return null;
  try {
    const sub = await client.subscriptions.retrieve(
      business.dodoSubscriptionId,
    );
    const target = mapDodoStatus(sub.status);
    if (!target || target === business.subscriptionStatus) return null;

    await prisma.business.update({
      where: { id: business.id },
      data: {
        subscriptionStatus: target,
        // ACTIVE termine l'onboarding (défense en profondeur) et efface la fin
        // d'essai / la date d'annulation ; CANCELLED fige la date.
        onboardingStep: target === "ACTIVE" ? 4 : undefined,
        trialEndsAt: target === "ACTIVE" ? null : undefined,
        cancelledAt:
          target === "CANCELLED"
            ? (business.cancelledAt ??
              (sub.cancelled_at ? new Date(sub.cancelled_at) : now))
            : target === "ACTIVE"
              ? null
              : undefined,
      },
    });

    logger.info("[cron reconcile] statut réconcilié", {
      businessId: business.id,
      from: business.subscriptionStatus,
      to: target,
    });
    return { businessId: business.id, from: business.subscriptionStatus, to: target };
  } catch (error) {
    logger.error("[cron reconcile] échec sur un abonnement", {
      businessId: business.id,
      error,
    });
    return null;
  }
};

export const GET = async (request: NextRequest) => {
  // Auth : Vercel Cron ajoute `Authorization: Bearer <CRON_SECRET>` quand la
  // variable CRON_SECRET est définie. Sans secret configuré → 503 (fail-closed).
  const secret = env.CRON_SECRET;
  if (!secret) {
    logger.error("[cron reconcile] CRON_SECRET manquant — rejeté (503)");
    return Response.json({ error: "Cron non configuré" }, { status: 503 });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  if (!isDodoConfigured()) {
    return Response.json({ skipped: "Dodo non configuré", checked: 0, updated: 0 });
  }

  const now = new Date();
  const cutoff = new Date(now.getTime() - GRACE_MS);

  const candidates = await prisma.business.findMany({
    where: {
      dodoSubscriptionId: { not: null },
      OR: [
        { subscriptionStatus: "TRIALING", trialEndsAt: { lt: cutoff } },
        { subscriptionStatus: "PAST_DUE" },
      ],
    },
    select: {
      id: true,
      subscriptionStatus: true,
      dodoSubscriptionId: true,
      cancelledAt: true,
    },
    take: MAX_PER_RUN,
  });

  const client = getDodoClient();
  const changes: { businessId: string; from: SubStatus; to: SubStatus }[] = [];

  // Séquentiel volontaire : appels à l'API Dodo un par un pour rester poli avec
  // ses limites de débit. Le nombre réel de candidats par jour est très faible.
  for (const business of candidates) {
    // eslint-disable-next-line no-await-in-loop
    const change = await reconcileOne(client, business, now);
    if (change) changes.push(change);
  }

  return Response.json({
    checked: candidates.length,
    updated: changes.length,
    changes,
  });
};
