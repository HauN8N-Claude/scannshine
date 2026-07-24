import { Typography } from "@/components/nowts/typography";
import { buttonVariants } from "@/components/ui/button";
import { SiteConfig } from "@/site-config";
import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Demande envoyée — ScanNShine",
  robots: { index: false },
  alternates: {
    canonical: `${SiteConfig.prodUrl}/commander/merci`,
  },
};

export default function MerciPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <div className="bg-primary/10 text-primary flex size-16 items-center justify-center rounded-full">
        <CheckCircle2 className="size-8" aria-hidden />
      </div>
      <Typography variant="h1" className="text-3xl sm:text-4xl">
        Demande bien reçue !
      </Typography>
      <Typography variant="large" className="text-muted-foreground max-w-md">
        On vous rappelle au numéro indiqué pour confirmer votre commande et
        vérifier votre fiche Google ensemble. À très vite !
      </Typography>
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        Retour à l'accueil
      </Link>
    </div>
  );
}
