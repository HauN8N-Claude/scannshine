---
project_id: avis-google
created: 2026-07-12
status: complete
stepsCompleted: [0, 1, 3, 4]
---

# Product Requirements Document: ScanNShine

## Product Vision

**Problem Statement**
Les TPE de Polynésie française (snacks, salons, garages, pensions, activités touristiques...) savent que leur visibilité sur Google Maps conditionne leur chiffre d'affaires — surtout auprès des touristes — mais n'obtiennent quasiment aucun avis : les clients satisfaits partent sans rien écrire, seuls les mécontents postent. Aucun outil existant n'est self-service, en français, à prix TPE, avec un paiement qui fonctionne au fenua.

**Solution**
ScanNShine transforme un QR code permanent (PDF imprimé en caisse ou affiché depuis le smartphone du gérant) en machine à avis : le client scanne, arrive sur une page de collecte aux couleurs du commerce, et est routé — satisfait vers la fiche Google Business, insatisfait vers un formulaire privé transmis au gérant (l'accès à Google restant toujours visible : conformité UGC Google, pas de review gating). Le gérant pilote tout depuis un dashboard, en abonnement self-service à 3 990 XPF/mois avec 7 jours d'essai.

**Success Criteria**
- **Métrique primaire — Conversions payantes** : essais démarrés → abonnements payés via Dodo → Cible : 10 clients payants dans les 30 jours post-lancement
- Taux de conversion essai → payant → Cible : ≥ 25 %
- Avis Google générés par client actif → Cible : ≥ 5 avis/mois (preuve de valeur, alimente la rétention)

## Target Users

### Persona primaire : « Le/la gérant(e) du fenua »

- **Rôle** : Patron ET opérationnel d'une TPE polynésienne (snack, roulotte, salon, garage, artisan, pension, activité touristique, cabinet de santé)
- **Pain Points** :
  - Fiche Google à 12 avis / 3,8★ face à un concurrent à 200 avis
  - Demander un avis oralement est gênant et ne marche jamais (le client oublie en 10 min)
  - Aucun outil adapté : NiceJob/Podium sont en anglais, chers, et le paiement ne passe pas depuis la Polynésie
- **Motivations** : Plus de clients via Google Maps, capter les touristes qui choisissent exclusivement via Maps
- **Goals** : Un système qui tourne tout seul, mesurable, sans rien configurer
- **Current Solution** : Rien (majorité), demande orale, QR gratuit bricolé sans tracking, sollicitation WhatsApp manuelle
- **Switching Cost** : Quasi nul — le vrai concurrent est l'inaction. La barrière est la confiance (paiement en ligne, promesse de résultat)

## Core Features (MVP)

### Must-Have Features

#### 1. Le Funnel d'avis ⭐ (Core)
**Description** : QR code permanent généré à l'inscription → page de collecte publique brandée (logo, nom, couleur du commerce) → le client indique sa satisfaction → satisfait : redirection vers la fiche Google Business ; insatisfait : formulaire privé envoyé au gérant par email. Les deux chemins laissent le lien Google visible (conformité politique UGC Google).
**User Value** : Canal permanent, passif et sans gêne pour transformer les clients contents en avis Google, tout en captant le mécontentement avant qu'il ne devienne public.
**Success Metric** : Taux scan → clic Google ≥ 40 % ; ≥ 5 avis/mois par client actif.
**Priority** : P0 — Critical

#### 2. Self-service complet : signup → paiement → actif
**Description** : Inscription, essai gratuit 7 jours, abonnement 3 990 XPF/mois via Dodo Payments (Merchant of Record, Polynésie française supportée), activation automatique du compte sans aucune intervention manuelle. Onboarding en 3 écrans : infos commerce (nom, logo, couleur), lien fiche Google (Place ID), QR généré.
**User Value** : Le gérant sans compétence technique est opérationnel en 10 minutes, sans email ni rendez-vous.
**Success Metric** : Conversion essai → payant ≥ 25 % ; onboarding complété en < 10 min.
**Priority** : P0 — Critical

#### 3. Dashboard de pilotage
**Description** : Vue principale : scans/semaine, clics vers Google, feedbacks privés reçus, courbe d'évolution. Accès au QR (téléchargement PDF chevalet/autocollant + affichage plein écran sur smartphone pour les métiers mobiles).
**User Value** : Le gérant VOIT chaque semaine que ça marche — c'est l'argument anti-churn n°1 face au réflexe « une plaque à 30 € suffisait ».
**Success Metric** : ≥ 1 connexion dashboard/semaine par client actif.
**Priority** : P0 — Critical

#### 4. CRM — capture de contacts
**Description** : Sur la page de collecte, champ optionnel nom + mobile/email (avec consentement explicite, RGPD/CNIL applicable en PF). Les contacts s'accumulent dans une table CRM du dashboard, exportable CSV.
**User Value** : Le commerce construit dès le jour 1 un actif client qu'il n'a jamais eu — et qui prépare le SMS marketing (v1.1), la vraie valeur récurrente.
**Success Metric** : ≥ 10 % des scans laissent un contact.
**Priority** : P1 — Important (dernière brique de la semaine ; peut glisser à J+9 sans bloquer le lancement)

### Should-Have Features (Post-MVP)
- **Campagnes SMS marketing (v1.1)** : envoi de promos/relances à la base CRM — *Différé : coût et faisabilité des SMS vers +689 à vérifier (Twilio & co), conformité opt-in, et le funnel doit prouver sa valeur d'abord*
- **Alertes nouveaux avis Google + réponse assistée IA** — *Différé : nécessite l'API Google Business Profile (validation d'accès longue)*
- **Multi-établissements** — *Différé : la cible MVP est mono-établissement par définition*
- **Support physique premium expédié (plaque NFC)** — *Différé : logistique ; upsell one-shot possible plus tard*

