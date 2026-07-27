import GridBackground from "@/components/nowts/grid-background";
import { Typography } from "@/components/nowts/typography";
import { CircleSvg } from "@/components/svg/circle-svg";
import { LogoSvg } from "@/components/svg/logo-svg";
import { buttonVariants } from "@/components/ui/button";
import { GuideCheckoutButton } from "@/features/guide/guide-checkout-button";
import { SectionLayout } from "@/features/landing/section-layout";
import { Footer } from "@/features/layout/footer";
import { SiteConfig } from "@/site-config";
import {
  BadgeCheck,
  Bot,
  Calendar,
  Check,
  ClipboardCheck,
  Clock,
  Image as ImageIcon,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Star,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const PRICE_XPF = "2 990 XPF";
const PRICE_DETAIL = "≈ 25 €, paiement unique";

export const metadata: Metadata = {
  title: "La Méthode Visibilité Locale — le guide Google des commerces du fenua",
  description:
    "Le guide premium pour les commerces de Polynésie : audit Google sur 100 points, plan 30 jours, système d'avis et dossier spécial IA. Soyez trouvé en premier par les clients locaux et les touristes.",
  alternates: { canonical: `${SiteConfig.prodUrl}/guidepremium` },
  // noindex tant que le produit Dodo n'est pas branché en prod. Passer à
  // index:true au lancement (une fois le produit Dodo one-time configuré).
  robots: { index: false, follow: true },
};

// Livrables concrets — ce qui distingue ce guide d'un article de blog.
const DELIVERABLES = [
  {
    icon: ClipboardCheck,
    title: "L'audit Google sur 100 points",
    description:
      "Une grille prête à remplir pour noter votre fiche et repérer, chiffres en main, les 3 corrections qui rapportent le plus.",
  },
  {
    icon: Calendar,
    title: "Le plan d'action sur 30 jours",
    description:
      "Une action simple par jour. Pas de « il faudrait » : vous savez exactement quoi faire, ce matin, et le matin suivant.",
  },
  {
    icon: Bot,
    title: "Le dossier spécial IA",
    description:
      "Vos clients commencent à demander à ChatGPT où manger ou dormir. Comment être la réponse — le sujet que personne ne traite encore ici.",
  },
  {
    icon: Store,
    title: "Les fiches par métier",
    description:
      "Restauration, beauté, location, tourisme : les priorités propres à votre activité, pas des conseils passe-partout.",
  },
  {
    icon: ImageIcon,
    title: "Le plan photo qui rassure",
    description:
      "Quelles photos prendre, dans quel ordre, avec un simple téléphone — pour donner envie d'entrer plutôt que de passer.",
  },
  {
    icon: LayoutDashboard,
    title: "Le tableau de bord mensuel",
    description:
      "Une page à remplir chaque mois pour suivre vos avis, votre note et vos progrès — sans y passer des heures.",
  },
];

// Section « Ce guide est fait pour vous si… » — miroir des douleurs ET des
// désirs du persona (commerçant du fenua).
const FOR_YOU_IF = [
  "Vous servez bien vos clients, mais votre fiche Google ne le montre pas",
  "Vous voyez des concurrents moins bons, mais mieux notés, capter votre clientèle",
  "Vous ne savez pas comment demander un avis sans être gênant",
  "Vous voulez capter les touristes qui vous cherchent sur Google Maps",
  "Vous n'avez ni le temps ni l'envie de vous battre avec la technique",
  "Vous voulez plus de clients sans payer de la publicité chaque mois",
];

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
      "Le vrai levier de classement, ce n'est pas la chance : c'est un flux d'avis frais. On vous montre comment l'installer, sans quémander.",
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
  "Le guide complet — 34 pages, format PDF, à lire sur téléphone ou ordinateur",
  "L'audit 100 points, le plan 30 jours et le tableau de bord, prêts à l'emploi",
  "Le dossier spécial IA : la longueur d'avance sur vos concurrents",
  "Accès immédiat, à garder à vie — pensé pour un commerce du fenua",
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
      "Un guide PDF complet de 34 pages, avec l'audit 100 points, le plan 30 jours, le tableau de bord et le dossier IA. Accessible immédiatement après le paiement, à garder à vie. Paiement unique, aucun abonnement.",
  },
  {
    question: "Combien ça coûterait de faire faire ça par une agence ?",
    answer:
      "Une prestation de visibilité Google se facture des dizaines de milliers de francs. Ici, vous avez la méthode complète pour le prix d'un plein d'essence — et vous gardez la main sur votre fiche.",
  },
  {
    question: "Et si le guide ne me convient pas ?",
    answer:
      "Vous êtes couvert : si le guide ne vous apporte rien, écrivez-nous sous 14 jours et vous êtes remboursé. Vous ne prenez aucun risque.",
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
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-32 pb-16 sm:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-24">
          <div className="text-center lg:text-left">
            <Typography
              variant="small"
              className="text-primary mb-4 font-semibold text-balance sm:text-base"
            >
              Commerçant en Polynésie&nbsp;? Vos futurs clients vous jugent sur
              Google avant de vous connaître.
            </Typography>
            <Typography
              variant="h1"
              className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              Soyez le commerce trouvé{" "}
              <span className="relative inline-block">
                <span>en premier</span>
                <CircleSvg className="fill-primary absolute inset-0" />
              </span>{" "}
              — par les locaux, les touristes… et l'IA
            </Typography>
            <Typography
              variant="large"
              className="text-muted-foreground mt-6 text-lg font-medium text-pretty sm:text-xl/8"
            >
              La méthode complète pour faire de votre fiche Google votre meilleur
              commercial : plus de visibilité, plus d'avis, plus de clients —
              sans payer de publicité, sans compétence technique.
            </Typography>
            <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
              <Link
                href="#offre"
                className={buttonVariants({ size: "lg", className: "px-8" })}
              >
                Je veux le guide — {PRICE_XPF}
              </Link>
              <Typography variant="muted" className="text-xs">
                Paiement unique · Accès immédiat · Garanti 14 jours
              </Typography>
            </div>
            <div className="text-muted-foreground mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium lg:justify-start">
              <span className="flex items-center gap-1.5">
                <ClipboardCheck className="text-primary size-4" aria-hidden />
                Audit 100 points
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="text-primary size-4" aria-hidden />
                Plan 30 jours
              </span>
              <span className="flex items-center gap-1.5">
                <Bot className="text-primary size-4" aria-hidden />
                Dossier IA
              </span>
              <span className="flex items-center gap-1.5">
                <LayoutDashboard className="text-primary size-4" aria-hidden />
                34 pages
              </span>
            </div>
          </div>
          {/* Visuel produit — mockup de la couverture réelle */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <Image
              src="/images/ebook/cover-mockup.png"
              alt="Le guide La Méthode Visibilité Locale — ScanNShine"
              width={1360}
              height={1182}
              priority
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* PROBLÈME / CONSTAT */}
      <SectionLayout variant="card" size="base" className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
            Vous faites du bon travail. Google ne le montre pas.
          </Typography>
          <Typography
            variant="large"
            className="text-muted-foreground max-w-2xl text-balance"
          >
            Aujourd'hui, un client — ou un touriste — vous juge sur Google avant
            même de vous connaître. S'il ne vous trouve pas, ou s'il tombe sur
            une fiche vide, il va chez le voisin. Chaque jour, l'écart se creuse.
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

      {/* CE QU'IL Y A DANS LA MÉTHODE (livrables concrets) */}
      <SectionLayout size="lg" className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
            Une méthode concrète, pas un cours théorique
          </Typography>
          <Typography
            variant="large"
            className="text-muted-foreground max-w-2xl text-balance"
          >
            Des outils prêts à l'emploi, que vous remplissez et appliquez —
            pensés pour un commerce de Polynésie.
          </Typography>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map((item) => (
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

      {/* CE QUE VOUS ALLEZ OBTENIR */}
      <SectionLayout size="lg" className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
            Ce que ce guide va changer pour vous
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

      {/* CE GUIDE EST FAIT POUR VOUS SI… */}
      <SectionLayout variant="card" size="base" className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
            Ce guide est fait pour vous si…
          </Typography>
          <Typography
            variant="large"
            className="text-muted-foreground max-w-2xl text-balance"
          >
            Si vous vous reconnaissez dans une seule de ces phrases, vous êtes au
            bon endroit.
          </Typography>
        </div>
        <div className="mx-auto grid w-full max-w-4xl gap-4 sm:grid-cols-2">
          {FOR_YOU_IF.map((item) => (
            <div
              key={item}
              className="bg-background/60 flex items-start gap-3 rounded-xl border p-5"
            >
              <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-full">
                <Check className="size-4" aria-hidden />
              </div>
              <Typography variant="small" className="leading-relaxed font-medium">
                {item}
              </Typography>
            </div>
          ))}
        </div>
      </SectionLayout>

      {/* POUR QUI */}
      <SectionLayout size="base" className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
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
          <Typography variant="h2" className="text-3xl text-balance sm:text-4xl">
            Un guide, un prix, accès à vie
          </Typography>
          <Typography variant="large" className="text-muted-foreground">
            Le prix d'un plein d'essence. Une méthode qui travaille pour vous des
            années.
          </Typography>
        </div>

        <div className="border-primary/40 bg-card w-full max-w-md rounded-2xl border-2 p-8 shadow-lg">
          <Typography variant="large" className="font-semibold">
            La Méthode Visibilité Locale
          </Typography>
          <div className="mt-4 flex items-end gap-3">
            <span className="text-5xl font-bold tracking-tight">{PRICE_XPF}</span>
            <span className="text-muted-foreground mb-1 text-sm">
              {PRICE_DETAIL}
            </span>
          </div>
          <Typography variant="muted" className="mt-1">
            Paiement unique · Accès immédiat · Sans abonnement
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

          <GuideCheckoutButton
            label="Obtenir le guide"
            withIcon
            className="mt-8 w-full"
          />
          <div className="text-muted-foreground mt-4 flex items-center justify-center gap-1.5 text-center text-xs">
            <ShieldCheck className="size-3.5" aria-hidden />
            Garantie satisfait ou remboursé sous 14 jours
          </div>
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
            <GuideCheckoutButton label={`Obtenir le guide — ${PRICE_XPF}`} />
            <Link
              href={SiteConfig.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <MessageCircle className="size-4" aria-hidden />
              Écrivez-nous sur WhatsApp
            </Link>
          </div>
        </div>
      </SectionLayout>

      <Footer />
    </div>
  );
}
