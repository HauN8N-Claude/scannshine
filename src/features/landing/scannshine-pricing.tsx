import { Typography } from "@/components/nowts/typography";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SCANNSHINE_PLAN } from "@/lib/dodo";
import { Check } from "lucide-react";
import Link from "next/link";
import { SectionLayout } from "./section-layout";

const FEATURES = [
  "QR code + affiches à imprimer (et QR de poche sur votre téléphone)",
  "Page de collecte aux couleurs de votre commerce",
  "Retours négatifs captés en privé, par email",
  "Statistiques : scans, clics vers Google, chaque semaine",
  "Base contacts clients avec consentement + export",
  "Support en français, par des gens du fenua",
] as const;

export const ScannshinePricing = () => {
  return (
    <SectionLayout
      size="sm"
      id="tarif"
      className="flex flex-col gap-8"
      containerClassName="scroll-mt-20"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Typography variant="h2" className="text-3xl sm:text-4xl">
          Un tarif simple
        </Typography>
        <Typography variant="large" className="text-muted-foreground">
          Moins qu'un plat du jour par semaine.
        </Typography>
      </div>

      <Card className="border-primary mx-auto w-full max-w-md border-2 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">ScanNShine</CardTitle>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-bold">3 990</span>
            <span className="text-muted-foreground text-lg">XPF/mois</span>
          </div>
          <CardDescription>
            {SCANNSHINE_PLAN.displayPriceDetail} · Sans engagement
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ul className="flex flex-col gap-2.5">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check
                  className="text-primary mt-0.5 size-4 shrink-0"
                  aria-hidden
                />
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href="/auth/signup"
            className={buttonVariants({ size: "lg", className: "w-full" })}
          >
            Commencer — 7 jours gratuits
          </Link>
          <p className="text-muted-foreground text-center text-xs">
            Paiement sécurisé. Aucun débit avant la fin de l'essai. Annulable
            en deux clics.
          </p>
        </CardContent>
      </Card>
    </SectionLayout>
  );
};
