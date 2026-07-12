import { prisma } from "@/lib/prisma";
import { cache } from "react";

const GRACE_PERIOD_DAYS = 7;

// cache() : dédup par requête HTTP (generateMetadata + page appellent ceci).
export const getBusinessBySlug = cache(async (slug: string) => {
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
});

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
  // Fail-safe : un CANCELLED sans date d'annulation (import/manuel) est expiré,
  // pas servi indéfiniment.
  if (!business.cancelledAt) return false;
  const graceEnd = new Date(business.cancelledAt);
  graceEnd.setDate(graceEnd.getDate() + GRACE_PERIOD_DAYS);
  return graceEnd > new Date();
};

// cache() : dédup par requête HTTP (layout + page appellent ceci).
export const getBusinessByUserId = cache(async (userId: string) => {
  return prisma.business.findUnique({
    where: { userId },
  });
});
