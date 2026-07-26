import { FAQSection } from "@/features/landing/faq-section";
import { ForWhoSection } from "@/features/landing/for-who-section";
import { FounderSection } from "@/features/landing/founder-section";
import { Hero } from "@/features/landing/hero";
import { HowItWorksSection } from "@/features/landing/how-it-works";
import { LandingHeader } from "@/features/landing/landing-header";
import { PainSection } from "@/features/landing/pain";
import { ProblemSection } from "@/features/landing/problem-section";
import { ProductSection } from "@/features/landing/product-section";
import { ScannshinePricing } from "@/features/landing/scannshine-pricing";
import { SearchRankingSection } from "@/features/landing/search-ranking-section";
import { SectionDivider } from "@/features/landing/section-divider";
import { WhyReviewsSection } from "@/features/landing/why-reviews-section";
import { Footer } from "@/features/layout/footer";
import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";

const PAGE_TITLE = "ScanNShine — Plus d'avis Google pour votre commerce au fenua";
const PAGE_DESCRIPTION =
  "La plaquette sans contact qui transforme vos clients satisfaits en avis Google. Posée sur votre comptoir, livrée prête à l'emploi. Pour les commerces de Tahiti et de Polynésie française.";

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
        alt: "ScanNShine — la plaquette sans contact qui transforme vos clients satisfaits en avis Google",
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
    question: "Je ne suis pas doué avec la technologie. Je vais y arriver ?",
    answer:
      "Oui, parce qu'il n'y a rien à faire. La plaquette arrive **prête à l'emploi, déjà reliée à votre fiche Google et testée**. Vous la collez à côté de la caisse, c'est terminé. Pas d'application, pas de mot de passe, pas de réglages — et si besoin, le support est **en français, par des gens du fenua**.",
  },
  {
    question: "4 990 XPF, ce n'est pas un peu cher ?",
    answer:
      "C'est un **paiement unique** : pas d'abonnement, pas de frais cachés. Comparez avec la publicité : une pub s'arrête quand vous arrêtez de payer, un avis Google reste **pour toujours**. Un seul client supplémentaire suffit en général à rembourser la plaquette — et elle travaille tous les jours, pendant des années.",
  },
  {
    question: "Mes clients vont vraiment prendre le temps de laisser un avis ?",
    answer:
      "Oui, parce que vous leur demandez **au bon moment** : sur place, au moment de payer, pendant qu'ils sont contents. Le geste est le même qu'un **paiement sans contact** — ils approchent leur téléphone (iPhone comme Android), la page d'avis s'ouvre, ils mettent leurs étoiles. **30 secondes**, rien à installer, rien à taper. C'est une fois rentrés chez eux qu'ils n'écrivent jamais — pas quand c'est devant eux.",
  },
  {
    question: "Je risque des ennuis avec Google ?",
    answer:
      "Aucun. **Google encourage les commerçants à demander des avis.** Ce qui est interdit, c'est d'acheter de faux avis ou d'empêcher les clients mécontents d'écrire. La plaquette ne fait rien de tout ça : elle ouvre simplement votre page d'avis, et chacun écrit ce qu'il veut. Des avis **100 % vrais**, écrits par de vrais clients.",
  },
  {
    question: "Et si ça ne fonctionne pas chez moi ?",
    answer:
      "Vous ne prenez aucun risque : on vous livre **en main propre**, on teste la plaquette **devant vous, dans votre commerce** — et vous ne payez **qu'à ce moment-là**. Aucun paiement en ligne. Et si un jour votre fiche Google change (nom, adresse, nouvelle fiche), on met votre plaquette à jour **à distance**, sans la changer.",
  },
  {
    question: "Je paie une seule fois. Et si la plaquette tombe en panne ?",
    answer:
      "Vous payez **une seule fois, à la livraison** — et c'est réglé pour de bon. Si un jour votre plaquette ne marche plus (panne, décollement, défaut quelconque), **on vous la remplace, gratuitement**. Vous n'avez rien de plus à débourser : une plaquette qui vous fait défaut, on la change, point.",
  },
] as const;

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

      <WhyReviewsSection />

      <SearchRankingSection />

      <ProductSection />

      <HowItWorksSection />

      <ForWhoSection />


      <ScannshinePricing />

      <SectionDivider />

      <FounderSection />

      <FAQSection faq={FAQ} />

      <Footer />
    </div>
  );
}
