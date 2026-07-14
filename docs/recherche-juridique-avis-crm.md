# Recherche juridique — récolte d'avis + CRM/SMS/email (base des CGV)

> Recherche réalisée le 2026-07-14 pour cadrer la rédaction des CGV, de la politique de
> confidentialité et de l'accord de sous-traitance (DPA). Couvre les **deux temps** du produit :
> la récolte d'avis Google aujourd'hui, et l'upsell CRM + marketing SMS/email demain.
> Les données de collecte doivent être posées correctement DÈS MAINTENANT pour être
> réutilisables au lancement de l'upsell sans re-consentement.

---

## 1. Le RGPD s'applique PLEINEMENT en Polynésie française

- Depuis le **1er juin 2019** (ordonnance n° 2018-1125 du 12/12/2018), la Polynésie française
  est soumise à la loi « Informatique et Libertés », qui renvoie au RGPD. En pratique : **mêmes
  obligations qu'en métropole**.
- Conséquence : pas d'ambiguïté « on est loin, ça ne s'applique pas ». Toute la conformité RGPD
  (base légale, consentement, droits des personnes, sécurité, sous-traitance) est due.
- Nuance : plus d'obligation de formalités préalables auprès de la CNIL (logique de conformité
  continue). La CNIL reste l'autorité compétente.
- **Sanctions réelles** pour DPA absent/incomplet : SLIMPAY 180 000 €, Dedalus 1,5 M€ — c'est un
  manquement autonome, sanctionnable même sans incident.

