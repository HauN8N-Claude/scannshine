# Audit du tunnel ScanNShine — 2026-07-14

> ### État au 2026-07-14 (soir) — corrections déployées en production
> **Traités et vérifiés :** C1, C2 (modèle « carte exigée »), M2, M3, M4, M5,
> m1, m3, m4, m5, m6, d1, d2 (hors funnel), d3, d6.
> **Restants (hors de portée autonome) :**
> - **M1** — Resend en attente de propagation SES (rien à coder).
> - **C3** — cron d'expiration : *optionnel* (Option A retenue → Dodo convertit seul).
> - **m7** (preuve sociale), **m8** (nom fondateur) — nécessitent de vraies données/décision.
> - **m9** — recommandation de monitoring, pas une tâche de code.
> - **d4** — Meta Pixel : code prêt, manque `NEXT_PUBLIC_META_PIXEL_ID` (à créer côté Meta).
> - **d5** — KYC Dodo : action à mener dans le back-office Dodo.

---


> Audit end-to-end du parcours **lead → client** et de l'espace **owner**, réalisé sur la production (scannshine.com) + revue du code par 2 agents spécialisés + tests runtime. Rien n'a été modifié pendant l'audit.
>
> **Verdict global :** le produit est soigné, le copywriting FR local est excellent, l'infra tient. **Mais deux trous critiques sabotent la conversion et le revenu** — à traiter en priorité absolue. Le reste est du polish et de l'outillage owner.

---

## 🔴 CRITIQUE — à corriger avant tout démarchage client

### C1 — Après l'inscription, le gérant atterrit sur un dashboard « organisation » en anglais (pas sur l'onboarding)
- **Confirmé en prod** : un compte frais → `/orgs/{slug}` qui rend la page boilerplate NOW.TS (« Dashboard », « Invite member », « Subscribers », « Members ») — 100 % anglais, hors-sujet.
- **Cause** : `app/auth/signup/sign-up-credentials-form.tsx` redirige vers `/orgs` (fallback `getCallbackUrl("/orgs")`) ; + `src/lib/auth.ts:55-72` crée une organisation fantôme pour chaque inscrit ; `/orgs` redirige vers cette org.
- **Impact** : le lead qui vient de s'inscrire voit une page incompréhensible au lieu du wizard « Votre commerce ». Rupture du tunnel dès la 1ʳᵉ seconde + pollution BDD (1 org fantôme/inscrit).
- **Action** :
  1. Rediriger le signup (et signin, et racine) vers **`/dashboard`** — le layout redirige déjà vers `/onboarding` si l'onboarding n'est pas fini.
  2. Retirer le hook de création d'organisation dans `src/lib/auth.ts` (mono-établissement : 1 user = 1 `business`, les orgs ne servent à rien).
  3. Supprimer/neutraliser le module `app/orgs/**` (ou au minimum le rendre inaccessible).

### C2 — L'essai « 7 jours » est décoratif : accès complet gratuit **à vie**, aucune incitation à payer
- **Confirmé (code, 2 agents)** : à la fin de l'onboarding, `completeOnboardingAction` (`onboarding.action.ts:139-157`) passe juste `onboardingStep=4` — il ne met **jamais** `subscriptionStatus="TRIALING"` ni `trialEndsAt`. Le statut reste `ONBOARDING`.
- Le layout dashboard autorise l'accès pour `["ONBOARDING","TRIALING","ACTIVE"]` → un `ONBOARDING` a le dashboard complet + le funnel `/r/` servi indéfiniment, sans carte, sans date, sans relance.
- L'UI ment : l'onboarding dit « votre essai démarre maintenant » (`step-qr-actions.tsx:41`) alors que `/billing` dit « Essai à démarrer ». Le checkout n'est atteignable que si le gérant va **volontairement** sur `/billing` (page **absente de la sidebar**).
- **Impact** : conversion payante ≈ proche de zéro **par conception**. C'est le trou de revenu central du produit.
- **Action — trancher le modèle puis l'implémenter réellement** :
  - **Option A (recommandée, conversion max) — carte exigée à l'onboarding** : à l'écran 3, le bouton lance le checkout Dodo obligatoire ; l'essai devient un vrai trial Dodo (7 j) qui se convertit seul à J+7 via webhook. `onboardingStep=4` seulement après retour de paiement.
  - **Option B — vrai essai sans carte** : poser `subscriptionStatus="TRIALING"` + `trialEndsAt=now()+7j` à la fin de l'onboarding ; retirer `ONBOARDING` des statuts à accès ; + cron (voir C3) pour verrouiller à l'expiration ; bandeau « Essai — J-N, activer mon abonnement » sur le dashboard.
  - Dans les 2 cas : ajouter **« Mon abonnement »** à la sidebar du dashboard.

