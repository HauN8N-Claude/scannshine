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
  Mail,
  MegaphoneOff,
  MessageSquareText,
  Repeat,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Faites revenir vos clients par email — Option ScanNShine",
  description:
    "Votre fichier clients se remplit tout seul, et un email bon plan fait revenir vos clients. Option Fichier clients + Email & SMS à 1 990 XPF/mois.",
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
    title: "Votre fichier clients se construit tout seul",
    description:
      "Chaque client qui scanne votre QR laisse ses coordonnées, avec son accord. Snack, salon, pension : votre fichier grossit à chaque passage — noms, contacts, à vous pour toujours. Vos clients arrêtent d'être des inconnus qui repartent.",
  },
  {
    icon: Mail,
    title: "Un message, et toute votre clientèle est prévenue",
    description:
      "Vous écrivez, vous cliquez, c'est parti. Un nouveau plat, un créneau qui se libère, une chambre dispo : toute votre base le reçoit en même temps. Zéro pub payée pour parler à des gens qui vous connaissent déjà.",
  },
  {
    icon: Zap,
    title: "Remplissez vos jours creux, le jour même",
    description:
      "Un mardi mort ? Un email le matin, et vous provoquez la visite au lieu de la subir. C'est le seul levier qui agit dans la journée — sans attendre, sans dépendre de la météo ni du hasard.",
  },
  {
    icon: Repeat,
    title: "Vos clients de passage deviennent des habitués",
    description:
      "Relancé au bon moment, un client qui venait « de temps en temps » revient deux fois plus. Ce sont vos clients les plus rentables — déjà dans votre fichier, prêts à revenir dès que vous leur faites signe.",
  },
] as const;

const INCLUDED = [
  "Fichier clients illimité (CRM), rempli automatiquement par votre QR",
  "Campagnes email illimitées à votre base (bons plans, nouveautés, remerciements) — incluses",
  "Modèles de messages prêts à l'emploi (jour creux, nouveauté, remerciement)",
  "Consentement et désinscription gérés automatiquement — vos envois restent dans les règles",
  "Export de vos contacts à tout moment, ils vous appartiennent",
  "Support en français, par des gens du fenua",
] as const;

export default function OffreCrmSmsPage() {
  return (
    <SectionLayout size="sm" variant="transparent">
      <div className="mx-auto flex max-w-2xl flex-col gap-16">
        {/* A — Attention */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <Typography
              variant="h1"
              className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              Un client qui part sans laisser ses coordonnées ne reviendra
              peut-être jamais
            </Typography>
            <Typography
              variant="lead"
              className="text-muted-foreground text-lg text-pretty"
            >
              Vos avis Google font venir de nouveaux clients. Cette option fait
              revenir ceux que vous avez déjà : votre fichier clients se remplit
              tout seul, et un email bon plan remplit vos jours creux.
            </Typography>
            <Link
              href="#paiement"
              className={buttonVariants({
                size: "lg",
                className: "w-full sm:w-fit",
              })}
            >
              Activer l'option — 1 990 XPF/mois
            </Link>
          </div>
        </div>

        {/* I — Intérêt : le problème */}
        <div className="flex flex-col gap-6">
          <Typography
            variant="h2"
            className="text-2xl text-balance sm:text-3xl"
          >
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
          <Typography
            variant="h2"
            className="text-2xl text-balance sm:text-3xl"
          >
            Un message au bon moment, et votre journée ne dépend plus du hasard
          </Typography>
          <Typography
            variant="lead"
            className="text-muted-foreground text-pretty"
          >
            Il est 14 h. La salle est à moitié vide, l'agenda a des trous, le
            téléphone reste muet. Et pourtant : des dizaines de clients ravis
            sont passés chez vous ce mois-ci. Ils reviendraient avec plaisir —
            il suffirait qu'on le leur rappelle. C'est tout ce que fait cette
            option.
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

          {/* Teaser SMS — bientôt */}
          <div className="border-primary/30 bg-primary/5 flex items-start gap-4 rounded-2xl border border-dashed p-5">
            <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full">
              <MessageSquareText className="size-5" aria-hidden />
            </div>
            <div className="flex flex-col gap-1">
              <Typography variant="h3" className="text-base">
                Et bientôt, les mêmes campagnes par SMS
                <span className="bg-primary/15 text-primary ml-2 rounded-full px-2 py-0.5 text-xs font-medium align-middle">
                  Bientôt disponible
                </span>
              </Typography>
              <Typography variant="muted">
                Pour vos messages urgents du jour même. Inclus dans l'option dès
                son lancement — vous n'aurez rien à changer.
              </Typography>
            </div>
          </div>
        </div>

        {/* A — Action : paiement */}
        <div id="paiement" className="flex scroll-mt-20 flex-col gap-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <Typography
              variant="h2"
              className="text-2xl text-balance sm:text-3xl"
            >
              Activez l'option maintenant
            </Typography>
            <Typography variant="large" className="text-muted-foreground">
              Le prix d'un seul client qui revient dans le mois.
            </Typography>
          </div>

          <Card className="border-primary mx-auto w-full max-w-md border-2 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">
                Option Fichier clients + Email &amp; SMS
              </CardTitle>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold">1 990</span>
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
                <li className="text-muted-foreground flex items-start gap-2 text-sm">
                  <MessageSquareText
                    className="mt-0.5 size-4 shrink-0"
                    aria-hidden
                  />
                  Envoi de SMS pour vos messages urgents —{" "}
                  <span className="font-medium">bientôt disponible</span>
                </li>
              </ul>
              <Link
                href="/billing"
                className={buttonVariants({ size: "lg", className: "w-full" })}
              >
                Activer l'option — 1 990 XPF/mois
              </Link>
              <div className="text-muted-foreground flex items-start justify-center gap-2 text-center text-xs">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  Paiement sécurisé (≈ 16,90 € débités en euros). Annulable en
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
