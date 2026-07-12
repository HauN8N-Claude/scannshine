---
project_id: avis-google
created: 2026-07-12
status: complete
stepsCompleted: [0, 1, 3, 4, 5]
---

# Technical Architecture: ScanNShine

## Architecture Overview

**Philosophie** : NOW.TS comme fondation, on ne construit QUE ce qui est unique à ScanNShine. Une seule vraie déviation du boilerplate : **Dodo Payments remplace Stripe** (Stripe n'accepte pas les marchands de Polynésie française ; Dodo les accepte officiellement, entrée #59 de leur liste).

**Tech Stack Summary** :
- **Framework** : Next.js 16 (App Router, Server Components, Server Actions) — via NOW.TS
- **Déploiement** : Vercel
- **Database** : Neon PostgreSQL + Prisma
- **Auth** : Better-Auth email + mot de passe (pré-configuré NOW.TS)
- **Paiements** : Dodo Payments (Merchant of Record) — intégration custom, remplace le module Stripe de NOW.TS
- **Email** : Resend + React Email (pré-configuré NOW.TS)
- **Analytics** : PostHog (pré-configuré NOW.TS)

## Ce que NOW.TS fournit déjà vs ce qu'on construit

| Feature PRD | NOW.TS | Travail restant |
|---|---|---|
| Auth (signup/login/reset) | ✅ Built-in | Configurer email+password, désactiver OAuth |
| Emails transactionnels | ✅ Built-in | Créer les templates (feedback négatif, fin d'essai) |
| Admin dashboard | ✅ Built-in | Rien (suivi des comptes clients) |
| Landing page | ✅ Structure | Copy + branding ScanNShine |
| **Paiements/abonnement** | ⚠️ Stripe fourni | **Remplacer par Dodo Payments** (checkout, webhooks, portail client) |
| **Funnel QR → page → routage** | ❌ | À construire (le cœur du produit) |
| **Dashboard stats scans/clics** | ❌ | À construire |
| **CRM contacts + export CSV** | ❌ | À construire |
| Organisations/multi-tenant | ✅ Built-in | **Non utilisé** au MVP (mono-établissement) — ne pas activer |

## Backend Architecture

### Intégration Dodo Payments (la pièce custom principale)

- **SDK** : `dodopayments` (Node) + adaptateur Next.js officiel (`@dodopayments/nextjs`) pour checkout et webhooks
- **Flux** : onboarding terminé → création d'une subscription Dodo avec **trial 7 jours** (natif chez Dodo) → webhook `subscription.active` / `subscription.renewed` / `subscription.cancelled` / `payment.failed` → mise à jour du statut du compte en DB
- **Gating** : middleware/layout du dashboard vérifie `business.subscriptionStatus ∈ {trialing, active}` ; sinon écran « réactiver l'abonnement ». **La page publique `/r/{slug}` reste toujours servie** (on coupe le dashboard, pas le funnel, pendant un délai de grâce de 7 jours — un QR mort en caisse détruirait la confiance)
- **Devise** : affichage marketing en **XPF**, facturation en **EUR (33,50 €)** — le XPF est arrimé à l'euro (1 € = 119,33 XPF), zéro risque de change. ⚠️ Vérifier à l'implémentation si Dodo supporte l'affichage XPF ; sinon mention « 3 990 XPF ≈ 33,50 € débités en euros » au checkout
- **Conséquence trial** : le trial Dodo natif demande la CB au checkout → conversion automatique à J+7. Assumé (meilleure conversion, moins de code qu'un trial sans CB)

### Le funnel public `/r/{slug}` (cœur du produit)

- Route publique Server Component, **aucune auth**, optimisée mobile 3G (les îles) : zéro JS lourd, images optimisées
- `GET /r/{slug}` → log `ScanEvent` (déduplication naïve par IP+UA hashés sur 1h pour ne pas compter les double-scans) → page brandée (logo, couleur, nom)
- Choix satisfaction → satisfait : log `click_google` + redirect `https://search.google.com/local/writereview?placeid={placeId}` ; insatisfait : formulaire privé → `Feedback` en DB + email au gérant via Resend. **Le lien Google reste visible dans les deux branches** (conformité UGC Google)
- Capture contact optionnelle (consentement explicite RGPD) → `Contact`

### QR code & PDF

- **Génération QR** : lib `qrcode` (SVG) pointant vers `https://{domaine}/r/{slug}` — généré à la volée, pas stocké
- **PDF imprimable** : `@react-pdf/renderer` côté serveur — gabarits chevalet A5 + autocollant 10×10 aux couleurs du commerce
- **QR de poche** : simple page `/dashboard/qr` plein écran (le QR en grand + luminosité max suggérée), ajoutable à l'écran d'accueil du smartphone

### Place ID (décision : collage de lien Maps)

- Le gérant colle le lien de partage de sa fiche Google Maps → résolution serveur (suivre la redirection maps.app.goo.gl, extraire le Place ID / CID de l'URL finale) → validation en affichant le nom détecté
- Fallback : mini-guide illustré « où trouver votre lien » + saisie manuelle du Place ID
- Zéro clé API Google, zéro compte de facturation Google au MVP

### Schéma Prisma (modèles custom, en plus des modèles NOW.TS User/Session)

```prisma
model Business {
  id                 String   @id @default(cuid())
  userId             String   @unique
  user               User     @relation(fields: [userId], references: [id])
  name               String
  slug               String   @unique // → /r/{slug}
  logoUrl            String?
  brandColor         String   @default("#0ea5e9")
  googlePlaceId      String?
  googleMapsUrl      String?
  // Abonnement Dodo
  dodoCustomerId       String?
  dodoSubscriptionId   String?
  subscriptionStatus   SubStatus @default(ONBOARDING) // ONBOARDING | TRIALING | ACTIVE | PAST_DUE | CANCELLED
  trialEndsAt          DateTime?
  createdAt          DateTime @default(now())
  scanEvents  ScanEvent[]
  feedbacks   Feedback[]
  contacts    Contact[]
}

model ScanEvent {
  id         String   @id @default(cuid())
  businessId String
  business   Business @relation(fields: [businessId], references: [id])
  type       ScanType // SCAN | CLICK_GOOGLE | FEEDBACK_PRIVATE
  visitorHash String? // sha256(ip+ua) pour dédup 1h
  createdAt  DateTime @default(now())
  @@index([businessId, createdAt])
}

model Feedback {
  id         String   @id @default(cuid())
  businessId String
  business   Business @relation(fields: [businessId], references: [id])
  message    String
  rating     Int?     // ressenti déclaré 1-5, jamais utilisé pour filtrer l'accès Google
  contactName  String?
  contactPhone String?
  contactEmail String?
  isRead     Boolean  @default(false)
  createdAt  DateTime @default(now())
}

model Contact {
  id         String   @id @default(cuid())
  businessId String
  business   Business @relation(fields: [businessId], references: [id])
  name       String?
  phone      String?  // format +689
  email      String?
  consentAt  DateTime // horodatage du consentement (RGPD/CNIL, applicable en PF)
  source     String   @default("collect_page")
  createdAt  DateTime @default(now())
  @@unique([businessId, phone])
}
```

### Stats dashboard

- Agrégations Prisma `groupBy` sur `ScanEvent` (scans, clics Google, feedbacks par jour/semaine) — volumétrie faible (< 10k events/mois au début), **pas de cache ni de Redis nécessaire**
- Graphique : Recharts (déjà dans l'écosystème shadcn/ui)

## Frontend Architecture

| Outil | Usage | Pourquoi |
|---|---|---|
| Tailwind + shadcn/ui | UI dashboard + landing | Fourni par NOW.TS |
| React Hook Form + Zod | Onboarding, formulaire feedback | Standard NOW.TS |
| next-safe-action | Mutations (onboarding, CRM, settings) | Standard NOW.TS |
| nuqs | Filtres période du dashboard | URL state simple |
| Recharts | Courbes scans/avis | Léger, intégré shadcn |

**Page publique `/r/{slug}`** : Server Component pur + un îlot client minimal (boutons satisfaction + formulaire). Cible < 50 kB JS — le client final est sur mobile, parfois en 3G dans les îles.

## Décisions d'architecture (ADR)

### ADR-001 : Dodo Payments au lieu du Stripe de NOW.TS
- **Contexte** : Stripe n'accepte pas les marchands basés en Polynésie française ; le module paiement de NOW.TS est inutilisable tel quel
- **Décision** : Dodo Payments en Merchant of Record (marchands PF officiellement supportés, KYC local accepté), SDK + adaptateur Next.js officiel
- **Alternatives** : Paddle (PF non confirmé), virement/OSB local (tue le self-service), Lemon Squeezy (restrictions similaires)
- **Conséquences** : on réécrit checkout + webhooks + gating d'abonnement (~1 jour) ; en échange Dodo gère TVA/conformité/chargebacks. Le code Stripe de NOW.TS sert de gabarit structurel

### ADR-002 : Facturation EUR, affichage XPF
- Le XPF est arrimé à l'euro → facturer 33,50 € = 3 998 XPF constants, zéro risque de change ; affichage local en XPF pour la confiance

### ADR-003 : Place ID par collage de lien Maps
- Zéro API payante, zéro clé Google ; UX acceptable avec un guide illustré ; l'API Places pourra remplacer plus tard sans toucher au schéma

### ADR-004 : Pas d'Upstash / pas de background jobs au MVP
- Les relances d'essai sont gérées nativement par Dodo (trial → charge automatique). Le seul cron utile (digest hebdo « votre semaine en avis ») est post-MVP → Vercel Cron suffira à ce moment-là

### ADR-005 : Vercel Blob pour le logo
- Un seul fichier uploadé par client (logo). Vercel Blob : API triviale, 500 MB gratuits, intégré Vercel

### ADR-006 : Multi-tenant NOW.TS désactivé
- Mono-établissement par design MVP : 1 User = 1 Business. Les organisations NOW.TS restent dormantes pour un futur multi-établissements

## Folder Structure (delta sur NOW.TS)

```
app/
├── r/[slug]/                 # 🆕 Funnel public (scan → collecte → routage)
│   ├── page.tsx
│   ├── feedback/             # Formulaire privé insatisfait
│   └── actions.ts            # log events, submit feedback, save contact
├── (dashboard)/
│   ├── dashboard/            # 🆕 Stats scans/clics/feedbacks
│   ├── qr/                   # 🆕 QR plein écran + téléchargement PDF
│   ├── crm/                  # 🆕 Table contacts + export CSV
│   ├── feedbacks/            # 🆕 Feedbacks privés reçus
│   └── settings/             # Branding, abonnement (portail Dodo)
├── onboarding/               # 🆕 3 écrans : commerce → lien Maps → QR
└── api/
    ├── webhooks/dodo/        # 🆕 Webhooks Dodo Payments
    └── pdf/[slug]/           # 🆕 Génération PDF chevalet/autocollant
src/lib/
├── dodo.ts                   # 🆕 Client Dodo Payments
├── place-id.ts               # 🆕 Résolution lien Maps → Place ID
└── qr.ts                     # 🆕 Génération QR SVG
emails/
├── feedback-received.tsx     # 🆕 « Un client a laissé un retour privé »
└── trial-ending.tsx          # 🆕 Rappel J-2 fin d'essai (si non couvert par Dodo)
```

## Coûts

| Service | Coût | Notes |
|---|---|---|
| NOW.TS | ~200 € one-time | Licence à vie |
| Vercel | 0 $ (hobby) → 20 $/mois | Passer Pro au lancement des ads |
| Neon | 0 $ | Free tier largement suffisant < 500 clients |
| Resend | 0 $ | 3 000 emails/mois gratuits |
| Dodo Payments | ~4 % + frais/txn | Modèle MoR — pas d'abonnement fixe |
| Vercel Blob | 0 $ | 500 MB gratuits |
| Domaine | ~15 €/an | scannshine.com / .pf |
| **Total lancement** | **~200 € + ~0 €/mois** | Marge brute ≈ 96 % sur 3 990 XPF |

À 100 clients payants : ~400 000 XPF/mois de MRR pour ~20-40 $/mois d'infra + ~4 % Dodo.

## Ordre d'implémentation (1 semaine full-time)

| Jour | Livrable |
|---|---|
| **J1** | Clone NOW.TS, env, Neon, auth configurée, modèles Prisma migrés, purge du code Stripe |
| **J2** | Funnel public `/r/{slug}` complet : page brandée, routage satisfait/insatisfait, log events, email feedback |
| **J3** | Onboarding 3 écrans (commerce + logo Blob, résolution lien Maps → Place ID, QR généré) |
| **J4** | Intégration Dodo : checkout trial 7j, webhooks, gating abonnement, page settings/billing |
| **J5** | Dashboard stats + page QR plein écran + PDF chevalet/autocollant |
| **J6** | CRM : capture contact sur le funnel, table + export CSV. Landing page + pricing |
| **J7** | Tests bout en bout (signup → paiement test → scan → avis), polish mobile, deploy prod, PostHog |

**Variable d'ajustement** (si retard) : le CRM (J6 matin) glisse à J+9 ; la landing peut démarrer en une seule section hero + CTA.

## Risques techniques identifiés

1. **Résolution du lien Maps → Place ID** : les formats d'URL Google varient (maps.app.goo.gl, g.co, liens longs). Prévoir 2-3 h de robustesse + fallback saisie manuelle guidée. *Premier truc à prototyper à J3.*
2. **Webhooks Dodo** : bien vérifier la signature et gérer l'idempotence (retries Dodo) — calquer la structure du handler Stripe de NOW.TS.
3. **Affichage XPF chez Dodo** : à vérifier jour 4 ; fallback = mention explicite au checkout.
4. **Anti-abus funnel public** : rate-limit léger sur le formulaire feedback (in-memory ou header-based) — pas de Redis au MVP.
