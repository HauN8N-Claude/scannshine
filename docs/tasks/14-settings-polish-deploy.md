---
task_id: 14
title: Settings, tests bout en bout, deploy production
status: pending
priority: P0
estimated_hours: 4
prd_features: ["Pages Required (Settings)", "Success Criteria"]
archi_sections: ["Ordre d'implémentation J7", "Coûts"]
depends_on: [08, 09, 10, 11, 13]
---

# Task 14: Settings, tests bout en bout, deploy production

## Context

Dernière ligne droite : le gérant peut modifier son branding, tout le parcours est testé en conditions réelles, et le produit part en production.

## Requirements

- [ ] **Settings branding** : modifier nom, logo, couleur, lien fiche Google (avec re-résolution Place ID) — le slug ne change PAS après création (les QR imprimés en dépendent)
- [ ] **Test bout en bout en mode test Dodo** : signup → onboarding → checkout → scan du QR réel → clic Google → feedback privé → email reçu → contact capté → export CSV
- [ ] Error boundaries + pages d'erreur françaises ; états de chargement sur les mutations
- [ ] PostHog : events clés (signup, onboarding_completed, checkout_started, subscription_active)
- [ ] Deploy Vercel production : domaine, env vars prod, webhook Dodo pointé sur le domaine prod, produit Dodo en mode live
- [ ] Emails transactionnels : domaine vérifié Resend (SPF/DKIM)
- [ ] Test final sur téléphone réel en 4G : scan → avis Google publié sur un commerce test

## Technical Details

**Files to create/modify:**
- `app/(dashboard)/settings/page.tsx`
- `app/error.tsx`, `app/not-found.tsx`
- Config Vercel + Dodo live

## Acceptance Criteria

- [ ] Le parcours complet fonctionne en production avec un vrai paiement (puis remboursé/annulé)
- [ ] L'email de feedback part depuis le domaine du produit (pas resend.dev)
- [ ] Aucune erreur console sur les parcours principaux
- [ ] Les events PostHog remontent

## Notes

Checklist lancement post-deploy : créer le commerce test public pour les démos Insta/TikTok, et recruter les 5 gérants Mom-Test (cf. PRD Timeline).
