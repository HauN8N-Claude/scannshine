import { buildWriteReviewUrl } from "@/lib/place-id";
import {
  getBusinessBySlug,
  isFunnelActive,
} from "@/query/business/get-business";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { FeedbackForm } from "./feedback-form";

export const metadata: Metadata = {
  title: "Votre retour",
  robots: { index: false },
};

export default function Page(props: PageProps<"/r/[slug]/feedback">) {
  return (
    <Suspense fallback={null}>
      <FeedbackPage {...props} />
    </Suspense>
  );
}

async function FeedbackPage(props: PageProps<"/r/[slug]/feedback">) {
  const params = await props.params;
  const business = await getBusinessBySlug(params.slug);

  if (!business) {
    notFound();
  }

  if (!isFunnelActive(business)) {
    redirect(`/r/${business.slug}`);
  }

  return (
    <main
      className="flex min-h-svh flex-col items-center p-6"
      style={{
        ["--brand" as string]: business.brandColor,
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--brand) 8%, white), white 35%)",
      }}
    >
      <div className="flex w-full max-w-sm flex-1 flex-col justify-center gap-6 py-8">
        <Link
          href={`/r/${business.slug}`}
          className="text-sm text-neutral-400 underline-offset-4 hover:underline"
        >
          ← {business.name}
        </Link>
        <FeedbackForm
          slug={business.slug}
          businessName={business.name}
          googleReviewUrl={
            business.googlePlaceId
              ? buildWriteReviewUrl(business.googlePlaceId)
              : null
          }
        />
      </div>
    </main>
  );
}
