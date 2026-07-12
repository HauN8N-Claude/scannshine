import { prisma } from "@/lib/prisma";

const GRACE_PERIOD_DAYS = 7;

export const getBusinessBySlug = async (slug: string) => {
  return prisma.business.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      logoUrl: true,
      brandColor: true,
      googlePlaceId: true,
      subscriptionStatus: true,
      cancelledAt: true,
    },
  });
};

export type PublicBusiness = NonNullable<
  Awaited<ReturnType<typeof getBusinessBySlug>>
>;

/**
 * Le funnel public reste servi même si l'abonnement est expiré (un QR mort en
 * caisse détruirait la confiance) — sauf annulation depuis plus de 7 jours.
 */
export const isFunnelActive = (business: {
  subscriptionStatus: PublicBusiness["subscriptionStatus"];
  cancelledAt: Date | null;
}): boolean => {
  if (business.subscriptionStatus !== "CANCELLED") return true;
  if (!business.cancelledAt) return true;
  const graceEnd = new Date(business.cancelledAt);
  graceEnd.setDate(graceEnd.getDate() + GRACE_PERIOD_DAYS);
  return graceEnd > new Date();
};

export const getBusinessByUserId = async (userId: string) => {
  return prisma.business.findUnique({
    where: { userId },
  });
};
