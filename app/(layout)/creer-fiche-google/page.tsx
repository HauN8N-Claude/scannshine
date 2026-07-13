import { Typography } from "@/components/nowts/typography";
import { buttonVariants } from "@/components/ui/button";
import { SectionLayout } from "@/features/landing/section-layout";
import { SiteConfig } from "@/site-config";
import {
  ArrowRight,
  BadgeCheck,
  Gift,
  ListChecks,
  MapPin,
  Phone,
  Search,
  Star,
  Store,
  Tag,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Créer votre fiche Google Business (gratuit) — ScanNShine",
  description:
    "Guide pas à pas pour créer la fiche Google Business de votre commerce en Polynésie française. Gratuit, environ 15 minutes, indispensable pour récolter des avis Google.",
  openGraph: {
    title: "Créer votre fiche Google Business (gratuit) — ScanNShine",
    description:
      "Guide pas à pas pour créer la fiche Google Business de votre commerce du fenua. Gratuit et indispensable pour récolter des avis.",
    url: `${SiteConfig.prodUrl}/creer-fiche-google`,
    type: "article",
  },
};

const WHY = [
  {
    icon: Search,
    title: "Être trouvé sur Google et Maps",
    description:
      "Touristes comme locaux cherchent « snack », « coiffeur » ou « taxi » sur Google Maps. Sans fiche, votre commerce n'existe tout simplement pas sur la carte.",
  },
  {
    icon: Star,
    title: "Pouvoir récolter des avis",
    description:
      "Les avis Google se déposent sur votre fiche. C'est elle que ScanNShine remplit d'avis, semaine après semaine — sans fiche, pas d'avis possibles.",
  },
  {
    icon: Gift,
    title: "C'est 100 % gratuit",
    description:
      "Créer et gérer sa fiche Google Business ne coûte rien, et ça le restera. Il vous faut juste un compte Google (une adresse Gmail suffit).",
  },
] as const;

const STEPS = [
  {
    icon: Store,
    title: "Ouvrez la page Google Business",
    description:
      "Cliquez sur le bouton « Créer ma fiche Google » ci-dessous, puis « Gérer mon établissement ». Connectez-vous avec votre compte Google (celui de votre Gmail).",
  },
  {
    icon: Tag,
    title: "Entrez le nom de votre commerce",
    description:
      "Le nom exact que vos clients connaissent, celui de votre enseigne ou de votre patente. C'est lui qui s'affichera sur Google Maps.",
  },
  {
    icon: ListChecks,
    title: "Choisissez votre catégorie",
    description:
      "Snack, restaurant, salon de coiffure, institut de beauté, taxi, pension de famille... Prenez la catégorie la plus proche de votre activité, vous pourrez en ajouter d'autres après.",
  },
  {
    icon: MapPin,
    title: "Ajoutez votre adresse ou votre zone",
    description:
      "Commerce avec local : indiquez l'adresse pour apparaître sur la carte. Activité mobile (taxi, livraison, prestation à domicile) : indiquez simplement votre zone de service.",
  },
  {
    icon: Phone,
    title: "Ajoutez votre téléphone",
    description:
      "Votre numéro (vini ou fixe) et vos horaires. Si vous avez une page Facebook ou un site, ajoutez le lien — mais ce n'est pas obligatoire.",
  },
  {
    icon: BadgeCheck,
    title: "Validez votre fiche",
    description:
      "Google vérifie que le commerce est bien le vôtre : selon les cas par téléphone, par email ou par une courte vidéo du commerce. La validation prend de quelques minutes à quelques jours — c'est normal, ne vous inquiétez pas.",
  },
] as const;

const GOOGLE_BUSINESS_URL = "https://www.google.com/intl/fr/business/";

export default function CreerFicheGooglePage() {
  return (
    <SectionLayout size="sm" variant="transparent">
      <div className="mx-auto flex max-w-2xl flex-col gap-16">
        <div className="flex flex-col gap-4">
          <Typography className="text-primary font-extrabold uppercase">
            Guide gratuit
          </Typography>
          <Typography
            variant="h1"
            className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            Créer votre fiche Google Business, pas à pas
          </Typography>
          <Typography
            variant="lead"
            className="text-muted-foreground text-lg text-pretty"
          >
            Pas encore de fiche Google pour votre commerce ? C'est gratuit, ça
            prend environ 15 minutes, et c'est le passage obligé pour récolter
            des avis. Suivez le guide.
          </Typography>
          <a
            href={GOOGLE_BUSINESS_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "lg", className: "w-full sm:w-fit" })}
          >
            Créer ma fiche Google (gratuit)
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        <div className="flex flex-col gap-6">
          <Typography variant="h2" className="text-2xl sm:text-3xl">
            Pourquoi c'est indispensable
          </Typography>
          <div className="flex flex-col gap-4">
            {WHY.map((item) => (
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

        <div className="flex flex-col gap-6">
          <Typography variant="h2" className="text-2xl sm:text-3xl">
            Les 6 étapes, dans l'ordre
          </Typography>
          <ol className="flex flex-col gap-4">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="bg-card flex items-start gap-4 rounded-2xl border p-5"
              >
                <div className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex flex-col gap-1">
                  <Typography
                    variant="h3"
                    className="flex items-center gap-2 text-base"
                  >
                    <step.icon className="text-primary size-4" aria-hidden />
                    {step.title}
                  </Typography>
                  <Typography variant="muted">{step.description}</Typography>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-card flex flex-col gap-4 rounded-2xl border p-6">
          <Typography variant="h2" className="text-xl sm:text-2xl">
            Et après ?
          </Typography>
          <Typography variant="muted">
            Une fois votre fiche validée, revenez dans ScanNShine : collez le
            lien de votre fiche à l'étape « Votre fiche Google » de
            l'inscription, et votre QR code est prêt à récolter vos premiers
            avis.
          </Typography>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={GOOGLE_BUSINESS_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg", className: "flex-1" })}
            >
              Créer ma fiche Google (gratuit)
            </a>
            <Link
              href="/onboarding"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "flex-1",
              })}
            >
              Reprendre mon inscription
            </Link>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
