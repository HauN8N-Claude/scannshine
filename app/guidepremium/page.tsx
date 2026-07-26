import GridBackground from "@/components/nowts/grid-background";
import { Typography } from "@/components/nowts/typography";
import { CircleSvg } from "@/components/svg/circle-svg";
import { LogoSvg } from "@/components/svg/logo-svg";
import { buttonVariants } from "@/components/ui/button";
import { SectionLayout } from "@/features/landing/section-layout";
import { Footer } from "@/features/layout/footer";
import { SiteConfig } from "@/site-config";
import {
  BadgeCheck,
  Check,
  Clock,
  Download,
  MapPin,
  MessageCircle,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Le Guide Premium — Plus de clients grâce à Google | ScanNShine",
  description:
    "Le guide pour les commerces de Polynésie : soyez trouvé en premier sur Google par les clients locaux et les touristes, sans payer de publicité.",
  alternates: { canonical: `${SiteConfig.prodUrl}/guidepremium` },
  // La page vit tant que le produit n'est pas branché : on la garde hors index
  // le temps de finaliser le guide et le checkout. Passer à index:true au lancement.
  robots: { index: false, follow: true },
};

/**
 * 🔗 À BRANCHER : URL de paiement + livraison du guide.
 * Deux options (voir analyse) : lien produit Gumroad, OU checkout Dodo Payments.
 * Tant que le produit n'est pas prêt, ce placeholder est le seul point à changer :
 * tous les boutons « Obtenir le guide » l'utilisent.
 */
const GUIDE_CHECKOUT_URL = "#"; // TODO: remplacer par l'URL Gumroad / Dodo

const PRICE_XPF = "1 990 XPF";

// Ce que le lead VEUT (désirs du marché) — formulé en résultats, pas en chapitres.
// À affiner quand le contenu de l'ebook sera figé.
const OUTCOMES = [
  {
    icon: Search,
    title: "Sortir en premier sur Google Maps",
    description:
      "Comprenez ce qui fait remonter une fiche dans les résultats locaux — et passez devant le commerce d'à côté, sans payer de publicité.",
  },
  {
    icon: Star,
    title: "Récolter des avis récents, en continu",
    description:
      "Le vrai levier de classement, ce n'est pas la chance : c'est un flux d'avis frais. On vous montre comment l'obtenir, simplement.",
  },
  {
    icon: MapPin,
    title: "Capter les touristes de passage",
    description:
      "Un visiteur compare deux fiches en 30 secondes et choisit la mieux notée. Devenez celui qu'il trouve — et qu'il pousse la porte.",
  },
  {
    icon: BadgeCheck,
    title: "Une fiche qui inspire confiance",
    description:
      "Nom, photos, horaires, avis : transformez votre fiche Google en vraie vitrine qui donne envie de venir chez vous plutôt qu'ailleurs.",
  },
  {
    icon: MessageCircle,
    title: "Gérer les avis (même les négatifs)",
    description:
      "Répondre, désamorcer, transformer un mécontent en client fidèle : la méthode pour protéger votre réputation sans stress.",
  },
  {
    icon: TrendingUp,
    title: "Plus de clients, sans budget pub",
    description:
      "Un avis Google travaille pour vous des années, gratuitement. Faites de votre fiche votre meilleur commercial, jour et nuit.",
  },
];

const FOR_WHO = [
  "Snack, roulotte, restaurant",
  "Salon de coiffure, institut, barbier",
  "Boutique, magasin, artisan",
  "Garage, prestataire de services",
  "Pension de famille, activité touristique",
  "Tout commerce du fenua avec du passage",
];

const OFFER_INCLUDES = [
  "Le guide complet, au format PDF, à lire sur téléphone ou ordinateur",
  "Des étapes concrètes, pensées pour un commerce de Polynésie — pas de théorie",
  "Accès immédiat après paiement, à garder à vie",
  "Écrit en français, par des gens du fenua",
];

