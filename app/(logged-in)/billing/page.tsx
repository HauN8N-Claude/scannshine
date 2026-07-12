import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { SCANNSHINE_PLAN } from "@/lib/dodo";
import { getBusinessByUserId } from "@/query/business/get-business";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { OpenPortalButton, StartCheckoutButton } from "./billing-buttons";

export const metadata: Metadata = {
  title: "Mon abonnement",
};

const STATUS_LABELS: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" }
> = {
  ONBOARDING: { label: "Essai à démarrer", variant: "secondary" },
  TRIALING: { label: "Essai gratuit en cours", variant: "default" },
  ACTIVE: { label: "Abonnement actif", variant: "default" },
  PAST_DUE: { label: "Paiement en échec", variant: "destructive" },
  CANCELLED: { label: "Annulé", variant: "destructive" },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BillingPage />
    </Suspense>
  );
}

async function BillingPage() {
  const user = await getRequiredUser();
  const business = await getBusinessByUserId(user.id);

  if (!business) {
    redirect("/onboarding");
  }

  const status = STATUS_LABELS[business.subscriptionStatus];
  const hasSubscription = Boolean(business.dodoSubscriptionId);

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center gap-6 px-4 py-10">
      <Link
        href="/dashboard"
        className="text-muted-foreground text-sm underline-offset-4 hover:underline"
      >
        ← Tableau de bord
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>ScanNShine</CardTitle>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          <CardDescription>
            {SCANNSHINE_PLAN.displayPrice} — {SCANNSHINE_PLAN.displayPriceDetail}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ul className="text-muted-foreground flex flex-col gap-1.5 text-sm">
            <li>✓ QR code + page de collecte à vos couleurs</li>
            <li>✓ Retours négatifs captés en privé</li>
            <li>✓ Statistiques scans et clics vers Google</li>
            <li>✓ Base contacts clients + export</li>
            <li>✓ Sans engagement — annulable à tout moment</li>
          </ul>

          {business.subscriptionStatus === "TRIALING" &&
          business.trialEndsAt ? (
            <p className="text-muted-foreground text-xs">
              Votre essai se termine le{" "}
              {business.trialEndsAt.toLocaleDateString("fr-FR")}.
            </p>
          ) : null}

          {hasSubscription ? (
            <OpenPortalButton label="Gérer mon abonnement (CB, factures, annulation)" />
          ) : (
            <>
              <StartCheckoutButton
                label={`Démarrer — ${SCANNSHINE_PLAN.trialDays} jours gratuits`}
              />
              <p className="text-muted-foreground text-center text-xs">
                Paiement sécurisé par Dodo Payments. Aucun débit avant la fin
                de l'essai.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
