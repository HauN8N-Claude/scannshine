import { buildWriteReviewUrl } from "@/lib/place-id";
import { logScanEvent } from "@/lib/scan-events";
import { getVisitorHash } from "@/lib/visitor-hash";
import { route } from "@/lib/zod-route";
import { getBusinessBySlug } from "@/query/business/get-business";
import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Branche 😊 du funnel : log du clic puis redirection vers le formulaire
 * d'avis Google. Route publique, zéro JS côté client.
 */
export const GET = route
  .params(z.object({ slug: z.string() }))
  .handler(async (req, { params }) => {
    const business = await getBusinessBySlug(params.slug);

    if (!business?.googlePlaceId) {
      return NextResponse.redirect(new URL(`/r/${params.slug}`, req.url));
    }

    const visitorHash = await getVisitorHash();
    await logScanEvent({
      businessId: business.id,
      type: "CLICK_GOOGLE",
      visitorHash,
    });

    return NextResponse.redirect(buildWriteReviewUrl(business.googlePlaceId));
  });
