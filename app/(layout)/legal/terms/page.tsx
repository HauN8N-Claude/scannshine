import { Typography } from "@/components/nowts/typography";
import { Layout, LayoutContent } from "@/features/page/layout";
import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote-client/rsc";

// ⚠️ Modèle de CGV/CGU à faire relire par un juriste avant démarchage.
// Les mentions entre crochets […] doivent être complétées avec les
// informations légales réelles de l'éditeur (raison sociale, N° Tahiti, etc.).
const markdown = `_Dernière mise à jour : 14 juillet 2026_

## 1. Éditeur du service

Le service **${SiteConfig.title}** (le « Service »), accessible à l'adresse ${SiteConfig.prodUrl}, est édité par :

- **[Raison sociale de l'éditeur]**
- [Forme juridique et capital social le cas échéant]
- Siège : ${SiteConfig.company.address}
- N° Tahiti / RCS : [Numéro d'immatriculation]
- Contact : ${SiteConfig.supportEmail}

## 2. Objet

${SiteConfig.title} est un service en ligne (SaaS) qui permet aux commerces de proposer à leurs clients un QR code redirigeant vers leur fiche Google afin de faciliter le dépôt d'avis, de recueillir des retours privés et de constituer une base de contacts consentants.

Les présentes conditions régissent l'accès et l'utilisation du Service. En créant un compte, le client (le « Client ») les accepte sans réserve.

## 3. Abonnement, essai et tarifs

- L'abonnement est proposé au tarif de **3 990 XPF/mois** (débité en euros, soit environ 33,50 €/mois, le franc pacifique étant à parité fixe avec l'euro).
- L'inscription ouvre une **période d'essai de 7 jours**. Un moyen de paiement est demandé à l'inscription ; il n'est débité qu'à l'issue de l'essai, sauf résiliation avant son terme.
- L'abonnement est **mensuel, sans engagement**, reconduit tacitement chaque mois.
- Les paiements sont traités par notre prestataire **Dodo Payments** agissant en qualité de revendeur (Merchant of Record). ${SiteConfig.title} n'a jamais accès aux données complètes de votre carte bancaire.

## 4. Résiliation

Le Client peut résilier à tout moment depuis son espace « Mon abonnement ». La résiliation prend effet à la fin de la période mensuelle en cours ; aucun remboursement au prorata n'est effectué. À l'issue, l'accès au tableau de bord est suspendu et le QR code cesse de rediriger après un court délai de grâce.

## 5. Obligations du Client

Le Client s'engage à fournir des informations exactes, à disposer des droits nécessaires sur sa fiche Google, et à ne pas détourner le Service pour solliciter de faux avis ou contourner les règles des plateformes tierces (notamment Google). ${SiteConfig.title} ne saurait être tenu responsable d'une sanction infligée au Client par une plateforme tierce du fait d'un usage non conforme.

## 6. Disponibilité et responsabilité

Le Service est fourni « en l'état ». Nous nous efforçons d'assurer une disponibilité continue mais ne garantissons pas une absence totale d'interruption. La responsabilité de l'éditeur est limitée, dans la mesure permise par la loi, au montant des sommes versées par le Client au cours des douze derniers mois.

## 7. Données personnelles

Le traitement des données personnelles est décrit dans notre [Politique de confidentialité](/legal/privacy).

## 8. Droit applicable

Les présentes conditions sont régies par le droit applicable en Polynésie française. Tout litige relève, à défaut de résolution amiable, des juridictions compétentes de Papeete.

---

_Pour toute question relative à ces conditions : ${SiteConfig.supportEmail}._
`;

export const metadata: Metadata = {
  title: `${SiteConfig.title} — Conditions générales`,
  description:
    "Conditions générales d'utilisation et de vente du service ScanNShine.",
};

export default function Page() {
  return (
    <div>
      <div className="bg-card flex w-full items-center justify-center p-8 lg:p-12">
        <Typography variant="h1">Conditions générales</Typography>
      </div>
      <Layout>
        <LayoutContent className="typography m-auto mb-8">
          <MDXRemote source={markdown} />
        </LayoutContent>
      </Layout>
    </div>
  );
}
