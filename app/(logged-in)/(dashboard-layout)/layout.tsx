import { Button } from "@/components/ui/button";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { getBusinessByUserId } from "@/query/business/get-business";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DashboardNavigation } from "./dashboard-navigation";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Pilotez vos avis Google.",
};

const ONBOARDING_COMPLETE_STEP = 4;

export default function Layout(props: LayoutProps<"/">) {
  return (
    <Suspense fallback={null}>
      <RouteLayout {...props} />
    </Suspense>
  );
}

async function RouteLayout(props: LayoutProps<"/">) {
  const user = await getRequiredUser();
  const business = await getBusinessByUserId(user.id);

  if (!business || business.onboardingStep < ONBOARDING_COMPLETE_STEP) {
    redirect("/onboarding");
  }

  // Gating abonnement : le dashboard est réservé aux comptes en essai ou actifs.
  // Le statut ONBOARDING (jamais payé) n'a PAS accès — normalement il a déjà été
  // renvoyé vers /onboarding ci-dessus (onboardingStep < 4). Défense en profondeur.
  // La page publique /r/{slug} n'est jamais bloquée ici (grâce gérée côté funnel).
  const hasAccess = ["TRIALING", "ACTIVE"].includes(business.subscriptionStatus);

  if (!hasAccess) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 text-center">
        <h1 className="text-2xl font-bold">Votre abonnement est en pause</h1>
        <p className="text-muted-foreground max-w-md text-sm">
          {business.subscriptionStatus === "PAST_DUE"
            ? "Votre dernier paiement n'a pas abouti. Mettez à jour votre moyen de paiement pour retrouver votre tableau de bord — votre QR code reste actif le temps de régulariser."
            : "Votre abonnement a été annulé. Réactivez-le pour retrouver votre tableau de bord et garder votre QR code actif (il reste en ligne encore quelques jours)."}
        </p>
        <Button asChild>
          <Link href="/billing">Gérer mon abonnement</Link>
        </Button>
      </main>
    );
  }

  return (
    <DashboardNavigation
      businessId={business.id}
      businessName={business.name}
      brandColor={business.brandColor}
    >
      {props.children}
    </DashboardNavigation>
  );
}
