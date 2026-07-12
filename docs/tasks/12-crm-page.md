---
task_id: 12
title: CRM — table contacts + export CSV
status: pending
priority: P1
estimated_hours: 2
prd_features: ["CRM — capture de contacts"]
archi_sections: ["Folder Structure (crm/)"]
depends_on: [06]
---

# Task 12: CRM — table contacts + export CSV

## Context

La base clients que le commerce n'a jamais eue, consultable et exportable. Prépare le SMS marketing v1.1. P1 : glissable à J+9 si la semaine déborde (avec la task 06).

## Requirements

- [ ] Page `app/(dashboard)/crm/page.tsx` : table (shadcn DataTable) — nom, téléphone, email, date de consentement ; recherche simple ; tri par date
- [ ] Compteur total + croissance (« +12 ce mois »)
- [ ] Export CSV (UTF-8 BOM pour Excel) : route `app/api/crm/export/route.ts`, colonnes nom/téléphone/email/consentement, protégée propriétaire
- [ ] Suppression d'un contact (droit à l'effacement RGPD) avec confirmation
- [ ] Empty state : « Vos clients laisseront leurs coordonnées en scannant votre QR »

## Technical Details

**Files to create/modify:**
- `app/(dashboard)/crm/page.tsx` + `actions.ts` (deleteContact)
- `app/api/crm/export/route.ts`

## Acceptance Criteria

- [ ] Les contacts du seed s'affichent, recherche fonctionne
- [ ] Le CSV s'ouvre proprement dans Excel (accents corrects)
- [ ] Suppression → contact absent de la DB
- [ ] Un user ne peut pas exporter le CRM d'un autre business (test direct URL)

## Notes

Teaser v1.1 discret en haut de page : « Bientôt : envoyez vos promos par SMS à toute votre base 🚀 » — valide l'intérêt sans rien promettre de daté.
