import { ZodRouteError } from "@/lib/errors/zod-route-error";
import { ChevaletPdf, StickerPdf } from "@/lib/pdf-templates";
import { prisma } from "@/lib/prisma";
import { generateQrPngDataUrl, getCollectUrl } from "@/lib/qr";
import { authRoute } from "@/lib/zod-route";
import type { DocumentProps } from "@react-pdf/renderer";
import { renderToBuffer } from "@react-pdf/renderer";
import type { ReactElement } from "react";
import { createElement } from "react";
import { z } from "zod";

export const maxDuration = 60;

/**
 * Génère les PDF imprimables (chevalet A5 / autocollant 10×10).
 * Réservé au propriétaire du commerce.
 */
export const GET = authRoute
  .params(z.object({ slug: z.string() }))
  .query(
    z.object({ template: z.enum(["chevalet", "sticker"]).default("chevalet") }),
  )
  .handler(async (req, { params, query, ctx }) => {
    const business = await prisma.business.findUnique({
      where: { slug: params.slug },
      select: {
        userId: true,
        name: true,
        slug: true,
        brandColor: true,
      },
    });

    if (business?.userId !== ctx.user.id) {
      throw new ZodRouteError("Commerce introuvable", 404);
    }

    const qrPngDataUrl = await generateQrPngDataUrl(business.slug);
    const templateProps = {
      businessName: business.name,
      brandColor: business.brandColor,
      qrPngDataUrl,
      collectUrl: getCollectUrl(business.slug),
    };

    const document = createElement(
      query.template === "sticker" ? StickerPdf : ChevaletPdf,
      templateProps,
    ) as unknown as ReactElement<DocumentProps>;

    const buffer = await renderToBuffer(document);

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="scannshine-${query.template}-${business.slug}.pdf"`,
      },
    });
  });
