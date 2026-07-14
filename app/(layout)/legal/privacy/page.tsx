import { Typography } from "@/components/nowts/typography";
import { Layout, LayoutContent } from "@/features/page/layout";
import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote-client/rsc";

// ⚠️ Modèle de politique de confidentialité à faire relire par un juriste.
// Les mentions entre crochets […] doivent être complétées avec les
// informations réelles (responsable de traitement, hébergeur, DPO éventuel).
const markdown = `_Dernière mise à jour : 14 juillet 2026_

## 1. Responsable du traitement

Le responsable du traitement des données collectées via **${SiteConfig.title}** (${SiteConfig.prodUrl}) est **[Raison sociale de l'éditeur]**, ${SiteConfig.company.address}.

Contact : ${SiteConfig.supportEmail}

## 2. Données que nous collectons

**Pour les commerces clients :**
- Identité et contact du gérant (nom, adresse e-mail) ;
- Informations sur le commerce (nom, fiche Google, couleur de marque, logo) ;
- Données de facturation gérées par notre prestataire de paiement Dodo Payments ;
- Statistiques d'usage du Service (scans, clics, retours).

**Pour les clients finaux des commerces (visiteurs du QR code) :**
- Coordonnées laissées volontairement et avec consentement explicite (nom, téléphone, e-mail) en vue de recevoir des offres du commerce ;
- Retours privés éventuellement laissés (message, note).

Ces données sont collectées **pour le compte du commerce**, qui en est le destinataire.

## 3. Finalités et base légale

- **Fourniture du Service** (exécution du contrat) : gestion du compte, du QR code, des statistiques.
- **Facturation** (obligation légale / exécution du contrat).
- **Constitution d'une base de contacts** (consentement du visiteur) : les coordonnées ne sont enregistrées qu'après acceptation explicite.
- **Amélioration du Service et mesure d'audience** (intérêt légitime), au moyen d'outils d'analyse.

## 4. Destinataires et sous-traitants

Nous faisons appel à des sous-traitants techniques agissant pour notre compte :
- **Hébergement et infrastructure** : [Vercel / Neon — à préciser] ;
- **Paiement** : Dodo Payments (Merchant of Record) ;
- **Envoi d'e-mails transactionnels** : Resend ;
- **Mesure d'audience** : [PostHog / Meta — à préciser].

Aucune donnée n'est vendue à des tiers.

## 5. Durée de conservation

Les données de compte sont conservées pendant la durée de l'abonnement, puis archivées ou supprimées dans un délai raisonnable après résiliation. Les données de facturation sont conservées conformément aux obligations légales. Un contact peut être supprimé à tout moment par le commerce depuis son espace.

## 6. Vos droits

Conformément à la réglementation applicable en matière de protection des données, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité de vos données. Vous pouvez les exercer en écrivant à ${SiteConfig.supportEmail}.

Un client final souhaitant faire valoir ses droits sur des coordonnées laissées auprès d'un commerce peut s'adresser directement à ce commerce, responsable de ces données, ou nous contacter qui transmettrons.

## 7. Cookies et traceurs

Le Service utilise des cookies strictement nécessaires à son fonctionnement (authentification) ainsi que, sous réserve de votre consentement, des cookies de mesure d'audience. Vous pouvez configurer votre navigateur pour les refuser.

## 8. Sécurité

Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour protéger les données. Les mots de passe sont stockés sous forme chiffrée et les données de carte bancaire ne transitent jamais par nos serveurs.

---

_Pour toute question relative à vos données : ${SiteConfig.supportEmail}._
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
