---
task_id: 02
title: Schéma Prisma — modèles ScanNShine
status: pending
priority: P0
estimated_hours: 2
prd_features: ["Funnel d'avis", "Dashboard", "CRM"]
archi_sections: ["Schéma Prisma"]
depends_on: [01]
---

# Task 02: Schéma Prisma — modèles ScanNShine

## Context

Ajouter les 4 modèles custom au schéma NOW.TS existant : `Business` (le commerce + statut abonnement Dodo), `ScanEvent` (tracking du funnel), `Feedback` (retours privés), `Contact` (CRM). Le schéma complet est dans archi.md.

## Requirements

- [ ] Ajouter les modèles `Business`, `ScanEvent`, `Feedback`, `Contact` + enums `SubStatus` (ONBOARDING | TRIALING | ACTIVE | PAST_DUE | CANCELLED) et `ScanType` (SCAN | CLICK_GOOGLE | FEEDBACK_PRIVATE) — copier depuis archi.md
- [ ] Relation `User 1—1 Business` (mono-établissement, ADR-006)
- [ ] Index `@@index([businessId, createdAt])` sur ScanEvent (requêtes stats)
- [ ] `@@unique([businessId, phone])` sur Contact (dédup CRM)
- [ ] Migration `prisma migrate dev` + client régénéré
- [ ] Seed de dev : 1 user + 1 business `demo-snack` avec ~200 ScanEvents répartis sur 30 jours, 3 feedbacks, 10 contacts

## Technical Details

**Files to create/modify:**
- `prisma/schema.prisma` — ajout des modèles
- `prisma/seed.ts` — données de dev

## Acceptance Criteria

- [ ] `prisma migrate dev` passe sans erreur
- [ ] `prisma studio` montre les 4 tables + données seed
- [ ] TypeScript compile (client Prisma à jour)

## Notes

`Feedback.rating` = ressenti déclaré, **jamais** utilisé pour masquer le lien Google (conformité UGC — cf. PRD).