const FAQ = [
  {
    question: "Je ne suis pas doué avec l'informatique. C'est fait pour moi ?",
    answer:
      "Oui. Le guide est écrit simplement, étape par étape, sans jargon. Si vous savez utiliser un téléphone, vous saurez appliquer ce qu'il contient.",
  },
  {
    question: `${PRICE_XPF}, qu'est-ce que je reçois exactement ?`,
    answer:
      "Un guide PDF complet, accessible immédiatement après le paiement, à garder à vie. Paiement unique, sans abonnement.",
  },
  {
    question: "Ça marche pour mon type de commerce ?",
    answer:
      "Si des clients passent votre porte — snack, salon, boutique, pension, garage… — alors votre fiche Google peut vous amener plus de monde. Le guide s'applique à tous les commerces de proximité du fenua.",
  },
  {
    question: "Je dois avoir un site internet ?",
    answer:
      "Non. Tout se joue sur votre fiche Google, gratuite. Le guide vous montre comment l'exploiter, sans site ni compétence technique.",
  },
];

const GuideHeader = () => (
  <header className="absolute inset-x-0 top-0 z-50">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 lg:px-8">
      <Link href="/" className="flex items-center gap-2">
        <LogoSvg size={26} />
        <span className="text-lg font-semibold uppercase">
          {SiteConfig.title}
        </span>
      </Link>
      <Link
        href={SiteConfig.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground text-sm font-medium"
      >
        Une question ?
      </Link>
    </div>
  </header>
);

export default function GuidePremiumPage() {
  return (
    <div className="bg-background text-foreground relative flex flex-col">
      <GuideHeader />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <GridBackground
          size={20}
          color="color-mix(in srgb, var(--border) 35%, transparent)"
        />
        <div className="mx-auto max-w-3xl px-6 pt-32 pb-20 text-center sm:pt-40 sm:pb-28">
          <Typography
            variant="small"
            className="text-primary mb-4 font-semibold text-balance sm:text-base"
          >
            Commerçant en Polynésie&nbsp;? Vos futurs clients vous cherchent
            déjà sur Google.
          </Typography>
          <Typography
            variant="h1"
            className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
          >
            Soyez le commerce que les clients{" "}
            <span className="relative inline-block">
              <span>et les touristes</span>
              <CircleSvg className="fill-primary absolute inset-0" />
            </span>{" "}
            trouvent en premier
          </Typography>
          <Typography
            variant="large"
            className="text-muted-foreground mt-8 text-lg font-medium text-pretty sm:text-xl/8"
          >
            Le guide qui vous apprend à faire de votre fiche Google votre
            meilleur commercial : plus de visibilité, plus d'avis, plus de
            clients — locaux comme touristes — sans payer de publicité.
          </Typography>
          <div className="mt-10 flex flex-col items-center gap-3">
            <Link
              href="#offre"
              className={buttonVariants({ size: "lg", className: "px-8" })}
            >
              Je veux le guide — {PRICE_XPF}
            </Link>
            <Typography variant="muted" className="text-xs">
              Accès immédiat · Format PDF · Paiement unique
            </Typography>
          </div>
        </div>
      </section>

      {/* PROBLÈME / CONSTAT */}
      <SectionLayout variant="card" size="base" className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <Typography
            variant="h2"
            className="text-3xl text-balance sm:text-4xl"
          >
            Vous faites du bon travail. Google ne le montre pas.
          </Typography>
          <Typography
            variant="large"
            className="text-muted-foreground max-w-2xl text-balance"
          >
            Aujourd'hui, un client — ou un touriste — vous juge sur Google avant
            même de vous connaître. S'il ne vous trouve pas, ou s'il tombe sur
            une fiche vide, il va chez le voisin. Chaque jour, l'écart se
            creuse.
          </Typography>
        </div>
        <div className="mx-auto grid w-full max-w-3xl gap-4 sm:grid-cols-3">
          {[
            {
              icon: Search,
              text: "On ne vous trouve pas quand on cherche votre type de commerce",
            },
            {
              icon: Star,
              text: "Trop peu d'avis, trop anciens : la fiche paraît à l'abandon",
            },
            {
              icon: Users,
              text: "Les touristes, eux, ne connaissent que Google Maps",
            },
          ].map((item) => (
            <div
              key={item.text}
              className="bg-background/60 flex flex-col items-center gap-3 rounded-xl border p-5 text-center"
            >
              <item.icon className="text-primary size-6" aria-hidden />
              <Typography variant="muted" className="text-balance">
                {item.text}
              </Typography>
            </div>
          ))}
        </div>
      </SectionLayout>

      {/* CE QUE VOUS ALLEZ OBTENIR */}
      <SectionLayout size="lg" className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Typography
            variant="h2"
            className="text-3xl text-balance sm:text-4xl"
          >
            Ce que ce guide va changer pour vous
          </Typography>
          <Typography
            variant="large"
            className="text-muted-foreground max-w-2xl text-balance"
          >
            Pas de théorie. Des résultats concrets, applicables dès cette
            semaine sur votre fiche Google.
          </Typography>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((item) => (
            <div
              key={item.title}
              className="bg-card flex flex-col gap-3 rounded-xl border p-6"
            >
              <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-full">
                <item.icon className="size-5" aria-hidden />
              </div>
              <Typography variant="h3" className="text-lg">
                {item.title}
              </Typography>
              <Typography variant="muted">{item.description}</Typography>
            </div>
          ))}
        </div>
      </SectionLayout>

      {/* POUR QUI */}
      <SectionLayout variant="card" size="base" className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Typography
            variant="h2"
            className="text-3xl text-balance sm:text-4xl"
          >
            Pensé pour les commerces du fenua
          </Typography>
          <Typography
            variant="large"
            className="text-muted-foreground max-w-2xl text-balance"
          >
            Si des clients passent votre porte, ce guide est fait pour vous.
          </Typography>
        </div>
        <div className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-2">
          {FOR_WHO.map((who) => (
            <div
              key={who}
              className="bg-background/60 flex items-center gap-3 rounded-lg border px-4 py-3"
            >
              <Check className="text-primary size-5 shrink-0" aria-hidden />
              <Typography variant="small" className="font-medium">
                {who}
              </Typography>
            </div>
          ))}
        </div>
      </SectionLayout>

      {/* OFFRE / PRIX */}
      <SectionLayout
        size="base"
        className="flex flex-col items-center gap-8"
        containerClassName="scroll-mt-20"
        id="offre"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <Typography
            variant="h2"
            className="text-3xl text-balance sm:text-4xl"
          >
            Un guide, un prix, accès à vie
          </Typography>
          <Typography variant="large" className="text-muted-foreground">
            Paiement unique. Aucun abonnement.
          </Typography>
        </div>

        <div className="border-primary/40 bg-card w-full max-w-md rounded-2xl border-2 p-8 shadow-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary size-5" aria-hidden />
            <Typography variant="large" className="font-semibold">
              Le Guide Premium
            </Typography>
          </div>
          <div className="mt-4 flex items-end gap-2">
            <span className="text-5xl font-bold tracking-tight">
              {PRICE_XPF}
            </span>
          </div>
          <Typography variant="muted" className="mt-1">
            Paiement unique · Accès immédiat
          </Typography>

          <ul className="mt-6 flex flex-col gap-3">
            {OFFER_INCLUDES.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <Check
                  className="text-primary mt-0.5 size-5 shrink-0"
                  aria-hidden
                />
                <Typography variant="small" className="font-normal">
                  {line}
                </Typography>
              </li>
            ))}
          </ul>

          <Link
            href={GUIDE_CHECKOUT_URL}
            className={buttonVariants({
              size: "lg",
              className: "mt-8 w-full",
            })}
          >
            <Download className="size-4" aria-hidden />
            Obtenir le guide
          </Link>
          <Typography
            variant="muted"
            className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs"
          >
            <Clock className="size-3.5" aria-hidden />
            Disponible immédiatement après le paiement
          </Typography>
        </div>
      </SectionLayout>

      {/* FAQ */}
      <SectionLayout variant="card" size="sm" className="flex flex-col gap-8">
        <Typography
          variant="h2"
          className="text-center text-3xl text-balance sm:text-4xl"
        >
          Questions fréquentes
        </Typography>
        <div className="flex flex-col gap-4">
          {FAQ.map((item) => (
            <div
              key={item.question}
              className="bg-background/60 flex flex-col gap-2 rounded-xl border p-6"
            >
              <Typography variant="large" className="text-base font-semibold">
                {item.question}
              </Typography>
              <Typography variant="muted">{item.answer}</Typography>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <Typography variant="muted" className="text-balance">
            Une autre question avant de commander&nbsp;?
          </Typography>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={GUIDE_CHECKOUT_URL}
              className={buttonVariants({ size: "lg" })}
            >
              Obtenir le guide — {PRICE_XPF}
            </Link>
            <Link
              href={SiteConfig.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Écrivez-nous sur WhatsApp
            </Link>
          </div>
        </div>
      </SectionLayout>

      <Footer />
    </div>
  );
}
