import { Typography } from "@/components/nowts/typography";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { SectionLayout } from "./section-layout";

const FEATURES = [
  "Plaquette prête à l'emploi, programmée et testée avant livraison",
  "Reliée à votre fiche Google, vérifiée avec vous",
  "Adhésif solide : posée en 2 minutes sur comptoir, caisse ou table",
  "Compatible iPhone & Android, sans application à installer",
  "Lien modifiable à distance si votre fiche change un jour",
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
          Un paiement unique. La plaquette travaille pour vous tous les jours.
        </Typography>
      </div>

      <Card className="border-primary mx-auto w-full max-w-md border-2 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">La plaquette ScanNShine</CardTitle>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-bold">4 990</span>
            <span className="text-muted-foreground text-lg">XPF</span>
          </div>
          <CardDescription>Paiement unique · Sans abonnement</CardDescription>
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
            href="/commander"
            className={buttonVariants({ size: "lg", className: "w-full" })}
          >
            Commander ma plaquette
          </Link>
          <p className="text-muted-foreground text-center text-xs">
            Une question avant de commander ? Écrivez-nous — on vous répond en
            français, rapidement.
          </p>
        </CardContent>
      </Card>
    </SectionLayout>
  );
};