Sources : [CNIL — outre-mer](https://www.cnil.fr/fr/loi-informatique-et-libertes-et-rgpd-ce-qui-change-pour-loutre-mer) ·
[DSI Polynésie](https://www.service-public.pf/dsi/protection-des-donnees-rgpd/) ·
[CPME PF](https://www.cpmepf.com/rgpd-le-reglement-general-de-la-protection-des-donnees-applicables-en-polynesie-a-partir-du-1er-juin-2019/)

---

## 2. Rôles RGPD : ScanNShine = SOUS-TRAITANT, le gérant = RESPONSABLE

C'est **la décision structurante** de tout l'édifice contractuel.

- Le **gérant client** est **responsable de traitement** des données de SES clients (contacts
  captés par le QR, retours privés). C'est lui qui décide de la finalité (récolter des avis,
  faire du marketing).
- **ScanNShine** est **sous-traitant** (art. 28 RGPD) : il traite ces données *pour le compte*
  du gérant, sur ses instructions.
- → Obligation d'un **DPA (Data Processing Agreement)** entre ScanNShine et chaque client. Il peut
  être **annexé aux CGV** (le plus simple pour un self-service TPE) plutôt que signé séparément.
- Le DPA doit préciser : objet/durée/nature/finalité du traitement, types de données, catégories
  de personnes, mesures de sécurité, recours aux **sous-traitants ultérieurs**, assistance aux
  droits des personnes, restitution/suppression en fin de contrat, gestion des violations.

### Sous-traitants ultérieurs à lister et faire autoriser dans le DPA
Neon (base de données), Upstash (Redis), Vercel (hébergement + Blob logos), Resend (emails),
Dodo Payments (paiement — lui est responsable distinct côté paiement), et **le futur fournisseur
SMS** (à choisir pour l'upsell). Chaque changement de sous-traitant doit être notifiable au client.

Sources : [Leto — RGPD & SaaS](https://www.leto.legal/guides/rgpd-et-saas) ·
[Article 28 — modèle DPA](https://www.donneespersonnelles.fr/article-28-rgpd) ·
[DPO Partage](https://www.dpo-partage.fr/rgpd-saas-obligations-editeurs-logiciels-cloud/)

---

## 3. Deux niveaux de relation à ne pas mélanger dans les CGV

| Relation | Nature | Règles |
|---|---|---|
| ScanNShine ↔ gérant (l'abonné) | **B2B** | CGV d'abonnement SaaS, prix, essai, résiliation, responsabilités |
| gérant ↔ ses clients (les scanneurs) | **B2C** | Consentement consommateur, droits RGPD, règles de prospection |

Les CGV encadrent la 1re relation mais doivent **imposer au gérant** des engagements sur la 2e
(il garantit avoir le droit d'utiliser les données de ses clients, le consentement marketing, etc.).

---

## 4. Avis en ligne — cadre légal + politique Google (cœur du produit)

### a) Loi française (art. L111-7-2 Code de la consommation)
Toute personne dont l'activité consiste à **collecter, modérer ou diffuser des avis** de
consommateurs doit une information **loyale, claire et transparente** : préciser s'il y a un
contrôle des avis et lequel, afficher la date, indiquer les motifs de rejet d'un avis.
→ ScanNShine dirige vers Google (c'est Google la plateforme d'avis), mais **capte des retours
privés**. Position à tenir : transparence totale sur le fonctionnement, pas de tri des avis publics.

Sources : [Légifrance L111-7-2](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049571119) ·
[Loi République numérique](https://www.plus-que-pro-solution.fr/loi-republique-numerique-renforce-controle-avis-clients/)

### b) Politique Google (durcie et ACTIVEMENT appliquée en 2026)
- **« Review gating » = INTERDIT** : filtrer/pré-trier les clients par sentiment avant d'envoyer
  le lien d'avis (par sentiment attendu, montant de la transaction, reco d'un employé) viole la
  politique et est désormais **activement sanctionné** (292 M d'avis supprimés en 2025).
- **Récompenser un avis = INTERDIT** : offrir remise, cadeau, points de fidélité contre un avis
  (ou pour modifier/supprimer un avis négatif).
- **Décourager les avis négatifs / solliciter sélectivement les positifs = INTERDIT.**

→ **Validation directe du choix produit de ScanNShine** : le lien Google est visible pour TOUS,
jamais de tri. Les CGV doivent (1) affirmer que ScanNShine ne pratique pas le review gating, et
(2) **interdire au client** d'inciter/récompenser les avis ou de détourner l'outil — sinon
ScanNShine devient complice d'une violation qui peut faire fermer la fiche du client.

Sources : [Google — Prohibited content (UGC)](https://support.google.com/contributionpolicy/answer/7400114?hl=en) ·
[Review gating expliqué](https://www.seologist.com/knowledge-sharing/what-is-review-gating-and-why-does-it-violate-googles-review-policies/) ·
[MàJ politique 2026](https://launchcodex.com/blog/seo-geo-ai/google-business-profile-review-policy-update/)

---

## 5. Marketing SMS/email (upsell) — poser le consentement DÈS MAINTENANT

Le point le plus important pour l'avenir : **la façon dont on capte le contact aujourd'hui
(page `/club`) détermine si on pourra faire du marketing demain.**

- **Principe opt-in (B2C)** : avant tout SMS/email commercial à un particulier, il faut son
  **consentement préalable, libre, spécifique, éclairé et univoque** — action positive (case à
  cocher NON pré-cochée), non noyée dans un consentement global.
- **Spécifique = par finalité** : un consentement « pour recevoir des infos du commerce » ne
  couvre pas tout. Le libellé de capture doit mentionner explicitement **la prospection commerciale
  par SMS et/ou email** pour être réutilisable par l'upsell. Sinon → re-consentement obligatoire.
- **Chaque message doit contenir** : l'identité de l'expéditeur (le commerce) + un moyen simple de
  se désinscrire (**« STOP » pour le SMS**, lien de désinscription pour l'email).
- **Rôles** : le gérant est responsable du consentement et de l'expéditeur ; ScanNShine fournit
  l'outil et doit **techniquement garantir** l'opt-out (gestion du STOP, lien de désinscription,
  suppression des contacts désinscrits).
- **Nouveauté 2026** : démarchage téléphonique interdit sans consentement explicite dès le
  11/08/2026 (concerne la voix, pas le SMS/email — à garder en tête si un jour appels).

### Conséquences concrètes à implémenter (au-delà des CGV)
1. La page `/club` (capture de contact) doit inclure une **case de consentement dédiée** au
   marketing SMS/email, non pré-cochée, avec un libellé explicite + date/preuve de consentement
   stockée (le modèle `Contact` a déjà `consentAt` — vérifier que le libellé couvre le marketing).
2. Prévoir dès le modèle de données : statut de désinscription par canal, horodatage, source.
3. Les CGV/DPA doivent déjà **mentionner la finalité marketing** comme traitement possible.

Sources : [CNIL — communications électroniques](https://www.cnil.fr/fr/communication-electronique-quelles-regles) ·
[CNIL — prospection courrier/SMS/MMS](https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique-sms-mms-et-automate-dappel) ·
[Leto — règles 2026](https://www.leto.legal/news/cnil-communications-electroniques-prospection-regles-2026)

---

## 6. Ce que les CGV doivent contenir (plan retenu)

1. Objet, définitions (Éditeur, Client, Utilisateur final, Service, Abonnement)
2. Description du service (récolte d'avis via QR, retours privés, statistiques ; option CRM+SMS)
3. Inscription, compte, essai gratuit 7 jours
4. Prix (3 990 XPF ≈ 33,50 €, facturation en EUR via Dodo), option 2 990 XPF, révision de prix
5. Paiement — **Dodo Payments = marchand de référence** (merchant of record), facturation, TVA
6. Durée, résiliation, remboursement, conséquences (grâce funnel, suppression)
7. **Engagements du Client** : conformité Google (pas de review gating/incitation), légitimité des
   données de ses clients, obtention du consentement marketing, exactitude de sa fiche Google
8. Obligations/responsabilité de l'Éditeur, disponibilité, limitation de responsabilité
9. Propriété intellectuelle, données du client lui appartiennent
10. **Protection des données** → renvoi Politique de confidentialité + **DPA en annexe** (art. 28)
11. Droit applicable (droit français, applicable en PF), litiges, médiation conso
12. Annexe DPA : finalités, données, sous-traitants ultérieurs, sécurité, durée, sort des données

Documents à produire (3) : **CGV**, **Politique de confidentialité**, **DPA (annexe CGV)**.
Les pages `/legal/terms` et `/legal/privacy` existent (contenu boilerplate EN à remplacer).

---

## ⚠️ Limite

Ces documents seront rédigés pour être **solides et conformes**, mais l'Éditeur reste responsable
juridiquement : une **relecture par un juriste/avocat** (idéalement connaissant le droit
applicable en PF) est recommandée avant mise en production, surtout sur le volet fiscal (TVA,
marchand de référence Dodo) et la médiation de la consommation.