### C3 — Aucune bascule automatique à l'expiration de l'essai (pas de cron)
- Toutes les transitions de statut dépendent **exclusivement** des webhooks Dodo. Un `ONBOARDING` (ou un `TRIALING` posé sans carte) n'a aucun abonnement Dodo → aucun webhook → il n'expire jamais.
- **Action** : ajouter une tâche planifiée quotidienne (Vercel Cron) qui verrouille les essais dépassés et sert de filet si un webhook Dodo est manqué. Indispensable si Option B retenue en C2.

---

## 🟠 MAJEUR

### M1 — Emails transactionnels encore inopérants (Resend non vérifié)
- Domaine Resend `scannshine.com` toujours en `pending` (DNS corrigés le 2026-07-13, propagation SES lente). Tant que non `verified` : aucun email ne part (retour privé au gérant, mot de passe oublié, code de connexion).
- **Action** : attendre/forcer la vérification Resend ; envoyer un email de test réel ; couvrir le cas où un lead se connecte par code email (défaut du signin) alors que l'email ne part pas.

### M2 — MRR admin trompeur (essais comptés comme revenu + churn effacé)
- `admin-stats-section.tsx` et `admin-charts-data.ts` comptent `ACTIVE + TRIALING` × 33,50 € → MRR gonflé par des essais qui ne paient pas.
- `getMrrHistory` ne prend que les business *actuellement* actifs et les projette dans le passé → la courbe ne montre **jamais** de churn et surévalue les mois passés.
- **Action** : MRR = `ACTIVE` seul ; « essais en cours » en métrique séparée + taux de conversion ; historiser les transitions d'abonnement pour un MRR mensuel réel.

### M3 — Écran de lock PAST_DUE : le texte « QR actif 7 jours » est faux
- `layout.tsx:44-46` promet que le QR reste actif 7 j en impayé, mais `isFunnelActive` (`get-business.ts:31-42`) n'applique la grâce de 7 j **qu'à `CANCELLED`** — pour `PAST_DUE` le funnel est servi **sans limite**.
- **Action** : aligner le comportement sur le texte (grâce datée aussi pour PAST_DUE), ou corriger le texte.

### M4 — Validation du formulaire d'inscription trop laxiste
- `signup.schema.ts:4` : `name: z.string()` **sans `.min()`** → nom vide accepté.
- Non-correspondance des mots de passe signalée seulement par un toast au submit, pas en inline. Pas d'indicateur de robustesse.
- Vérif email : `sendVerificationEmail` défini mais ni `sendOnSignUp` ni `requireEmailVerification` → code mort. À activer ou retirer.
- **Action** : `name.min(2)`, message inline sur la confirmation, trancher la vérif email.

### M5 — Vues owner manquantes pour opérer au quotidien
- Manque : **churn** (taux mensuel), **essais qui expirent bientôt** (relance), **commerces inactifs** (0 scan/30 j — `scans30d` existe déjà mais non filtrable/triable), **compteur de free-riders `ONBOARDING`** (lié à C2).
- **Action** : enrichir `/admin` et `/admin/commerces` (données déjà en base, coût faible).

---

## 🟡 MINEUR

