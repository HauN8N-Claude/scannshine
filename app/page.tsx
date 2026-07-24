import { FAQSection } from "@/features/landing/faq-section";
import { FounderSection } from "@/features/landing/founder-section";
import { Hero } from "@/features/landing/hero";
import { HowItWorksSection } from "@/features/landing/how-it-works";
import { LandingHeader } from "@/features/landing/landing-header";
import { PainSection } from "@/features/landing/pain";
import { ProblemSection } from "@/features/landing/problem-section";
import { ProductSection } from "@/features/landing/product-section";
import { ReviewsSection } from "@/features/landing/reviews-section";
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
    question: "Est-ce que ça marche vraiment pour un commerce comme le mien ?",
    answer:
      "Oui, et c'est là que tout se joue. Vos clients satisfaits **veulent** vous aider — ils oublient juste de le faire une fois rentrés chez eux. En leur tendant le QR au bon moment (à l'addition, en caisse, sur le comptoir), vous captez l'avis **tant qu'ils sont là et contents**. Ils scannent avec l'appareil photo, aucune appli à installer de leur côté. Plus d'avis récents = meilleure place sur Google Maps = plus de clients qui poussent **votre** porte plutôt que celle d'à côté.",
  },
  {
    question: "Je ne suis pas très à l'aise avec l'informatique. C'est compliqué ?",
    answer:
      "Non. L'installation prend **3 minutes** : vous collez le lien de votre fiche Google, on génère votre QR code et votre page automatiquement. Rien à installer, rien à coder, aucune compétence technique. Si vous savez envoyer un SMS, vous savez utiliser ScanNShine — et le support est **en français, par des gens du fenua**.",
  },
  {
    question: "Ça va me demander du travail tous les jours ?",
    answer:
      "Zéro. Une fois le QR posé en caisse, **ça tourne tout seul** : vos clients scannent, les avis arrivent sur Google, et vous recevez juste un petit résumé chaque semaine. Vous gardez la tête dans votre commerce, pas dans un tableau de bord.",
  },
  {
    question: "Et si un client mécontent en profite pour me démolir en public ?",
    answer:
      "C'est justement ce que ScanNShine désamorce. Un client déçu est invité à **vous écrire d'abord en privé, par email** — l'occasion de régler le souci avant qu'il ne s'affiche sur votre fiche. Le lien vers Google **reste accessible à tout le monde** (c'est la règle, et ce que Google exige) : on ne bloque personne, on offre juste au client déçu un moyen simple de vous joindre en direct. Résultat : moins de mauvaises surprises publiques, plus de problèmes réglés à temps.",
  },
  {
    question: "Est-ce autorisé par Google ?",
    answer:
      "Oui, sans réserve. Demander des avis est **encouragé** par Google. Ce qui est interdit, c'est de filtrer qui peut en laisser ou d'acheter de faux avis — et ça, ScanNShine ne le fait jamais. Votre fiche reste ouverte à tous et vos avis sont **100 % authentiques**, écrits par de vrais clients. Vous construisez une réputation solide, pas un château de cartes.",
  },
  {
    question: "1 990 XPF par mois, c'est rentable pour un petit commerce ?",
    answer:
      "Faites le calcul : c'est **moins qu'un plat du jour par semaine**. Un seul client en plus par mois — un couvert, une coupe, une course — et l'abonnement est déjà remboursé. Or un meilleur classement Google, ce n'est pas un client de plus par mois : c'est un flux **régulier** de gens qui vous trouvent avant vos concurrents. Et vous démarrez par **7 jours gratuits**, sans rien débourser.",
  },
  {
    question: "Je peux arrêter quand je veux ?",
    answer:
      "Oui, **en deux clics** depuis votre espace, sans justification ni préavis. L'essai de 7 jours est gratuit et vous n'êtes débité qu'après. Sans engagement : vous restez parce que ça marche, pas parce que vous êtes coincé. Le paiement passe par Dodo Payments, sécurisé et pensé pour les entreprises de Polynésie (1 990 XPF/mois, débité ≈ 16,90 € — le franc pacifique est à parité fixe avec l'euro).",
  },
  {
    question: "Ça marche sans site web, et jusque dans les îles ?",
    answer:
      "Parfaitement. Pas besoin de site : il vous faut juste une fiche Google Business (gratuite — la plupart des commerces en ont déjà une), et on crée votre page pour vous. La page que scannent vos clients est **ultra-légère**, pensée pour les connexions mobiles lentes. Tant qu'il y a du réseau, ça fonctionne — de Papeete à Rangiroa. Vous imprimez un chevalet et un autocollant à vos couleurs, ou vous affichez le QR de poche directement depuis votre téléphone.",
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

      <WhyReviewsSection />

      <ProductSection />

      <HowItWorksSection />

      <ReviewsSection />

      <ScannshinePricing />

      <SectionDivider />

      <FounderSection />

      <FAQSection faq={FAQ} />

      <Footer />
    </div>
  );
}
