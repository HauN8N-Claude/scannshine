"use cache";

import { SCANNSHINE_PLAN } from "@/lib/dodo";
import { prisma } from "@/lib/prisma";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

export type MrrDataPoint = {
  date: string;
  mrr: number;
};

export type UserGrowthDataPoint = {
  date: string;
  count: number;
  total: number;
};

/**
 * MRR approximé : nombre de Business PAYANTS (ACTIVE — les essais TRIALING sont
 * exclus, ils ne paient pas) × prix mensuel, projeté par mois via la date
 * d'inscription.
 *
 * ⚠️ Approximation : faute d'historiser les transitions d'abonnement, cette
 * courbe ne reflète PAS le churn passé (un client annulé n'apparaît pas dans
 * les mois où il était pourtant actif). Source de vérité fine du revenu :
 * le dashboard Dodo Payments.
 */
export async function getMrrHistory(): Promise<MrrDataPoint[]> {
  cacheLife("hours");

  const now = new Date();

  const businesses = await prisma.business.findMany({
    where: { subscriptionStatus: "ACTIVE" },
    select: { createdAt: true },
  });

  const points: MrrDataPoint[] = [];

  for (let i = 5; i >= 0; i--) {
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    const key = `${endOfMonth.getFullYear()}-${String(endOfMonth.getMonth() + 1).padStart(2, "0")}`;
    const activeCount = businesses.filter(
      (business) => business.createdAt <= endOfMonth,
    ).length;
    points.push({ date: key, mrr: activeCount * SCANNSHINE_PLAN.priceEur });
  }

  return points;
}

export async function getUserGrowth(): Promise<UserGrowthDataPoint[]> {
  cacheLife("hours");

  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const users = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const existingUsersCount = await prisma.user.count({
    where: {
      createdAt: {
        lt: sixMonthsAgo,
      },
    },
  });

  const monthlyData: Record<string, number> = {};

  for (let i = 0; i < 6; i++) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthlyData[key] = 0;
  }

  for (const user of users) {
    const date = user.createdAt;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (key in monthlyData) {
      monthlyData[key]++;
    }
  }

  const sortedKeys = Object.keys(monthlyData).sort();
  let runningTotal = existingUsersCount;

  return sortedKeys.map((date) => {
    const count = monthlyData[date];
    runningTotal += count;
    return {
      date,
      count,
      total: runningTotal,
    };
  });
}
