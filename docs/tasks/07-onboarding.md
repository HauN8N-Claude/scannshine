---
task_id: 07
title: Onboarding 3 écrans (commerce → fiche Google → QR)
status: pending
priority: P0
estimated_hours: 4
prd_features: ["Self-service complet"]
archi_sections: ["Place ID", "ADR-005 (Vercel Blob)", "Folder Structure (onboarding/)"]
depends_on: [02, 03]
---

# Task 07: Onboarding 3 écrans (commerce → fiche Google → QR)

## Context

Après signup, le gérant configure son commerce en < 10 min sans aucune compétence technique. À la fin, son QR existe et le funnel est actif.

## Requirements

- [ ] **Écran 1 — Le commerce** : nom, upload logo (Vercel Blob, optionnel), couleur de marque (picker + 6 presets), génération auto du `slug` (éditable, kebab-case, unicité vérifiée)
- [ ] **Écran 2 — La fiche Google** : champ « collez le lien de votre fiche Google Maps » → `resolvePlaceId()` (task 03) → confirmation visuelle « C'est bien {nom détecté} ? » ; fallback : guide illustré pas-à-pas + saisie manuelle du Place ID
- [ ] **Écran 3 — Votre QR est prêt** : QR affiché, boutons « Télécharger le PDF » (task 11, lien placeholder si pas encore fait) et « Voir ma page » (`/r/{slug}`) ; CTA vers le checkout (task 09)
- [ ] Progression persistée : quitter et revenir reprend à l'écran en cours
- [ ] Middleware/layout : user connecté sans Business complété → redirigé vers l'onboarding
- [ ] `Business.subscriptionStatus = ONBOARDING` jusqu'au checkout

## Technical Details

**Files to create/modify:**
- `app/onboarding/page.tsx` + composants par écran + `actions.ts`
- `src/lib/qr.ts` — génération QR SVG (lib `qrcode`) pointant vers `{NEXT_PUBLIC_URL}/r/{slug}`
- Upload logo : `@vercel/blob` (route handler upload)

## Acceptance Criteria

- [ ] Parcours complet signup → écran 3 en < 10 min par un non-technicien
- [ ] Le lien Maps d'un vrai commerce de Tahiti résout et affiche le bon nom
- [ ] Le QR généré scanne vers `/r/{slug}` fonctionnel
- [ ] Refresh en plein milieu → reprise au bon écran

## Notes

Textes en français simple, vocabulaire non technique (« votre fiche Google », jamais « Place ID » à l'écran).
