import { buildWriteReviewUrl } from "@/lib/place-id";
import { logScanEvent } from "@/lib/scan-events";
import { getVisitorHash } from "@/lib/visitor-hash";
import {
  getBusinessBySlug,
  isFunnelActive,
} from "@/query/business/get-business";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(
  props: PageProps<"/r/[slug]">,
): Promise<Metadata> {
  const params = await props.params;
  const business = await getBusinessBySlug(params.slug);
  if (!business) {
    // Déclenché ici (avant le streaming) pour que la réponse soit un vrai 404
    notFound();
  }
  return {
    title: `Votre avis compte — ${business.name}`,
    robots: { index: false },
  };
}

export default function Page(props: PageProps<"/r/[slug]">) {
  return (
    <Suspense fallback={null}>
      <CollectPage {...props} />
    </Suspense>
  );
}

async function CollectPage(props: PageProps<"/r/[slug]">) {
  const params = await props.params;
  const business = await getBusinessBySlug(params.slug);

  if (!business) {
    notFound();
  }

  if (!isFunnelActive(business)) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-neutral-50 p-6 text-center">
        <p className="text-lg font-medium text-neutral-700">
          Cette page n'est plus active.
        </p>
        {business.googlePlaceId ? (
          <a
            href={buildWriteReviewUrl(business.googlePlaceId)}
            className="text-sm text-neutral-500 underline underline-offset-4"
          >
            Laisser un avis Google
          </a>
        ) : null}
      </main>
    );
  }

  const visitorHash = await getVisitorHash();
  await logScanEvent({
    businessId: business.id,
    type: "SCAN",
    visitorHash,
  });

  const googleReviewUrl = business.googlePlaceId
    ? buildWriteReviewUrl(business.googlePlaceId)
    : null;

  return (
    <main
      className="flex min-h-svh flex-col items-center justify-between p-6 text-center"
      style={{
        // Couleur du commerce en variable CSS, fond dégradé très léger
        ["--brand" as string]: business.brandColor,
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--brand) 12%, white), white 45%)",
      }}
    >
      <div className="flex w-full max-w-sm flex-1 flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-4">
          {business.logoUrl ? (
             
            <img
              src={business.logoUrl}
              alt={business.name}
              width={88}
              height={88}
              className="size-22 rounded-2xl border border-black/5 bg-white object-cover shadow-sm"
            />
          ) : (
            <div
              className="flex size-22 items-center justify-center rounded-2xl text-3xl font-bold text-white shadow-sm"
              style={{ backgroundColor: "var(--brand)" }}
            >
              {business.name.charAt(0).toUpperCase()}
            </div>
          )}
          <h1 className="text-2xl font-bold text-neutral-900">
            {business.name}
          </h1>
        </div>

        <p className="text-lg text-neutral-700">
          Comment s'est passée votre visite&nbsp;?
        </p>

        <div className="flex w-full flex-col gap-3">
          <a
            href={`/r/${business.slug}/go`}
            className="flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-lg font-semibold text-white shadow-md transition-transform active:scale-[0.98]"
            style={{ backgroundColor: "var(--brand)" }}
          >
            <span aria-hidden>😊</span> Très bien&nbsp;!
          </a>
          <Link
            href={`/r/${business.slug}/feedback`}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-white px-6 py-4 text-lg font-semibold text-neutral-700 shadow-sm transition-transform active:scale-[0.98]"
          >
            <span aria-hidden>😞</span> Peut mieux faire
          </Link>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Link
            href={`/r/${business.slug}/club`}
            className="text-sm text-neutral-500 underline underline-offset-4"
          >
            🎁 Recevez les bons plans de {business.name}
          </Link>
          {googleReviewUrl ? (
            <a
              href={googleReviewUrl}
              className="text-sm text-neutral-400 underline underline-offset-4"
            >
              Laisser un avis Google
            </a>
          ) : null}
        </div>
      </div>

      <footer className="pt-8 text-xs text-neutral-400">
        <p>
          Mesure d'audience anonyme ·{" "}
          <Link href="/" className="underline underline-offset-2">
            ScanNShine
          </Link>
        </p>
      </footer>
    </main>
  );
}
