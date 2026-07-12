import type { ScanType } from "@/generated/prisma";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

const DEDUP_WINDOW_MS = 60 * 60 * 1000; // 1 heure

/**
 * Enregistre un événement du funnel, dédupliqué par visiteur sur 1 h
 * (un client qui re-scanne ou recharge la page ne compte qu'une fois).
 * Ne doit jamais faire échouer la page publique — les erreurs sont loguées.
 */
export const logScanEvent = async ({
  businessId,
  type,
  visitorHash,
}: {
  businessId: string;
  type: ScanType;
  visitorHash: string;
}): Promise<void> => {
  try {
    const existing = await prisma.scanEvent.findFirst({
      where: {
        businessId,
        type,
        visitorHash,
        createdAt: { gte: new Date(Date.now() - DEDUP_WINDOW_MS) },
      },
      select: { id: true },
    });

    if (existing) return;

    await prisma.scanEvent.create({
      data: { businessId, type, visitorHash },
    });
  } catch (error) {
    logger.error("[logScanEvent] failed", { error, businessId, type });
  }
};
