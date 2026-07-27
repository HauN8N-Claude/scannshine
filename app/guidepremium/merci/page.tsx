import GridBackground from "@/components/nowts/grid-background";
import { Typography } from "@/components/nowts/typography";
import { LogoSvg } from "@/components/svg/logo-svg";
import { buttonVariants } from "@/components/ui/button";
import { SectionLayout } from "@/features/landing/section-layout";
import { Footer } from "@/features/layout/footer";
import { SiteConfig } from "@/site-config";
import { ArrowRight, CheckCircle2, Clock, Mail, Nfc } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Merci ! Votre guide est en route — ScanNShine",
  robots: { index: false, follow: false },
};

const UPSELL_POINTS = [
  "Elle demande l'avis à votre place, au bon moment — vous ne faites rien",
  "Le client approche son téléphone, l'avis part en 30 secondes",
  "Des avis récents en continu : exactement ce que le guide vous apprend, en automatique",
];

export default function GuideMerciPage() {
  return (
    <div className="bg-background text-foreground relative flex flex-col">
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <LogoSvg size={26} />
            <span className="text-lg font-semibold uppercase">
              {SiteConfig.title}
            </span>
          </Link>
        </div>
      </header>

      {/* CONFIRMATION */}
      <section className="relative isolate overflow-hidden">
        <GridBackground
          size={20}
          color="color-mix(in srgb, var(--border) 35%, transparent)"
        />
        <div className="mx-auto max-w-2xl px-6 pt-32 pb-16 text-center sm:pt-40">
          <div className="bg-primary/10 text-primary mx-auto flex size-16 items-center justify-center rounded-full">
            <CheckCircle2 className="size-9" aria-hidden />
          </div>
          <Typography
            variant="h1"
            className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            Merci ! Votre guide est à vous.
          </Typography>
          <Typography
            variant="large"
            className="text-muted-foreground mt-6 text-pretty"
          >
            Votre paiement est confirmé. Vous allez recevoir votre guide par
            email, à lire dès maintenant sur votre téléphone ou votre
            ordinateur.
          </Typography>
          <Typography
            variant="muted"
            className="mt-4 flex items-center justify-center gap-2 text-sm"
          >
            <Mail className="size-4" aria-hidden />
            Pensez à vérifier vos spams si vous ne le voyez pas d'ici quelques
            minutes.
          </Typography>
        </div>
      </section>

      {/* UPSELL PLAQUE → /commander */}
      <SectionLayout
        variant="card"
        size="base"
        className="flex flex-col items-center gap-8"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <Typography
            variant="small"
            className="text-primary font-semibold tracking-wide uppercase"
          >
            Pour aller plus vite
          </Typography>
          <Typography
            variant="h2"
            className="text-3xl text-balance sm:text-4xl"
          >
            Vous avez le savoir. Voici l'outil qui le fait à votre place.
          </Typography>
          <Typography
            variant="large"
            className="text-muted-foreground max-w-2xl text-balance"
          >
            Récolter des avis, c'est du temps et de la régularité. La plaquette
            ScanNShine, posée sur votre comptoir, s'en charge toute seule — pour
            que votre fiche Google monte sans que vous y pensiez.
          </Typography>
        </div>

        <div className="bg-background/60 w-full max-w-xl rounded-2xl border p-6 lg:p-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-full">
              <Nfc className="size-5" aria-hidden />
            </div>
            <div>
              <Typography variant="large" className="font-semibold">
                La plaquette ScanNShine
              </Typography>
              <Typography variant="muted" className="text-sm">
                4 990 XPF · Paiement unique · Livrée et testée devant vous
              </Typography>
            </div>
          </div>

          <ul className="mt-6 flex flex-col gap-3">
            {UPSELL_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2
                  className="text-primary mt-0.5 size-5 shrink-0"
                  aria-hidden
                />
                <Typography variant="small" className="font-normal">
                  {point}
                </Typography>
              </li>
            ))}
          </ul>

          <Link
            href="/commander"
            className={buttonVariants({ size: "lg", className: "mt-8 w-full" })}
          >
            Je veux la plaquette
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Typography
            variant="muted"
            className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs"
          >
            <Clock className="size-3.5" aria-hidden />
            On vous rappelle pour vérifier votre fiche et organiser la livraison
          </Typography>
        </div>

        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
        >
          Non merci, revenir à l'accueil
        </Link>
      </SectionLayout>

      <Footer />
    </div>
  );
}
