import { Typography } from "@/components/nowts/typography";
import { Layout, LayoutContent } from "@/features/page/layout";
import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote-client/rsc";

// ⚠️ CGV/CGU à faire relire par un juriste avant démarchage à grande échelle
// (notamment volet fiscal TVA / marchand de référence Dodo et médiation conso).
const markdown = `_Dernière mise à jour : 14 juillet 2026_

## 1. Éditeur du service

Le service **${SiteConfig.title}** (le « Service »), accessible à l'adresse ${SiteConfig.prodUrl}, est édité par :

- **${SiteConfig.legal.publisher}** — ${SiteConfig.legal.form}
- N° Tahiti : ${SiteConfig.legal.tahitiNumber}
- Adresse : ${SiteConfig.legal.address}
- Contact : ${SiteConfig.legal.email}

Ci-après « l'Éditeur ». Le Service ${SiteConfig.title} est une marque exploitée par ${SiteConfig.legal.publisher}.

## 2. Objet

${SiteConfig.title} est un service en ligne (SaaS) destiné aux commerces (le « Client ») qui leur permet de :
- proposer à leurs propres clients un QR code redirigeant vers leur fiche Google afin de **faciliter le dépôt d'avis** ;
- recueillir des **retours privés** de la part de clients insatisfaits ;
- constituer une **base de contacts consentants** et suivre des **statistiques** d'usage ;
- en option payante, activer des fonctionnalités de **gestion de la relation client et d'envoi de messages** (SMS / e-mail) à leurs contacts consentants.

Les présentes conditions régissent l'accès et l'utilisation du Service. En créant un compte, le Client les accepte sans réserve.

## 3. Fonctionnement et conformité aux règles sur les avis

Le Service dirige **tous** les clients du Client vers sa fiche Google, sans jamais filtrer, trier ni pré-sélectionner qui peut déposer un avis en fonction de sa satisfaction présumée. Le recueil de retours privés est un **canal supplémentaire**, jamais un obstacle à l'accès à Google. L'Éditeur ne pratique donc **aucun « filtrage d'avis » (review gating)**, pratique interdite par Google et par la réglementation applicable.

## 4. Abonnement, essai et tarifs

- L'abonnement de base est proposé au tarif de **3 990 XPF/mois** (débité en euros, soit environ 33,50 €/mois, le franc pacifique étant à parité fixe avec l'euro).
- Des **options payantes** peuvent être proposées en supplément (ex. gestion de contacts et envoi de messages), à leur tarif affiché lors de la souscription.
- L'inscription ouvre une **période d'essai de 7 jours**. Un moyen de paiement est demandé à l'inscription ; il n'est débité qu'à l'issue de l'essai, sauf résiliation avant son terme.
- L'abonnement est **mensuel, sans engagement**, reconduit tacitement chaque mois.
- Les paiements sont traités par notre prestataire **Dodo Payments**, agissant en qualité de **marchand de référence (Merchant of Record)** : il émet la facture, apparaît sur le relevé bancaire du Client et fournit une facture téléchargeable après chaque paiement. L'Éditeur n'a jamais accès aux données complètes de la carte bancaire.
- Les tarifs peuvent évoluer ; toute modification est notifiée au Client avant son entrée en vigueur, celui-ci restant libre de résilier.

## 5. Résiliation

Le Client peut résilier à tout moment depuis son espace « Mon abonnement ». La résiliation prend effet à la fin de la période mensuelle en cours ; aucun remboursement au prorata n'est effectué. À l'issue, l'accès au tableau de bord est suspendu et le QR code cesse de rediriger après un court délai de grâce.

## 6. Obligations du Client

Le Client s'engage à :
- fournir des informations exactes et disposer des droits nécessaires sur sa fiche Google ;
- **respecter les règles de Google relatives aux avis** : ne jamais offrir de contrepartie (remise, cadeau, points de fidélité) en échange d'un avis, ne pas solliciter de faux avis, ne pas décourager ni filtrer les avis négatifs, ne pas solliciter sélectivement les avis positifs ;
- n'utiliser les coordonnées de ses propres clients (contacts, envois de messages) que dans le **respect de la réglementation sur la protection des données et la prospection commerciale**, et **garantir avoir recueilli le consentement** requis avant tout envoi de message commercial (voir l'annexe de traitement des données) ;
- ne pas détourner le Service pour contourner les règles des plateformes tierces.

L'Éditeur ne saurait être tenu responsable d'une sanction infligée au Client par une plateforme tierce (notamment Google) ou d'un manquement du Client à ses obligations de responsable de traitement du fait d'un usage non conforme.

## 7. Disponibilité et responsabilité

Le Service est fourni « en l'état ». L'Éditeur s'efforce d'assurer une disponibilité continue mais ne garantit pas une absence totale d'interruption. La responsabilité de l'Éditeur est limitée, dans la mesure permise par la loi, au montant des sommes versées par le Client au cours des douze derniers mois.

## 8. Données personnelles

Le Client agit en qualité de **responsable de traitement** des données de ses propres clients ; l'Éditeur agit en qualité de **sous-traitant** au sens de l'article 28 du RGPD. Les conditions de ce traitement (finalités, sécurité, sous-traitants ultérieurs, sort des données) figurent dans notre [Politique de confidentialité](/legal/privacy), qui vaut accord de traitement des données. Le traitement des données du Client lui-même (compte, facturation) y est également décrit.

## 9. Droit applicable

Les présentes conditions sont régies par le droit applicable en Polynésie française. Tout litige relève, à défaut de résolution amiable, des juridictions compétentes de Papeete.

---

_Pour toute question relative à ces conditions : ${SiteConfig.legal.email}._
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
