import { FAQSection } from "@/features/landing/faq-section";
import { FounderSection } from "@/features/landing/founder-section";
import { Hero } from "@/features/landing/hero";
import { HowItWorksSection } from "@/features/landing/how-it-works";
import { LandingHeader } from "@/features/landing/landing-header";
import { PainSection } from "@/features/landing/pain";
import { ProblemSection } from "@/features/landing/problem-section";
import { ScannshinePricing } from "@/features/landing/scannshine-pricing";
import { SectionDivider } from "@/features/landing/section-divider";
import { Footer } from "@/features/layout/footer";
import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";

const PAGE_TITLE = "ScanNShine — Plus d'avis Google pour votre commerce au fenua";
const PAGE_DESCRIPTION =
  "Un QR code en caisse qui transforme vos clients satisfaits en avis Google. Pensé pour les commerces de Polynésie française. Essai gratuit 7 jours, 3 990 XPF/mois.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: SiteConfig.prodUrl,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: SiteConfig.prodUrl,
    siteName: "ScanNShine",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${SiteConfig.prodUrl}/images/og.jpg`,
        width: 1200,
        height: 630,
        alt: "ScanNShine — le QR code qui transforme vos clients satisfaits en avis Google",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SiteConfig.prodUrl}/images/og.jpg`],
  },
};

const FAQ = [
  {
    question: "Est-ce autorisé par Google ?",
    answer:
      "Oui. ScanNShine facilite la demande d'avis, ce que Google encourage. Le lien vers votre fiche Google reste visible pour **tous** vos clients, satisfaits ou non — nous ne filtrons jamais qui peut laisser un avis (c'est ça qui est interdit). Les retours négatifs privés sont un canal **en plus**, pas un barrage.",
  },
  {
    question: "Ça marche si je n'ai pas de site web ?",
    answer:
      "Parfaitement. Il vous faut juste une fiche Google Business (gratuite — la plupart des commerces en ont déjà une). ScanNShine crée votre page de collecte automatiquement : vous n'avez rien à construire.",
  },
  {
    question: "Comment j'affiche le QR code ?",
    answer:
      "Vous téléchargez un chevalet A5 et un autocollant prêts à imprimer, aux couleurs de votre commerce. Et pour les activités mobiles (taxi, artisan, tour), affichez le QR directement depuis votre téléphone.",
  },
  {
    question: "Je peux annuler quand je veux ?",
    answer:
      "Oui, en deux clics depuis votre espace, sans justification ni préavis. L'essai de 7 jours est gratuit et vous n'êtes débité qu'après.",
  },
  {
    question: "Le paiement est-il sécurisé ? Ça fonctionne depuis la Polynésie ?",
    answer:
      "Oui. Le paiement passe par Dodo Payments, une plateforme sécurisée qui fonctionne pour les entreprises de Polynésie française. Le tarif est de 3 990 XPF/mois (débité ≈ 33,50 € — le franc pacifique est à parité fixe avec l'euro).",
  },
  {
    question: "Ça marche dans les îles ?",
    answer:
      "Oui. La page que scannent vos clients est ultra-légère et pensée pour les connexions mobiles lentes. Tant que le téléphone a du réseau, ça fonctionne.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: entry.answer.replaceAll("**", ""),
    },
  })),
};

export default function HomePage() {
  return (
    <div className="bg-background text-foreground relative flex h-fit flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <div className="mt-16"></div>

      <LandingHeader />

      <Hero />

      <ProblemSection />

      <PainSection />

      <SectionDivider />

      <HowItWorksSection />

      <ScannshinePricing />

      <SectionDivider />

      <FounderSection />

      <FAQSection faq={FAQ} />

      <Footer />
    </div>
  );
}
