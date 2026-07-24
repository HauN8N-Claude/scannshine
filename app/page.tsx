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
import { SectionDivider } from "@/features/landing/section-divider";
import { WhyReviewsSection } from "@/features/landing/why-reviews-section";
import { Footer } from "@/features/layout/footer";
import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";

const PAGE_TITLE = "ScanNShine — Plus d'avis Google pour votre commerce au fenua";
const PAGE_DESCRIPTION =
  "La plaque NFC + QR code qui transforme vos clients satisfaits en avis Google. Posée sur votre comptoir, livrée prête à l'emploi. Pour les commerces de Tahiti et de Polynésie française.";

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
        alt: "ScanNShine — la plaque NFC + QR code qui transforme vos clients satisfaits en avis Google",
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
    question: "Est-ce que ça marche vraiment pour un commerce comme le mien ?",
    answer:
      "Oui — snack, salon, boutique, loueur, pension : si vos clients passent en caisse, la plaque travaille. Vos clients satisfaits **veulent** vous aider, ils oublient juste une fois partis. La plaque capte l'avis **au bon moment** : sur place, pendant qu'ils sont contents. Plus d'avis récents, c'est une meilleure place sur Google Maps — et plus de clients qui poussent **votre** porte.",
  },
  {
    question: "Je ne suis pas très à l'aise avec la technique. C'est compliqué ?",
    answer:
      "C'est l'inverse : il n'y a **rien à installer**. La plaque arrive **programmée, testée et reliée à votre fiche Google**. Vous la collez sur le comptoir, c'est terminé. Pas d'application, pas de compte, pas d'abonnement — et le support est **en français, par des gens du fenua**.",
  },
  {
    question: "Ça marche avec quels téléphones ?",
    answer:
      "Tous. Les téléphones récents (iPhone comme Android) utilisent le **NFC** : votre client approche son téléphone, la page d'avis s'ouvre. Les autres scannent le **QR code** imprimé sur la même plaque. Dans les deux cas, **rien à installer** côté client.",
  },
  {
    question: "Est-ce autorisé par Google ?",
    answer:
      "Oui, sans réserve. **Demander des avis est encouragé par Google.** Ce qui est interdit, c'est d'acheter de faux avis ou de filtrer qui peut en laisser — la plaque ne fait rien de tout ça : elle ouvre votre page d'avis, et vos clients écrivent ce qu'ils veulent. Des avis **100 % authentiques**.",
  },
  {
    question: "4 990 XPF, c'est rentable pour un petit commerce ?",
    answer:
      "C'est un **paiement unique** — pas d'abonnement, pas de frais cachés. Un seul client supplémentaire suffit souvent à rembourser la plaque. Et contrairement à une publicité, un avis Google **reste pour toujours** : la plaque continue de travailler mois après mois, sans rien coûter de plus.",
  },
  {
    question: "Et si ma fiche Google change un jour ?",
    answer:
      "C'est prévu. La plaque pointe vers un **lien que nous pouvons modifier à distance** : déménagement, changement de nom, nouvelle fiche — on met à jour le lien, **sans changer la plaque**.",
  },
  {
    question: "Comment se passent la livraison et le paiement ?",
    answer:
      "Vous remplissez le formulaire, **on vous rappelle** pour confirmer et vérifier votre fiche Google ensemble. Puis on vous livre **en main propre**, la plaque est testée devant vous — et c'est là que vous réglez. **Aucun paiement en ligne.**",
  },
  {
    question: "Je n'ai pas encore de fiche Google, ou très peu d'avis ?",
    answer:
      "Ce n'est pas bloquant. S'il vous manque la fiche, elle est **gratuite** à créer et on vous guide. Et peu d'avis, c'est justement la meilleure raison de poser la plaque : chaque nouvel avis compte double quand on part de peu.",
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
