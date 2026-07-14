import { Typography } from "@/components/nowts/typography";
import { Layout, LayoutContent } from "@/features/page/layout";
import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote-client/rsc";

// ⚠️ Politique de confidentialité + accord de traitement (art. 28 RGPD) à faire
// relire par un juriste. Elle décrit deux relations : l'Éditeur responsable de
// traitement (données du Client) et l'Éditeur sous-traitant (données des clients
// finaux, dont le Client est responsable de traitement).
const markdown = `_Dernière mise à jour : 14 juillet 2026_

## 1. Responsable du traitement

Les données collectées via **${SiteConfig.title}** (${SiteConfig.prodUrl}) sont traitées par **${SiteConfig.legal.publisher}** — ${SiteConfig.legal.form} (N° Tahiti ${SiteConfig.legal.tahitiNumber}), ${SiteConfig.legal.address} (ci-après « l'Éditeur »).

Contact : ${SiteConfig.legal.email}

## 2. Deux rôles distincts

- Pour les **données du commerce Client** (compte, facturation, usage), l'Éditeur est **responsable de traitement**.
- Pour les **données des clients finaux** (contacts, retours privés) collectées via le QR code, c'est le **commerce Client qui est responsable de traitement** ; l'Éditeur agit comme **sous-traitant** au sens de l'article 28 du RGPD et ne traite ces données que sur instruction du Client, pour lui fournir le Service.

## 3. Données que nous collectons

**Données du commerce Client :**
- Identité et contact du gérant (nom, adresse e-mail) ;
- Informations sur le commerce (nom, fiche Google, couleur de marque, logo) ;
- Données de facturation gérées par notre prestataire de paiement Dodo Payments ;
- Statistiques d'usage du Service (scans, clics, retours).

**Données des clients finaux (visiteurs du QR code) :**
- Coordonnées laissées volontairement et avec consentement explicite (nom, téléphone, e-mail) en vue de recevoir des offres du commerce ;
- Retours privés éventuellement laissés (message, note).

## 4. Finalités et base légale

- **Fourniture du Service** (exécution du contrat) : gestion du compte, du QR code, des statistiques.
- **Facturation** (obligation légale / exécution du contrat).
- **Constitution d'une base de contacts** (consentement du client final) : les coordonnées ne sont enregistrées qu'après acceptation explicite, et destinées au seul commerce.
- **Envoi de messages commerciaux (SMS / e-mail) par le commerce** à ses contacts, lorsque l'option est activée : ce traitement repose sur le **consentement préalable** du client final recueilli lors de la collecte. Chaque message indique l'identité de l'expéditeur et un moyen simple de se désinscrire (« STOP » par SMS, lien de désinscription par e-mail). Le commerce est responsable de la licéité de ses envois.
- **Amélioration du Service et mesure d'audience** (intérêt légitime), au moyen d'outils d'analyse.

## 5. Destinataires et sous-traitants ultérieurs

Nous faisons appel à des prestataires techniques agissant pour notre compte :
- **Hébergement applicatif** : Vercel Inc. ;
- **Base de données** : Neon ;
- **Paiement** : Dodo Payments (marchand de référence) ;
- **E-mails transactionnels** : Resend ;
- **Mesure d'audience** : PostHog.

Certains de ces prestataires peuvent héberger des données hors de Polynésie française ; les transferts sont encadrés par les garanties appropriées. Aucune donnée n'est vendue à des tiers.

## 6. Durée de conservation

Les données de compte sont conservées pendant la durée de l'abonnement, puis supprimées ou anonymisées dans un délai raisonnable après résiliation. Les données de facturation sont conservées conformément aux obligations légales. Un contact peut être supprimé à tout moment par le commerce depuis son espace ; à la fin du contrat, les données des clients finaux sont supprimées ou restituées au Client responsable de traitement.

## 7. Vos droits

Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité de vos données, exerçables en écrivant à ${SiteConfig.legal.email}.

Un client final souhaitant faire valoir ses droits sur des coordonnées laissées auprès d'un commerce s'adresse en priorité à ce commerce (responsable de traitement) ; l'Éditeur relaie la demande le cas échéant.

## 8. Cookies et traceurs

Le Service utilise des cookies strictement nécessaires à son fonctionnement (authentification) ainsi que, sous réserve de votre consentement, des cookies de mesure d'audience. Vous pouvez configurer votre navigateur pour les refuser.

## 9. Sécurité

Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour protéger les données. Les mots de passe sont stockés sous forme chiffrée et les données complètes de carte bancaire ne transitent jamais par nos serveurs.

---

_Pour toute question relative à vos données : ${SiteConfig.legal.email}._
`;

export const metadata: Metadata = {
  title: `${SiteConfig.title} — Politique de confidentialité`,
  description:
    "Comment ScanNShine collecte, utilise et protège vos données personnelles.",
};

export default function Page() {
  return (
    <div>
      <div className="bg-card flex w-full items-center justify-center p-8 lg:p-12">
        <Typography variant="h1">Politique de confidentialité</Typography>
      </div>
      <Layout>
        <LayoutContent className="typography m-auto mb-8">
          <MDXRemote source={markdown} />
        </LayoutContent>
      </Layout>
    </div>
  );
}
