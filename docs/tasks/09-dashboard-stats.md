---
task_id: 09
title: Dashboard stats (scans, clics Google, feedbacks)
status: pending
priority: P0
estimated_hours: 3
prd_features: ["Dashboard de pilotage"]
archi_sections: ["Stats dashboard"]
depends_on: [02, 04]
---

# Task 09: Dashboard stats (scans, clics Google, feedbacks)

## Context

L'argument anti-churn n°1 : le gérant VOIT chaque semaine que ça marche. Vue principale du dashboard avec les chiffres et la tendance.

## Requirements

- [ ] Page `app/(dashboard)/dashboard/page.tsx` : 4 cartes KPI — scans, clics vers Google, feedbacks privés, contacts captés — avec comparaison vs période précédente (↗︎ +12 %)
- [ ] Courbe scans + clics Google par jour (Recharts, AreaChart), filtre période 7j / 30j / 90j via `nuqs`
- [ ] Requêtes : `groupBy` Prisma sur `ScanEvent` (businessId + fenêtre temporelle) — Server Component, pas d'API route
- [ ] Liste « derniers feedbacks privés » (3 derniers, lien vers task 10 page feedbacks)
- [ ] Empty state accueillant pour un compte neuf : « Votre QR attend son premier scan ! Téléchargez votre affiche → »
- [ ] Responsive mobile (le gérant consulte depuis son téléphone)

## Technical Details

**Files to create/modify:**
- `app/(dashboard)/dashboard/page.tsx` + `components/kpi-card.tsx`, `components/scans-chart.tsx`
- `src/queries/stats.ts` — agrégations réutilisables

## Acceptance Criteria

- [ ] Les chiffres du seed s'affichent juste (vérif croisée avec Prisma Studio)
- [ ] Changement de période met à jour cartes + courbe (état dans l'URL)
- [ ] Rendu mobile propre (cartes empilées)
- [ ] Compte sans events → empty state, pas de graphique vide moche

## Notes

Vocabulaire affiché : « clics vers Google » (pas « avis générés » — sans l'API Google on mesure les clics, cf. Open Questions du PRD). Sous-titre honnête : « clients envoyés vers votre fiche Google ».
