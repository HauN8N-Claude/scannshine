import { Typography } from "@/components/nowts/typography";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionLayout } from "@/features/landing/section-layout";
import {
  BookUser,
  CalendarX,
  Check,
  CloudRain,
  MegaphoneOff,
  MessageSquareText,
  Repeat,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CountdownBanner } from "./countdown";

export const metadata: Metadata = {
  title: "Faites revenir vos clients par SMS — Option ScanNShine",
  description:
    "Votre fichier clients se remplit tout seul, et un SMS bon plan remplit vos jours creux. Option fichier clients + SMS à 2 990 XPF/mois.",
  robots: { index: false },
};

const PROBLEMS = [
  {
    icon: CloudRain,
    title: "Les jours creux ne préviennent pas",
    description:
      "Un mardi pluvieux, une salle vide, des charges qui tournent quand même. Et aucun moyen d'agir le jour même — vous subissez.",
  },
  {
    icon: CalendarX,
    title: "Vos clients vous oublient",
    description:
      "Pas parce que c'était mauvais — parce que la vie reprend. Sans un rappel au bon moment, le client content d'il y a trois semaines retourne à ses habitudes.",
  },
  {
    icon: MegaphoneOff,
    title: "La pub coûte cher pour parler à des inconnus",
    description:
      "Booster une publication pour espérer toucher... vos propres clients ? Vous payez Facebook pour joindre des gens qui ont déjà mangé chez vous.",
  },
] as const;

const BENEFITS = [
  {
    icon: BookUser,
    title: "Votre fichier clients se remplit tout seul",
    description:
      "Votre QR ScanNShine capte déjà les numéros de vos clients, avec leur accord. L'option les transforme en vrai fichier clients : noms, numéros, historique — à vous, exportable, pour toujours.",
  },
  {
    icon: MessageSquareText,
    title: "Un SMS bon plan, envoyé en 2 clics",
    description:
      "Écrivez votre message, appuyez sur envoyer : tous vos clients le reçoivent dans la minute. Et un SMS, ça se lit — pas comme une publication noyée dans le fil Facebook.",
  },
  {
    icon: Zap,
    title: "Remplissez les jours creux, le jour même",
    description:
      "Mardi calme ? « Poisson cru + citronnade à 1 500 XPF ce midi » envoyé à vos 80 derniers clients. C'est le seul levier qui agit dans l'heure, sans payer de pub.",
  },
  {
    icon: Repeat,
    title: "Des clients de passage qui deviennent des habitués",
    description:
      "Relancé au bon moment, un client qui venait « de temps en temps » revient chaque semaine. Ce sont vos meilleurs clients — et ils sont déjà dans votre fichier.",
  },
] as const;

const INCLUDED = [
  "Fichier clients illimité, rempli automatiquement par votre QR",
  "Envois de SMS bons plans à tout ou partie de vos clients",
  "Modèles de messages prêts à l'emploi (jour creux, nouveauté, remerciement)",
  "Consentement géré automatiquement — vos envois restent dans les règles",
  "Export de vos contacts à tout moment, ils vous appartiennent",
  "Support en français, par des gens du fenua",
] as const;

export default function OffreCrmSmsPage() {
  return (
    <SectionLayout size="sm" variant="transparent">
      <div className="mx-auto flex max-w-2xl flex-col gap-16">
        {/* A — Attention */}
        <div className="flex flex-col gap-6">
          <CountdownBanner />
          <div className="flex flex-col gap-4">
            <Typography
              variant="h1"
              className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              Un client qui part sans laisser son numéro ne reviendra
              peut-être jamais
            </Typography>
            <Typography
              variant="lead"
              className="text-muted-foreground text-lg text-pretty"
            >
              Vos avis Google font venir de nouveaux clients. Cette option fait
              revenir ceux que vous avez déjà : votre fichier clients se
              remplit tout seul, et un SMS bon plan remplit vos jours creux.
            </Typography>
            <Link
              href="#paiement"
              className={buttonVariants({
                size: "lg",
                className: "w-full sm:w-fit",
              })}
            >
              Activer l'option — 2 990 XPF/mois
            </Link>
          </div>
        </div>

        {/* I — Intérêt : le problème */}
        <div className="flex flex-col gap-6">
          <Typography variant="h2" className="text-2xl text-balance sm:text-3xl">
            Le vrai problème, ce n'est pas d'attirer. C'est de faire revenir.
          </Typography>
          <div className="flex flex-col gap-4">
            {PROBLEMS.map((item) => (
              <div
                key={item.title}
                className="bg-card flex items-start gap-4 rounded-2xl border p-5"
              >
                <div className="bg-destructive/10 text-destructive flex size-10 shrink-0 items-center justify-center rounded-full">
                  <item.icon className="size-5" aria-hidden />
                </div>
                <div className="flex flex-col gap-1">
                  <Typography variant="h3" className="text-base">
                    {item.title}
                  </Typography>
                  <Typography variant="muted">{item.description}</Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* D — Désir : la solution et les bénéfices */}
        <div className="flex flex-col gap-6">
          <Typography variant="h2" className="text-2xl text-balance sm:text-3xl">
            Imaginez : un jour creux, un SMS, et la salle qui se remplit
          </Typography>
          <div className="flex flex-col gap-4">
            {BENEFITS.map((item) => (
              <div
                key={item.title}
                className="bg-card flex items-start gap-4 rounded-2xl border p-5"
              >
                <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full">
                  <item.icon className="size-5" aria-hidden />
                </div>
                <div className="flex flex-col gap-1">
                  <Typography variant="h3" className="text-base">
                    {item.title}
                  </Typography>
                  <Typography variant="muted">{item.description}</Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* A — Action : paiement */}
        <div id="paiement" className="flex scroll-mt-20 flex-col gap-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <Typography variant="h2" className="text-2xl text-balance sm:text-3xl">
              Activez l'option maintenant
            </Typography>
            <Typography variant="large" className="text-muted-foreground">
              Moins cher qu'une seule journée creuse.
            </Typography>
          </div>

          <Card className="border-primary mx-auto w-full max-w-md border-2 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">
                Option Fichier clients + SMS
              </CardTitle>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold">2 990</span>
                <span className="text-muted-foreground text-lg">XPF/mois</span>
              </div>
              <CardDescription>
                En plus de votre abonnement ScanNShine · Sans engagement
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ul className="flex flex-col gap-2.5">
                {INCLUDED.map((feature) => (
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
                href="/billing"
                className={buttonVariants({ size: "lg", className: "w-full" })}
              >
                Activer l'option — 2 990 XPF/mois
              </Link>
              <div className="text-muted-foreground flex items-start justify-center gap-2 text-center text-xs">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  Paiement sécurisé (≈ 25,10 € débités en euros). Annulable en
                  deux clics, l'option s'arrête au mois suivant — votre fichier
                  clients reste à vous.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionLayout>
  );
}
