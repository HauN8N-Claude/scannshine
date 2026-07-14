"use cache";

import { startOfMonthPF } from "@/lib/date/pf-timezone";
import { prisma } from "@/lib/prisma";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

const DAY_MS = 24 * 60 * 60 * 1000;

export type OpsBusiness = {
  id: string;
  name: string;
  slug: string;
  ownerEmail: string;
  trialEndsAt: Date | null;
  createdAt: Date;
  status: "TRIALING" | "ACTIVE";
};

export type OpsSnapshot = {
  /** Essais qui se terminent sous 3 jours (relance / suivi conversion). */
  expiringTrials: OpsBusiness[];
  /** Abonnés/essais sans aucun scan depuis 30 j (risque de churn). */
  inactiveBusinesses: OpsBusiness[];
  /** Comptes bloqués avant paiement (inscription non finalisée). */
  onboardingCount: number;
  /** Annulations enregistrées depuis le début du mois (fuseau Tahiti). */
  cancelledThisMonth: number;
  /** Abonnés payants actuels (base du taux de churn). */
  activeCount: number;
  /** Taux de churn approximatif du mois = annulations / (actifs + annulations). */
  churnRatePct: number | null;
};

/**
 * Instantané opérationnel pour piloter le SaaS au quotidien (vue owner).
 * Toutes les données sont déjà en base — coût faible, mis en cache à l'heure.
 *
 * ⚠️ Le churn est approximé : faute d'historiser les transitions d'abonnement,
 * on compte les `cancelledAt` du mois courant. Source de vérité fine : Dodo.
 */
export async function getOpsSnapshot(): Promise<OpsSnapshot> {
  cacheLife("hours");

  const now = new Date();
  const in3Days = new Date(now.getTime() + 3 * DAY_MS);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * DAY_MS);
  const sevenDaysAgo = new Date(now.getTime() - 7 * DAY_MS);
  const monthStart = startOfMonthPF(now);

  const [
    expiringRaw,
    onboardingCount,
    cancelledThisMonth,
    activeCount,
    liveBusinesses,
    scanGroups,
  ] = await Promise.all([
    // Essais expirant sous 3 jours.
    prisma.business.findMany({
      where: {
        subscriptionStatus: "TRIALING",
        trialEndsAt: { gte: now, lte: in3Days },
      },
      orderBy: { trialEndsAt: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        trialEndsAt: true,
        createdAt: true,
        subscriptionStatus: true,
        user: { select: { email: true } },
      },
    }),
    prisma.business.count({ where: { subscriptionStatus: "ONBOARDING" } }),
    prisma.business.count({
      where: {
        subscriptionStatus: "CANCELLED",
        cancelledAt: { gte: monthStart },
      },
    }),
    prisma.business.count({ where: { subscriptionStatus: "ACTIVE" } }),
    // Commerces « vivants » installés depuis > 7 j (on ne flague pas un compte
    // du jour même) — candidats au calcul d'inactivité.
    prisma.business.findMany({
      where: {
        subscriptionStatus: { in: ["ACTIVE", "TRIALING"] },
        createdAt: { lt: sevenDaysAgo },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        trialEndsAt: true,
        createdAt: true,
        subscriptionStatus: true,
        user: { select: { email: true } },
      },
    }),
    // Business ayant AU MOINS un scan sur 30 j.
    prisma.scanEvent.groupBy({
      by: ["businessId"],
      where: { type: "SCAN", createdAt: { gte: thirtyDaysAgo } },
      _count: { _all: true },
    }),
  ]);

  const activeBusinessIds = new Set(
    scanGroups.map((group) => group.businessId),
  );

  const toOps = (business: {
    id: string;
    name: string;
    slug: string;
    trialEndsAt: Date | null;
    createdAt: Date;
    subscriptionStatus: string;
    user: { email: string };
  }): OpsBusiness => ({
    id: business.id,
    name: business.name,
    slug: business.slug,
    ownerEmail: business.user.email,
    trialEndsAt: business.trialEndsAt,
    createdAt: business.createdAt,
    status: business.subscriptionStatus === "ACTIVE" ? "ACTIVE" : "TRIALING",
  });

  const inactiveBusinesses = liveBusinesses
    .filter((business) => !activeBusinessIds.has(business.id))
    .map(toOps);

  const churnBase = activeCount + cancelledThisMonth;
  const churnRatePct =
    churnBase > 0 ? Math.round((cancelledThisMonth / churnBase) * 100) : null;

  return {
    expiringTrials: expiringRaw.map(toOps),
    inactiveBusinesses,
    onboardingCount,
    cancelledThisMonth,
    activeCount,
    churnRatePct,
  };
}
