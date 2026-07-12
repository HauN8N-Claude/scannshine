---
task_id: 10
title: Page feedbacks privés
status: pending
priority: P0
estimated_hours: 2
prd_features: ["Funnel d'avis (feedback privé)", "Dashboard de pilotage"]
archi_sections: ["Folder Structure (feedbacks/)"]
depends_on: [05]
---

# Task 10: Page feedbacks privés

## Context

Le gérant lit et traite les retours des clients insatisfaits — la matière première pour rattraper un client avant l'avis 1★.

## Requirements

- [ ] Page `app/(dashboard)/feedbacks/page.tsx` : liste antichronologique — message, ressenti, date, coordonnées si laissées
- [ ] Badge lu/non-lu (`isRead`), marquage lu au clic, compteur non-lus dans la nav du dashboard
- [ ] Actions rapides si contact laissé : `tel:` (appeler) et `mailto:`/WhatsApp (`wa.me/689...`)
- [ ] Pagination simple (20/page)
- [ ] Empty state : « Aucun retour négatif — c'est bon signe ! »

## Technical Details

**Files to create/modify:**
- `app/(dashboard)/feedbacks/page.tsx` + `actions.ts` (markAsRead)
- Nav dashboard : badge compteur

## Acceptance Criteria

- [ ] Les feedbacks du seed s'affichent, tri correct
- [ ] Marquer lu persiste et décrémente le badge
- [ ] Le lien WhatsApp ouvre la conversation avec le bon numéro

## Notes

WhatsApp est LE canal de communication au fenua — le bouton `wa.me` compte plus que le mailto.
