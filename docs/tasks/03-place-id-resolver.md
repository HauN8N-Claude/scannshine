---
task_id: 03
title: Résolution lien Google Maps → Place ID
status: pending
priority: P0
estimated_hours: 3
prd_features: ["Self-service complet (onboarding)"]
archi_sections: ["Place ID", "ADR-003", "Risques techniques #1"]
depends_on: [01]
---

# Task 03: Résolution lien Google Maps → Place ID

## Context

Le gérant colle le lien de partage de sa fiche Google Maps ; on en extrait le Place ID pour construire le lien d'avis `https://search.google.com/local/writereview?placeid={placeId}`. **C'est le risque technique n°1 identifié en archi — à prototyper en premier.**

## Requirements

- [ ] `resolvePlaceId(url: string)` : suivre les redirections des liens courts (`maps.app.goo.gl`, `g.co/kgs/...`), parser l'URL longue finale
- [ ] Extraire le Place ID (`ChIJ...`) depuis les formats connus : paramètre `placeid`, segment `!1s0x...`, `ftid`, données `1s` de l'URL `/maps/place/...`
- [ ] Si seul un CID/coordonnées est disponible, extraire aussi le **nom du commerce** depuis l'URL pour confirmation visuelle
- [ ] Retour typé : `{ placeId, businessName? } | { error: 'UNRESOLVED' }`
- [ ] Tests unitaires avec 5-6 vraies URLs de formats différents (courte mobile, longue desktop, lien « partager »)
- [ ] Fallback : fonction de validation d'un Place ID saisi manuellement (`ChIJ` + base64-like)

## Technical Details

**Files to create/modify:**
- `src/lib/place-id.ts` — résolveur + validateur
- `src/lib/place-id.test.ts` — tests unitaires

Résolution des redirects côté serveur uniquement (`fetch` avec `redirect: 'manual'` en boucle, max 5 hops, timeout 5 s).

## Acceptance Criteria

- [ ] Les liens de partage mobiles (`maps.app.goo.gl/...`) d'au moins 3 vrais commerces de Tahiti résolvent vers un Place ID valide
- [ ] Une URL invalide retourne `UNRESOLVED` sans crash
- [ ] Le lien writereview construit ouvre bien le formulaire d'avis Google du commerce testé

## Notes

Si un format résiste, ne pas s'acharner : le fallback saisie manuelle guidée (task 08) couvre le cas. Timeboxer à 3 h.
