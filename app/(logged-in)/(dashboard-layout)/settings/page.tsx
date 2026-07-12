import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { SCANNSHINE_PLAN } from "@/lib/dodo";
import { getBusinessByUserId } from "@/query/business/get-business";
import { CreditCard, UserCog } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { GoogleLinkForm } from "./google-link-form";
import { SettingsForm } from "./settings-form";

export const metadata: Metadata = {
  title: "Réglages",
};

const STATUS_LABELS: Record<string, string> = {
  ONBOARDING: "Essai à démarrer",
  TRIALING: "Essai gratuit en cours",
  ACTIVE: "Abonnement actif",
  PAST_DUE: "Paiement en échec",
  CANCELLED: "Annulé",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SettingsPage />
    </Suspense>
  );
}

async function SettingsPage() {
  const user = await getRequiredUser();
  const business = await getBusinessByUserId(user.id);

  if (!business) {
    redirect("/onboarding");
  }

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Réglages</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-6">
        <SettingsForm
          defaultValues={{
            name: business.name,
            brandColor: business.brandColor,
            logoUrl: business.logoUrl,
          }}
        />

        <GoogleLinkForm
          currentPlaceId={business.googlePlaceId}
          currentMapsUrl={business.googleMapsUrl}
        />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Abonnement</CardTitle>
              <Badge variant="secondary">
                {STATUS_LABELS[business.subscriptionStatus]}
              </Badge>
            </div>
            <CardDescription>
              {SCANNSHINE_PLAN.displayPrice} —{" "}
              {SCANNSHINE_PLAN.displayPriceDetail}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="/billing" className={buttonVariants()}>
              <CreditCard className="size-4" aria-hidden />
              Gérer mon abonnement
            </Link>
            <Link
              href="/account"
              className={buttonVariants({ variant: "outline" })}
            >
              <UserCog className="size-4" aria-hidden />
              Mon compte (email, mot de passe)
            </Link>
          </CardContent>
        </Card>

        <p className="text-muted-foreground text-xs">
          L'adresse de votre page de collecte (/r/{business.slug}) ne change
          jamais : vos QR imprimés restent valables à vie.
        </p>
      </LayoutContent>
    </Layout>
  );
}
