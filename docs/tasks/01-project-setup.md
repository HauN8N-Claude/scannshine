---
task_id: 01
title: Setup NOW.TS + environnement
status: pending
priority: P0
estimated_hours: 2
prd_features: ["Self-service complet"]
archi_sections: ["Architecture Overview", "Ordre d'implémentation J1"]
depends_on: []
---

# Task 01: Setup NOW.TS + environnement

## Context

Initialiser ScanNShine sur le boilerplate NOW.TS. C'est la fondation : auth, emails, admin et CI/CD sont déjà câblés — on configure et on purge ce qui ne sert pas.

## Requirements

- [ ] Cloner le boilerplate NOW.TS dans le dossier projet et renommer en `scannshine`
- [ ] Créer la base Neon PostgreSQL et récupérer la `DATABASE_URL`
- [ ] Remplir `.env` : `DATABASE_URL`, `BETTER_AUTH_SECRET`, `RESEND_API_KEY`, `NEXT_PUBLIC_URL`
- [ ] Lancer les migrations NOW.TS de base et vérifier `pnpm dev`
- [ ] **Purger le module Stripe** : supprimer/neutraliser les routes webhook Stripe, les libs et les env vars Stripe (garder le code sous les yeux comme gabarit pour Dodo — le déplacer dans `/_reference` plutôt que le supprimer)
- [ ] Désactiver les features NOW.TS non utilisées au MVP : organisations/multi-tenant, OAuth providers

## Technical Details

**Files to create/modify:**
- `.env` — variables d'environnement
- `src/lib/auth.ts` (ou équivalent NOW.TS) — désactiver OAuth, garder email+password
- Config du site : nom « ScanNShine », locale `fr`

## Acceptance Criteria

- [ ] `pnpm dev` démarre sans erreur
- [ ] Signup/login email+password fonctionne en local
- [ ] Aucune référence Stripe active (aucune env var exigée au boot)
- [ ] La DB Neon contient les tables NOW.TS de base

## Notes

Ne pas passer de temps à personnaliser le thème ici — le branding vient avec la landing (task 13).