## User Flows

### Parcours client final (le cœur du produit)
```
1. Client scanne le QR (chevalet caisse ou smartphone du gérant)
   ↓
2. Page de collecte brandée : « Comment s'est passée votre visite chez {Commerce} ? »
   ↓
3a. 😊 Satisfait → bouton « Laisser un avis Google » → redirection fiche Google Business
3b. 😞 Insatisfait → formulaire privé (message + contact optionnel) → email au gérant
    (le lien Google reste visible dans les deux cas)
   ↓
4. (Optionnel) « Laissez vos coordonnées pour les bons plans de {Commerce} » → CRM
```

### Parcours gérant (signup → actif)
```
1. Landing page → « Essai gratuit 7 jours »
   ↓
2. Signup (email + mot de passe — Better-Auth)
   ↓
3. Onboarding : nom commerce + logo + couleur → lien fiche Google (recherche Place ID) → QR généré
   ↓
4. Checkout Dodo Payments (essai 7 jours, puis 3 990 XPF/mois)
   ↓
5. Dashboard : télécharger le PDF QR / afficher le QR plein écran
```

## Out of Scope (v1)

- ❌ **Envoi de SMS** — *v1.1 ; coût +689 et opt-in à valider*
- ❌ **API Google Business Profile** (lecture des avis, réponses) — *accès long à obtenir ; le MVP fonctionne avec un simple lien d'avis (Place ID)*
- ❌ **Multi-établissements / multi-utilisateurs** — *hors cible MVP*
- ❌ **Application mobile native** — *le web responsive suffit ; le « QR de poche » est une page web plein écran*
- ❌ **NFC / support physique expédié** — *le PDF imprimable couvre le besoin*

## Pages Required

| Page | Purpose | Features |
|------|---------|----------|
| Landing | Convertir les gérants | Hero, démo du funnel, pricing, CTA essai 7j |
| Auth | Signup / Login | Better-Auth email+password |
| Onboarding | Configurer le commerce | Infos commerce, Place ID Google, génération QR |
| Page de collecte (publique) | Le funnel client final | Branding commerce, routage satisfait/insatisfait, capture contact |
| Dashboard | Pilotage | Stats scans/clics/feedbacks, accès QR (PDF + plein écran) |
| CRM | Contacts capturés | Table contacts, export CSV |
| Settings | Compte & billing | Profil, abonnement Dodo (portail), branding |

## Success Metrics

**Primaires (semaines 1-4)** :
- Conversions payantes : 10 clients payants à J+30
- Conversion essai → payant : ≥ 25 %

**Secondaires (mois 2+)** :
- Avis générés par client actif : ≥ 5/mois
- Rétention à 60 jours : ≥ 80 % (le test du risque churn)

## Timeline

- **MVP complet (funnel + paiement Dodo + dashboard + CRM)** : 1 semaine full-time — ⚠️ agressif ; le CRM (P1) est la variable d'ajustement et peut glisser à J+9 sans bloquer le lancement
- **Premiers tests utilisateurs** : J+7 → J+10 (5 gérants en Mom-Test, à recruter dès maintenant)
- **Lancement public (Meta Ads + organique)** : J+14

## Open Questions

- Prix affiché : 3 990 XPF ≈ 33,40 € — trancher l'affichage euro (33 € ou repasser à 4 400 XPF/37 €)
- Dodo Payments facture-t-il en XPF ou faut-il afficher XPF et débiter l'équivalent EUR/USD ? (à vérifier en step architecture)
- Récupération du lien d'avis Google : recherche Place ID intégrée (API Places) ou saisie manuelle guidée par le gérant ?
- Tracking des « avis générés » : sans API Google, on mesure les clics vers Google, pas les avis publiés — quelle proxy afficher au gérant ?
