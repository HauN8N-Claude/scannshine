import { startOfDayPF, toDayKeyPF } from "@/lib/date/pf-timezone";
import { prisma } from "@/lib/prisma";

export type StatsPeriod = 7 | 30 | 90;

export type DailyPoint = {
  date: string;
  scans: number;
  clicks: number;
};

export type BusinessStats = {
  scans: number;
  clicks: number;
  feedbacks: number;
  contacts: number;
  previous: {
    scans: number;
    clicks: number;
    feedbacks: number;
    contacts: number;
  };
  daily: DailyPoint[];
};

export const getBusinessStats = async (
  businessId: string,
  period: StatsPeriod,
): Promise<BusinessStats> => {
  const now = new Date();
  const periodStart = startOfDayPF(
    new Date(now.getTime() - (period - 1) * 24 * 60 * 60 * 1000),
  );
  const previousStart = new Date(
    periodStart.getTime() - period * 24 * 60 * 60 * 1000,
  );

  const [events, previousEvents, contacts, previousContacts] =
    await Promise.all([
      prisma.scanEvent.findMany({
        where: { businessId, createdAt: { gte: periodStart } },
        select: { type: true, createdAt: true },
      }),
      prisma.scanEvent.groupBy({
        by: ["type"],
        where: {
          businessId,
          createdAt: { gte: previousStart, lt: periodStart },
        },
        _count: { _all: true },
      }),
      prisma.contact.count({
        where: { businessId, createdAt: { gte: periodStart } },
      }),
      prisma.contact.count({
        where: {
          businessId,
          createdAt: { gte: previousStart, lt: periodStart },
        },
      }),
    ]);

  const counts = { SCAN: 0, CLICK_GOOGLE: 0, FEEDBACK_PRIVATE: 0 };
  const dailyMap = new Map<string, { scans: number; clicks: number }>();

  for (let i = 0; i < period; i++) {
    const day = new Date(periodStart.getTime() + i * 24 * 60 * 60 * 1000);
    dailyMap.set(toDayKeyPF(day), { scans: 0, clicks: 0 });
  }

  for (const event of events) {
    counts[event.type]++;
    const key = toDayKeyPF(event.createdAt);
    const bucket = dailyMap.get(key);
    if (!bucket) continue;
    if (event.type === "SCAN") bucket.scans++;
    if (event.type === "CLICK_GOOGLE") bucket.clicks++;
  }

  const previousCounts = { SCAN: 0, CLICK_GOOGLE: 0, FEEDBACK_PRIVATE: 0 };
  for (const group of previousEvents) {
    previousCounts[group.type] = group._count._all;
  }

  return {
    scans: counts.SCAN,
    clicks: counts.CLICK_GOOGLE,
    feedbacks: counts.FEEDBACK_PRIVATE,
    contacts,
    previous: {
      scans: previousCounts.SCAN,
      clicks: previousCounts.CLICK_GOOGLE,
      feedbacks: previousCounts.FEEDBACK_PRIVATE,
      contacts: previousContacts,
    },
    daily: [...dailyMap.entries()].map(([date, values]) => ({
      date,
      ...values,
    })),
  };
};