- **m1 — `callbackUrl=null` littéral** : `sign-in-providers.tsx:47` génère `/auth/signup?callbackUrl=null` (et `sign-in-button.tsx:29` → `callbackUrl=` vide au SSR). Atténué par `getCallbackUrl`, mais URL sale. → n'ajouter `?callbackUrl=` que si valeur présente.
- **m2 — Destinations post-auth incohérentes** : signup→`/`, signin→`/orgs`, déjà connecté→`/account`, racine→`/dashboard`. Converger vers `/dashboard`.
- **m3 — CRM `monthStart` en fuseau serveur** (`crm/page.tsx:72-74`) au lieu de Pacific/Tahiti → le « +X ce mois » peut basculer ~10 h trop tôt aux bornes de mois. Réutiliser le helper TZ de `get-stats.ts`.
- **m4 — Prix 33,50 € dupliqué en dur** à 3 endroits (admin ×2 + `dodo.ts`). Importer `SCANNSHINE_PLAN.priceEur` partout.
- **m5 — `TrendBadge` +100 %** dès que le précédent vaut 0, quelle que soit l'ampleur (`dashboard/page.tsx:57-59`). Afficher « nouveau » plutôt qu'un %.
- **m6 — CTA header disparaît au scroll** (`landing-header.tsx:84-91`) → garder le CTA d'inscription visible en permanence sur la landing.
- **m7 — Landing sans preuve sociale** : composants `stats-section`/`review`/`feature-section` existent mais non montés. Pour un produit qui *vend* la preuve sociale, en afficher (X commerces, témoignages) une fois les premiers clients acquis.
- **m8 — Fondateur anonyme** (`founder-section.tsx`) : jamais nommé (« Le fondateur »). Sur un marché local de confiance, mettre un vrai prénom/nom.
- **m9 — Saisie manuelle du Place ID technique** (`step-google.tsx:167-203`) : mur potentiel pour la cible ; surveiller le taux d'abandon étape 2 (résolveur de lien + guide couvrent le cas nominal).

---

## ⚪ COSMÉTIQUE / dette

- **d1 — Textes anglais résiduels dans l'admin owner** : `admin/page.tsx:28` (« Admin Dashboard »), `admin/users/page.tsx:36` (« User Management »). Le reste de l'admin est FR.
- **d2 — Emojis** contre la règle interne `.claude/rules/ui-ux.md` : funnel `/r/` (😊😞🎁), CRM (🚀), billing (✓). À trancher (sur le funnel client c'est plutôt chaleureux).
- **d3 — Pages légales** `/legal/terms` et `/legal/privacy` encore en anglais boilerplate → CGV + politique de confidentialité FR obligatoires pour vendre (RGPD/PF).
- **d4 — Meta Pixel** non configuré (`NEXT_PUBLIC_META_PIXEL_ID` absent) → à créer avant les Meta Ads (code déjà prêt).
- **d5 — KYC Dodo** : encore en `test_mode` → soumettre le KYC + basculer live avant d'encaisser réellement.
- **d6 — `set-demo-step.ts`** : 1 erreur lint (floating promise), script dev only.

---

## ✅ Points solides (à conserver)
- Webhook Dodo robuste (503 sans clé, signature vérifiée, anti-régression CANCELLED par rang d'état, TRIALING dérivé du payload, `cancelledAt` non glissé).
- Fuseau Pacific/Tahiti correct pour les stats journalières (`get-stats.ts`).
- Funnel public volontairement maintenu hors abonnement (bon choix produit) + grâce CANCELLED + fail-safe.
- Email de retour privé au gérant avec échappement markdown anti-phishing + double rate-limit.
- Onboarding réellement en 3 écrans courts, retour arrière autorisé, résolution auto du lien Maps + carte de confirmation + porte de sortie « pas de fiche Google » + guide `/creer-fiche-google`.
- Copywriting FR local excellent, vouvoiement constant, aucune faute dans les sections marketing.
- Paiement testé E2E (checkout → webhook → ACTIVE → annulation → CANCELLED).

---

## Ordre d'action recommandé
1. **C1** (redirection post-signup → onboarding + purge orgs) — casse le tunnel dès la 1ʳᵉ seconde.
2. **C2** (démarrer réellement l'essai + rendre l'abonnement visible/incitatif) — sans ça, aucun revenu.
3. **C3** (cron d'expiration) — indispensable si essai sans carte.
4. **M1** (emails Resend) + **M3** (texte PAST_DUE) + **m1/M4** (callbackUrl + validation signup) — corrections rapides.
5. **M2/M5** (MRR juste + vues owner) — pilotage fiable.
6. **d3/d4/d5** (légal + pixel + KYC) — pré-lancement commercial.
7. Reste (m2–m9, d1–d6) — polish de conversion et cohérence.
