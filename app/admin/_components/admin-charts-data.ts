"use cache";

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

// Prix mensuel de l'abonnement ScanNShine en EUR (3 990 XPF)
const MONTHLY_PRICE_EUR = 33.5;

/**
 * MRR approximé depuis la base : nombre de Business actifs (ACTIVE/TRIALING)
 * créés avant la fin de chaque mois × prix mensuel. Source de vérité fine :
 * le dashboard Dodo Payments.
 */
export async function getMrrHistory(): Promise<MrrDataPoint[]> {
  cacheLife("hours");

  const now = new Date();

  const businesses = await prisma.business.findMany({
    where: {
      subscriptionStatus: { in: ["ACTIVE", "TRIALING"] },
    },
    select: { createdAt: true },
  });

  const points: MrrDataPoint[] = [];

  for (let i = 5; i >= 0; i--) {
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    const key = `${endOfMonth.getFullYear()}-${String(endOfMonth.getMonth() + 1).padStart(2, "0")}`;
    const activeCount = businesses.filter(
      (business) => business.createdAt <= endOfMonth,
    ).length;
    points.push({ date: key, mrr: activeCount * MONTHLY_PRICE_EUR });
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
