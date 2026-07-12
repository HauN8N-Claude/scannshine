# Implementation Tasks: ScanNShine

## Overview

- **Total : 14 tâches**
- **Estimation : ~41 h** → 1 semaine full-time (planning J1→J7 d'archi.md)
- Les P1 (tasks 06 et 12, le CRM) sont la variable d'ajustement : glissables à J+9 sans bloquer le lancement

## Task List

| # | Task | Priority | Hours | Depends On | Jour | Status |
|---|------|----------|-------|------------|------|--------|
| 01 | Setup NOW.TS + environnement | P0 | 2 | — | J1 | ⬜ |
| 02 | Schéma Prisma ScanNShine | P0 | 2 | 01 | J1 | ⬜ |
| 03 | Résolution lien Maps → Place ID | P0 | 3 | 01 | J1-J2 | ⬜ |
| 04 | Funnel public /r/[slug] | P0 ⭐ | 4 | 02 | J2 | ⬜ |
| 05 | Feedback privé + email gérant | P0 | 3 | 04 | J2 | ⬜ |
| 06 | Capture contact CRM (funnel) | P1 | 2 | 04 | J6 | ⬜ |
| 07 | Onboarding 3 écrans | P0 | 4 | 02, 03 | J3 | ⬜ |
| 08 | Dodo Payments (checkout, webhooks, gating) | P0 | 4 | 07 | J4 | ⬜ |
| 09 | Dashboard stats | P0 | 3 | 02, 04 | J5 | ⬜ |
| 10 | Page feedbacks privés | P0 | 2 | 05 | J5 | ⬜ |
| 11 | QR plein écran + PDF | P0 | 3 | 07 | J5 | ⬜ |
| 12 | CRM — table + export CSV | P1 | 2 | 06 | J6 | ⬜ |
| 13 | Landing page + pricing | P0 | 3 | 01 | J6 | ⬜ |
| 14 | Settings + tests E2E + deploy | P0 | 4 | 08, 09, 10, 11, 13 | J7 | ⬜ |

## Dependency Graph

```
01 ──► 02 ──► 04 ──► 05 ──► 10
 │      │      │
 │      │      ├──► 06 ──► 12        (P1 — glissable J+9)
 │      │      └──► 09
 │      └──► 07 ──► 08
 ├──► 03 ──┘  └──► 11
 └──► 13
              08+09+10+11+13 ──► 14 (deploy)
```

## How to Use

1. Suivre l'ordre en respectant les dépendances (01 → 02 → ...)
2. Implémenter chaque tâche avec Claude Code : « Implémente la task 04 depuis ~/.claude/output/saas/avis-google/tasks/04-funnel-public-page.md, en te référant à prd.md et archi.md »
3. Cocher les acceptance criteria et passer le statut ⬜ → ✅ dans ce README
4. Garder prd.md et archi.md ouverts en référence

## Status Legend

- ⬜ Pending · 🔄 In Progress · ✅ Complete · ⏸️ Blocked

## Rappels critiques (issus de la validation)

- ⚠️ **Conformité UGC Google** : le lien vers Google reste visible sur TOUS les écrans du funnel, y compris la branche insatisfait — jamais de review gating
- ⚠️ **Task 03 (Place ID) = risque technique n°1** : prototyper tôt, timeboxer 3 h, fallback saisie manuelle
- 📞 **Pendant le build** : recruter et interviewer 5 gérants (Mom Test) — le prix de 3 990 XPF n'a jamais été confronté au marché
