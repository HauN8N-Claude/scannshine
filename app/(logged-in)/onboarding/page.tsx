import { Typography } from "@/components/nowts/typography";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { getBusinessByUserId } from "@/query/business/get-business";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { StepGoogle } from "./step-google";
import { StepInfo } from "./step-info";
import { StepQr } from "./step-qr";

export const metadata: Metadata = {
  title: "Bienvenue — configurez votre commerce",
};

export default function Page(props: PageProps<"/onboarding">) {
  return (
    <Suspense fallback={null}>
      <OnboardingPage {...props} />
    </Suspense>
  );
}

const STEP_TITLES: Record<number, { title: string; description: string }> = {
  1: {
    title: "Votre commerce",
    description: "2 minutes pour créer votre page de collecte d'avis.",
  },
  2: {
    title: "Votre fiche Google",
    description: "On connecte votre QR à votre fiche Google Business.",
  },
  3: {
    title: "Votre QR est prêt !",
    description: "Affichez-le en caisse et regardez les avis arriver.",
  },
};

async function OnboardingPage(props: PageProps<"/onboarding">) {
  const user = await getRequiredUser();
  const business = await getBusinessByUserId(user.id);

  if (business && business.onboardingStep >= 4) {
    redirect("/dashboard");
  }

  const searchParams = await props.searchParams;
  const requestedStep =
    typeof searchParams.etape === "string"
      ? Number.parseInt(searchParams.etape, 10)
      : null;

  const currentStep = business
    ? Math.min(business.onboardingStep, 3)
    : 1;
  // Le gérant peut revenir sur une étape déjà complétée, jamais sauter en avant
  const step =
    requestedStep && requestedStep >= 1 && requestedStep <= currentStep
      ? requestedStep
      : currentStep;

  const meta = STEP_TITLES[step];

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col gap-8 px-4 py-10">
      <div className="flex flex-col gap-2">
        <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
          {[1, 2, 3].map((index) => (
            <span
              key={index}
              className={`flex size-6 items-center justify-center rounded-full border ${
                index <= step
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border"
              }`}
            >
              {index}
            </span>
          ))}
          <span className="ml-2">Étape {step} sur 3</span>
        </div>
        <Typography variant="h1" className="text-2xl">
          {meta.title}
        </Typography>
        <Typography variant="muted">{meta.description}</Typography>
      </div>

      {step === 1 ? (
        <StepInfo
          defaultValues={
            business
              ? {
                  name: business.name,
                  brandColor: business.brandColor,
                  logoUrl: business.logoUrl,
                }
              : null
          }
        />
      ) : null}
      {step === 2 && business ? (
        <StepGoogle
          currentPlaceId={business.googlePlaceId}
          currentMapsUrl={business.googleMapsUrl}
        />
      ) : null}
      {step === 3 && business ? (
        <StepQr slug={business.slug} businessName={business.name} />
      ) : null}
    </main>
  );
}
