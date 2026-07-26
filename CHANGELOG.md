# Changelog

## 2026-07-24
FIX: Sync Google Sheets /commander — ne plus logger une fausse erreur « GSheet lead sync failed (redirected) » à chaque succès : Apps Script renvoie toujours un 302 vers son URL echo (le corps est déjà consommé par doPost, la ligne est écrite), donc l'échec ne se juge que sur response.ok
REFACTOR: Section « 12 avis / 200 » (pain) refondue — couleurs harmonisées avec la palette bleue de la LP (fin du rouge/vert brut) : profil « sans avis » en neutre/muted, profil « avis récents en nombre » en bleu primary, étoiles dorées + compteur d'avis pour visualiser le contraste quantité/fraîcheur
CHORE: Retrait des liens de navigation template (Docs, Blog, Changelog) de l'en-tête des pages (content-header) — sans rapport avec ScanNShine
FIX: Image plaquette (section produit) — fond figé qui jurait en mode sombre (la LP suit le thème système) ; plaque-nfc.png rendue transparente et cadre retiré (drop-shadow seul) pour qu'elle flotte sur le vrai fond de la LP et s'harmonise en clair comme en sombre
FIX: Build/déploiement Vercel cassé (TS4104) — le tableau FAQ `as const` (readonly) était passé à la prop `faq: Faq[]` mutable de FAQSection ; prop élargie en `readonly Faq[]`, le build repasse au vert
CHORE: Remplacement des placeholders par les visuels finaux de la plaque NFC (public/images/plaque-nfc.png et carte-nfc-3d.png, fond transparent) utilisés dans la section produit de la landing ; fond de plaque-nfc.png recomposé sur le bleu clair de la charte (--accent #E0F2FE) au lieu du beige d'origine, pour harmoniser avec la palette de la LP

## 2026-07-15
FIX: Inscription impossible depuis www.scannshine.com (403 sur /api/auth/sign-up/email, confirmé en prod) — Better Auth ne faisait confiance qu'à l'origine de production (apex). Redirection 308 www -> apex dans next.config.ts (canonicalise aussi le SEO) + trustedOrigins explicites (apex, www, getServerUrl) dans auth.ts
FIX: Build cassé sans clé Dodo — webhookKey utilisait `??` alors qu'une var d'env absente vaut "" (piège documenté dans REPRISE.md) ; `||` rétablit le fallback PLACEHOLDER_KEY
CHORE: Test E2E paiement joué en prod (mode test) — signup → onboarding → checkout Dodo 16,90 €/essai 7j → carte 4242 → webhook → « Abonnement actif » : tunnel validé de bout en bout

FIX: Formulaire /club cassé (révélé par la vérif runtime) — ContactCaptureSchema.omit() plantait sur un schéma refined (« .omit() cannot be used on object schemas containing refinements ») → page 400, aucun contact capté ; extraction d'un objet de base + ContactCaptureClientSchema dédié
FIX: RGPD — révoquer le consentement (via « Gérer les cookies ») suspend le pixel Meta immédiatement (fbq consent grant/revoke), sans attendre un rechargement ; curseur pointer sur le bouton du footer
FEATURE: Consentement RGPD affiné — lien « Gérer les cookies » dans le footer (rouvre la bannière via reopen()) + libellé de consentement /club rendu explicite (prospection par SMS et/ou e-mail + mention STOP/désinscription), pour rendre les contacts réutilisables par l'upsell CRM/SMS
FEATURE: Bandeau de consentement cookies (RGPD/CNIL) — store Zustand persisté (localStorage), bannière Refuser/Tout accepter à poids égal + lien politique de confidentialité ; le pixel Meta ne se charge QU'APRÈS acceptation (opt-in préalable), choix mémorisé et révocable
FEATURE: C3 cron de securite — /api/cron/reconcile-subscriptions (Vercel Cron quotidien) reconcilie les etats a risque (essais expires, impayes) avec Dodo (source de verite) en cas de webhook manque ; auth par CRON_SECRET (fail-closed 503/401), ne touche jamais CANCELLED/ONBOARDING, ajout CRON_SECRET a l env + vercel.json
FEATURE: m8 landing — nom du fondateur affiche (Haumoana) dans la signature et l alt de la photo
FEATURE: m7 landing — section avis clients (3 temoignages, 1 benefice distinct chacun : visibilite/acquisition, simplicite, protection e-reputation) avec etoiles et avatars-initiales, montee avant le tarif ; ⚠️ avis PLACEHOLDER a remplacer par de vrais temoignages consentis
CHORE: Baisse du prix de l'abonnement de base 3 990 → 1 990 XPF (≈ 16,90 € facturé en EUR) dans SCANNSHINE_PLAN + landing, FAQ, CGV, billing ; ⚠️ le produit Dodo doit être mis à 16,90 EUR pour correspondre
FEATURE: FAQ landing retravaillee objection-par-objection (efficacite reelle, pas besoin d etre techno, zero travail quotidien, gestion du client mecontent conforme anti-gating, autorise par Google, rentabilite 1990 XPF, resiliation sans engagement, sans site/iles) + benefices persona TPE et poussee a l achat ; CTA de conversion ajoute en fin de section FAQ (essai 7j + contact)
CHORE: reconcilier affichage prix SCANNSHINE_PLAN a 1 990 XPF / 16,68 EUR (supprime la contradiction avec la carte de prix) ; rappel d aligner le produit Dodo

## 2026-07-14

CHORE: Ajout guide docs/guide-dodo-live.md (passage Dodo Payments en live à faire soi-même : produit EUR/mensuel/essai 7j, webhook /api/webhooks/dodo, 4 variables Vercel, tests, dépannage)
FEATURE: CGV/confidentialité — identité réelle PolynetIA (EI, N° Tahiti F95709, Punaauia) via SiteConfig.legal, clause anti-review-gating + engagements Google du Client, rôle éditeur=sous-traitant / client=responsable (art. 28), base légale prospection SMS/e-mail (consentement + STOP) pour l'upsell CRM ; recherche juridique consolidée dans docs/recherche-juridique-avis-crm.md
FEATURE: M5 vues owner — section « À suivre » sur /admin (churn du mois approxime via cancelledAt, inscriptions non finalisees ONBOARDING, commerces inactifs 0 scan/30j, essais qui expirent sous 3j avec contact) + filtre par statut cliquable sur /admin/commerces
FEATURE: d3 pages legales FR — vraies CGV/CGU + politique de confidentialite (RGPD/PF) avec placeholders societe a completer, remplacent le boilerplate anglais; liens legaux ajoutes au footer
FIX: m3 CRM « +X ce mois » calcule en fuseau Tahiti (UTC-10) via helper partage pf-timezone (extrait de get-stats), plus de bascule ~10h trop tot aux bornes de mois
FIX: m5 TrendBadge affiche « nouveau » au lieu de +100% quand la periode precedente est vide
FIX: m6 landing — le CTA d inscription/connexion reste visible en permanence (seuls les liens d ancre s estompent au scroll)
FIX: m1 bouton Connexion — plus de ?callbackUrl= vide au SSR (parametre ajoute seulement si present, encode)
CHORE: d2 emojis hors-funnel remplaces par icones Lucide (CRM Sparkles, billing Check); d6 floating promise set-demo-step; titres FR squelettes admin (loading) + page users

## 2026-07-13

FIX: audit M2-M4 — MRR admin = abonnes payants (ACTIVE) uniquement, essais comptes a part (tuile dediee), prix depuis SCANNSHINE_PLAN; MRR historique ACTIVE-only + note churn; texte lock PAST_DUE corrige (plus de fausse promesse 7j); validation signup (name min 2, confirmation mdp inline via refine, hint 8 caracteres); admin titre FR
FIX: C2 tunnel — carte exigee a l onboarding: ecran 3 lance le checkout Dodo (essai 7j), onboardingStep=4 pose UNIQUEMENT par le webhook a l activation (plus d acces gratuit a vie), gating dashboard = TRIALING/ACTIVE seulement, ecran de confirmation paiement au retour, suppression de completeOnboardingAction
FIX: C1 tunnel — signup/signin/root redirect to /dashboard (was /orgs boilerplate EN dashboard), disable org auto-creation (hook + autoCreateOrganizationOnSignUp) since ScanNShine is mono-establishment, /orgs now redirects to /dashboard, fix callbackUrl=null literal on signup link
FIX: SEO technical pass — rewrite boilerplate sitemap (was announcing codeline.app URLs!) with real scannshine.com pages, add robots.ts (public allowed, app/auth/admin/upsell/demo-posts disallowed), html lang en→fr, OG+Twitter cards with generated 1200x630 og.jpg, canonical on prodUrl, FAQPage JSON-LD on landing
FEATURE: Add feedback/support email (haumoana@polynetia.com in SiteConfig.supportEmail) — landing footer "Donnez-nous votre avis" mailto link for leads + "Support client" mailto link in client dashboard sidebar footer (pre-filled subject with business name)
FEATURE: Add /offre-crm-sms upsell page (AIDA: 30-min countdown + hook, problem cards, CRM+SMS benefits, payment section 2990 XPF/mois, noindex) — CTA points to /billing, Dodo add-on product not wired yet
FEATURE: Add /creer-fiche-google public guide (why + 6 steps to create a GMB fiche, CTAs to Google Business and back to onboarding) + prominent "no GMB fiche?" help block with guide button on onboarding step 2 (StepGoogle)
CHORE: Add prisma/set-demo-password.ts and prisma/set-demo-step.ts dev utilities (demo account credential + onboarding step for previews/e2e)
FEATURE: Add owner admin page /admin/commerces — client list with subscription-validity badges (Abonné/En essai+date/Paiement en retard/Annulé+date/Inscription), owner contact, 30-day scans, summary tiles, search; responsive table (desktop) + cards (mobile); NO reviews-generated metric (belongs to client dashboard); admin nav relabeled to French
FIX: Force billing_currency EUR on Dodo checkout sessions (E2E test revealed default USD conversion — XPF is euro-pegged, no floating FX for PF clients)

FEATURE: Translate auth, account and transactional-email surfaces to French (vouvoiement)
CHORE: Replace founder placeholder with real portrait (was dropped as fondateur.jpg.png — converted to optimized 900px JPG 127KB, object-top crop, Next image cache purged)
FEATURE: Add landing FounderSection (photo + why-I-built-it copy: constat, problème, bénéfices) between pricing and FAQ — public/images/fondateur.jpg is a generated placeholder to replace with the real portrait
FEATURE: Rework "Comment ça marche" into 4-step review-collection method (satisfied client → ask at the right moment → QR scan → review shines on Google fiche) + private-feedback note, anti-gating wording kept
FIX: Mobile-friendly landing pass — hero h1 text-4xl on mobile, PainSection headline demoted to h2 (single h1 per page) and sized text-3xl/4xl, FAQ title responsive + gap when stacked, pain lists text-base on mobile, scroll-mt-20 on #tarif and #comment-ca-marche anchors (fixed header offset)

## 2026-07-12

FEATURE: Add landing ProblemSection — 4 persona pain points as Lucide-icon cards (silent happy clients, better-rated competitor, surprise 1-star, no time/awkward to ask) between Hero and PainSection
REFACTOR: Rework PainSection "Sans ScanNShine" bullets to consequences (avoid duplicating new ProblemSection) and replace emojis with Lucide ThumbsUp/ThumbsDown per ui-ux rule
CHORE: Extend AI prompt library with 9 beauty-salon persona prompts (S1/S2/S3 + branding) in docs/prompts-visuels-ia.md
CHORE: Add 3 beauty-salon persona ad creatives (docs/ads-creatives/salon-\*) — angles A/B/C rewritten for salon owners, 1:1 + 9:16
REFACTOR: Simplify landing footer — remove Product/Company/Legal link columns (dead links to boilerplate pages), keep brand + address + copyright in French
CHORE: Add AI image-generation prompt library (docs/prompts-visuels-ia.md) — 13 optimized ChatGPT prompts for Meta Ads statics, mapped to the 4 ad angles
CHORE: Add 8 Meta Ads static creatives (docs/ads-creatives/) — 4 angles x 2 formats (1:1, 9:16) with real QR code, generated from HTML/CSS
FIX: Adversarial review batch — Dodo webhook: derive TRIALING from payload status (not trial dates) so paid renewals aren't reverted to trial; guard against out-of-order events reactivating a cancelled sub; stop grace-window sliding on CANCELLED retries; require webhook secret in production
FIX: Harden place-id SSRF — re-validate host allowlist on every redirect hop, reject private/loopback/link-local IPs, https-only, drop generic goo.gl/google.com shorteners (+4 tests)
FIX: Escape user-supplied feedback/contact content before markdown email interpolation (prevents phishing/tracking-pixel injection into owner inbox)
FIX: Derive visitor IP from trusted rightmost XFF hop (not spoofable leftmost) + add per-business hourly feedback ceiling (anti email-bombing)
FIX: Bucket dashboard stats in Pacific/Tahiti (UTC-10) instead of server timezone
FIX: Handle slug unique-violation (P2002) with fresh-suffix retry in onboarding (concurrent same-name businesses)
FIX: Treat CANCELLED business with null cancelledAt as expired (funnel no longer served indefinitely)
PERF: Wrap getBusinessBySlug/getBusinessByUserId in React cache() to dedupe per-request queries (metadata+page, layout+page)
CHORE: Validate logoUrl as https URL
FEATURE: Add Meta Pixel (NEXT_PUBLIC_META_PIXEL_ID, optional) — PageView via root layout, CompleteRegistration on signup success, StartTrial on Dodo checkout return (/dashboard?paiement=ok)
CHORE: Add organic content plan (docs/contenu-organique.md) — 4 pillars, 4-week calendar, week-1 scripts, organic-to-paid bridge
CHORE: Add Meta Ads launch kit (docs/meta-ads.md) — campaign structure, budget tiers, 4 ad angles copy, creative briefs, tracking plan
FIX: Trigger notFound() in funnel generateMetadata for cleaner unknown-slug handling (status stays 200 in dev due to PPR streaming — known cosmetic behavior, page is noindex)
CHORE: Runtime smoke-test passed — funnel renders branded content, /go logs CLICK_GOOGLE + 307 to Google review form, 1h scan dedup verified in DB, unauthenticated dashboard shows unauthorized screen without data leak
FEATURE: Transform boilerplate into ScanNShine — Google review QR funnel SaaS for French Polynesian businesses
FEATURE: Add public collect funnel /r/[slug] (branded page, satisfied→Google redirect, unsatisfied→private feedback, UGC-compliant)
FEATURE: Add Business/ScanEvent/FeedbackPrivate/Contact Prisma models with demo seed
FEATURE: Add Google Maps link → Place ID resolver with unit tests and manual fallback
FEATURE: Add 3-step onboarding (business info + logo upload, Google link, QR ready)
FEATURE: Add Dodo Payments integration (checkout session with 7-day trial, webhooks, customer portal) replacing Stripe
FEATURE: Add user-scoped dashboard (KPIs + scans chart, private feedbacks with WhatsApp quick actions, CRM with CSV export, QR page with printable A5/sticker PDFs, settings)
FEATURE: Rewrite landing page in French with ScanNShine copy, single 3990 XPF plan and FAQ
CHORE: Remove Stripe integration (env, auth hook, billing UI, admin MRR, tests, CI secrets)
CHORE: Make REDIS_URL and RESEND_API_KEY optional in dev (in-memory cache / logged emails)
FIX: Bump flaky 500ms form test timeouts to 5s and fix pre-existing actions-utils type errors

## 2026-05-12

CHORE: Upgrade next 16.1.6→16.2.6, resend 6.9.3→6.12.3 and bump all ^-pinned deps (motion, next-safe-action, prisma, zod, recharts, sass, vitest, etc.)
FIX: Remove incompatible formatter/labelFormatter overrides from CustomTooltipProps to resolve recharts 3.8.x type incompatibility
FIX: Replace item.dataKey with computed key string in ChartTooltipContent to fix React key prop type error

## 2026-03-05

CHORE: Upgrade all 58 dependencies to latest versions
FIX: Update better-auth 1.5.x API - rename organizationCreation to organizationHooks, afterCreate to afterCreateOrganization
FIX: Update better-auth 1.5.x API - rename sendChangeEmailVerification to sendChangeEmailConfirmation
FIX: Update better-auth 1.5.x API - rename permission to permissions in hasPermission calls
FIX: Update TanStack Store subscribe return type for proper useEffect cleanup
CHORE: Add @better-auth/prisma-adapter as direct dependency (required by better-auth 1.5.x)
CHORE: Keep ESLint at 9.x (plugins don't support ESLint 10 yet)

## 2026-02-16

FEATURE: Add /api/status route with optional random number query parameter
FEATURE: Add /api/status health check route
FEATURE: Add middleware redirect from /admin/interdit to /home

## 2026-01-24

FEATURE: Add "Dismiss all" button to changelog sidebar stack for dismissing multiple changelogs at once

## 2026-01-22

FEATURE: Add changelog system documentation in content/docs/changelog.mdx
FEATURE: Add add-documentation skill with SKILL.md and reference for creating documentation in content/docs/
FEATURE: Add documentation template and create-doc.sh script (mandatory for creating new docs)

## 2026-01-21

FIX: Free plan users now redirect to Stripe checkout instead of billing portal when upgrading

## 2026-01-19

FEATURE: Add x-org-slug header support for /api/orgs/\* routes in middleware

## 2026-01-18

CHORE: Add Prisma security and performance rules (orgId filtering, select over include, codebase patterns)
FEATURE: Add domain question to init-project workflow for Resend email configuration (with/without domain support)

## 2026-01-13

CHORE: Remove 14 unused files including admin components, docs components, and utility files
CHORE: Remove 5 unused dependencies (@ai-sdk/openai, ai, @types/react-syntax-highlighter, radix-ui, ts-node) saving ~3MB
REFACTOR: Remove duplicated FileMetadata type from avatar-upload.tsx, import from use-file-upload.ts instead
REFACTOR: Replace session-based organization context with URL slug-based routing using middleware headers for multi-tab support
FIX: Update hasPermission to pass explicit organizationId for Better Auth compatibility
REFACTOR: Move legal and docs links from floating footer to minimal sidebar navigation above Settings button with text-xs

## 2026-01-02

REFACTOR: Add cacheLife("max") to docs, changelog, and posts pages for 30-day cache instead of 15-minute default
REFACTOR: Improve mobile nav user button to show avatar + name/email with dropdown instead of just avatar
FEATURE: Add responsive mobile navigation for documentation with sticky header and sheet sidebar
FIX: Fix documentation page horizontal overflow when description text is too long
FEATURE: Add /add-documentation slash command for creating and updating docs in content/docs/
REFACTOR: Add useDebugPanelAction and useDebugPanelInfo hooks for cleaner debug panel registration with automatic cleanup
FIX: Improve changelog dialog responsiveness on mobile with smaller padding and text sizes

## 2025-12-28

REFACTOR: Replace admin back button with breadcrumb navigation (matching org page style)

## 2025-12-27

REFACTOR: Merge billing info into single card with next payment date, amount, and payment method
FEATURE: Add "Create customer" button to auto-create Stripe customer for organizations
FEATURE: Add inline title editing with org avatar on admin organization detail page
FEATURE: Add coupon code support for admin subscription management (enables 100% off plans without payment method)
REFACTOR: Admin user organizations list uses badges for role and plan instead of text with dots
REFACTOR: Admin user organizations list uses proper ItemGroup pattern with separators and unified border
REFACTOR: Modernize admin subscription UI with plan cards, monthly/yearly toggle, and status indicators
REFACTOR: Feedback detail page uses Item component instead of Card for consistent styling
REFACTOR: Post detail page now matches changelog detail style - max-w-2xl layout, aspect-video image, badges with icons, prose content
REFACTOR: Simplify admin charts with Stripe-style design - hero numbers, no grid, cleaner layout
REFACTOR: Use dot style badges for status indicators in admin user sessions and providers tables
FEATURE: Add MRR growth and user growth charts to admin dashboard with Stripe data
REFACTOR: Remove 15 PostCard variants, keep single clean compact design
REFACTOR: Consolidate image upload components into unified ImageDropzone with avatar/square variants
REFACTOR: Unify sidebar trigger button style across all navigation components
REFACTOR: Add size="lg" to all admin dashboard pages for consistent layout width
CHORE: Add v2.1.0 changelog entry and update image paths
REFACTOR: Changelog timeline with vertical line on left, date labels, and compact cards
FEATURE: Add active state highlighting to content header navigation
FIX: Remove pulsing animation from changelog timeline first item
REFACTOR: Modernize changelog UI with docs-style header, footer, and blog post layout
REFACTOR: Changelog detail page now uses aspect-video image, cleaner badges, and prose styling
REFACTOR: Changelog list page uses card-based layout with hover effects and latest badge

## 2025-12-26

FEATURE: Changelog page timeline view with vertical timeline, version badges, and hover effects
CHORE: Add unit tests for changelog-manager and changelog actions
CHORE: Add E2E tests for changelog dialog flow
FIX: InterceptDialog uses router.refresh() after router.back() to reset parallel route slot state
FIX: InterceptDialog only calls router.back() when closing, not on every state change
FEATURE: Add "Reset Changelog" debug action to restore dismissed changelogs
FEATURE: Debug Panel with draggable/resizable UI, session info, and dynamic action buttons (dev only)
FEATURE: Public changelog system with CardStack animation and timeline UI
FEATURE: Changelog CardStack widget in organization sidebar
FEATURE: Intercepting routes for changelog dialog from any page
FEATURE: Claude Code slash command for creating changelog entries
FEATURE: Add reply button with textarea dialog on feedback detail page
FEATURE: Clickable user Item on feedback detail page navigates to user profile
REFACTOR: Replace feedback table with Item components for cleaner UI

## 2025-12-15

FIX: Remove insecure trusted origins wildcard configuration in auth
FIX: Use hard redirects for impersonation to update profile button immediately
FIX: Breadcrumb path selection slice issue
FIX: Typo in prisma:generate script
FIX: ESLint and TypeScript errors across codebase
FIX: Vitest config ESM conversion
FIX: generateStaticParams for posts in production (Next.js 16 compatibility)

FEATURE: Major performance improvements with refactored application architecture
FEATURE: TanStack Form migration replacing React Hook Form across all forms
FEATURE: Redis caching for improved performance
FEATURE: OTP-based password reset flow
FEATURE: Complete OTP sign-in flow implementation
FEATURE: Responsive provider buttons (full width when single provider)
FEATURE: Global PageProps type for standardized page component typing

REFACTOR: Middleware utilities extraction with admin route protection

CHORE: Update Better-Auth to version 1.3.27
CHORE: Update VSCode snippets and workflow configuration
CHORE: Add environment variables guide
CHORE: Improve type safety in chart and tooltip components
CHORE: Remove unused shadcn-prose dependency

## 2025-08-23

FEATURE: GridBackground component for customizable visual design
FEATURE: Admin feedback system with filters, tables, and detailed views
FEATURE: Documentation system with dynamic content and sidebar navigation
FEATURE: Last used provider tracking for enhanced sign-in experience
FEATURE: Contact and about pages

CHORE: Update Next.js to 15.5.0
CHORE: Update React to 19.1.1
CHORE: Update AI SDK to v5
CHORE: Update all Radix UI component packages
CHORE: Update testing dependencies and build tools
CHORE: Claude Code integration with new agents, commands, and formatting hooks
CHORE: Improve API file organization and documentation structure

## 2025-08-13

FEATURE: Complete admin dashboard with sidebar layout and routing
FEATURE: Admin-only authentication guards with role checking
FEATURE: User management interface with search, pagination, and role filtering
FEATURE: User detail pages with session management and impersonation
FEATURE: Organization management interface with member management
FEATURE: Subscription management with plan changes and billing controls
FEATURE: Payment history with Stripe integration for admin oversight
FEATURE: AutomaticPagination reusable component

REFACTOR: Move billing ownership from User to Organization level
REFACTOR: Migrate stripeCustomerId from User model to Organization model
REFACTOR: Update webhook handlers for organization-based billing
REFACTOR: Replace Better-Auth subscription methods with custom server actions
REFACTOR: Billing page with Card components and Typography

FIX: Remove all `any` type usage in Stripe webhook handlers
FIX: Type compatibility issues across billing system
FIX: Card hover effects replaced with clean styling
FIX: Organization/user names now clickable instead of separate View buttons

## 2025-07-14

FEATURE: Playwright workflow migrated to local CI testing with PostgreSQL service
FEATURE: Comprehensive logging throughout all E2E tests

REFACTOR: Migrate Prisma configuration from package.json to prisma.config.ts
REFACTOR: Rename RESEND_EMAIL_FROM to EMAIL_FROM

FIX: Delete account test case sensitivity issue
FIX: Button state validation and error handling in tests
FIX: External API dependency error catching for build
FIX: DATABASE_URL_UNPOOLED configuration for Prisma
FIX: OAuth secrets renamed (GITHUB to OAUTH_GITHUB)

CHORE: Add all required GitHub secrets for CI testing
CHORE: Enhance Playwright reporter configuration for CI visibility

## 2025-06-01

FEATURE: Orgs-list page to view organization list
FEATURE: Adapter system for email and image upload

FIX: API Error "No active organization"

CHORE: Upgrade libraries to latest versions

## 2025-05-03

FEATURE: NOW.TS deployed app tracker
FEATURE: Functional database seed

## 2025-04-17

FEATURE: Resend contact support

REFACTOR: Prisma with output directory
REFACTOR: Replace redirect method
REFACTOR: Update getOrg logic to avoid bugs

FIX: Navigation styles
FIX: Hydration error

CHORE: Upgrade to Next.js 15.3.0

## 2025-04-06

FEATURE: Better-Auth organization plugin
FEATURE: Better-Auth Stripe plugin
FEATURE: Better-Auth permissions
FEATURE: Middleware authentication handling

REFACTOR: Replace AuthJS with Better-Auth
REFACTOR: Upgrade to Tailwind V4
REFACTOR: Layout and pages upgrade

## 2024-09-12

FEATURE: NEXT_PUBLIC_EMAIL_CONTACT env variable
FEATURE: RESEND_EMAIL_FROM env variable

## 2024-09-08

FEATURE: Add slug to organizations
REFACTOR: Update URL with slug instead of id

## 2024-09-01

FEATURE: NOW.TS version 2 with organizations
