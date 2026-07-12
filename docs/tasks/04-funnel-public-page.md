---
task_id: 04
title: Funnel public /r/[slug] — page de collecte brandée
status: pending
priority: P0
estimated_hours: 4
prd_features: ["Funnel d'avis ⭐ (Core)"]
archi_sections: ["Le funnel public /r/{slug}"]
depends_on: [02]
---

# Task 04: Funnel public /r/[slug] — page de collecte brandée

## Context

LE cœur du produit (P0 ⭐). Le client final scanne le QR et arrive ici : page publique aux couleurs du commerce, choix satisfait/insatisfait, redirection Google. Optimisée mobile 3G (îles) : < 50 kB JS.

## Requirements

- [ ] Route `app/r/[slug]/page.tsx` — Server Component public (AUCUNE auth), 404 propre si slug inconnu
- [ ] Affichage brandé : logo, nom du commerce, `brandColor` en accent (variable CSS inline)
- [ ] Log `ScanEvent(type: SCAN)` au chargement avec `visitorHash = sha256(ip+ua)` et déduplication 1 h (même hash + même business → pas de nouvel event)
- [ ] Question : « Comment s'est passée votre visite chez {nom} ? » avec 2 boutons (😊 Très bien / 😞 Peut mieux faire)
- [ ] 😊 → server action log `CLICK_GOOGLE` puis redirect `https://search.google.com/local/writereview?placeid={placeId}`
- [ ] 😞 → navigation vers `/r/[slug]/feedback` (task 05)
- [ ] ⚠️ **Conformité UGC Google** : un lien texte discret « Laisser un avis Google » reste visible sur TOUS les écrans du funnel, y compris la branche insatisfait
- [ ] Mobile-first, cible < 50 kB JS client, images logo via `next/image`

## Technical Details

**Files to create/modify:**
- `app/r/[slug]/page.tsx` — page principale
- `app/r/[slug]/actions.ts` — server actions `logScan`, `logGoogleClick`
- `src/lib/visitor-hash.ts` — hash IP+UA (via `headers()`)

Le commerce est servi même si l'abonnement est expiré (délai de grâce — cf. archi « Gating »). Seul le statut `CANCELLED` depuis > 7 jours affiche une page neutre.

## Acceptance Criteria

- [ ] Scanner le QR du business seed sur un vrai téléphone → page brandée s'affiche en < 2 s
- [ ] Clic 😊 → arrivée sur le formulaire d'avis Google du commerce
- [ ] Les ScanEvents apparaissent en DB avec le bon type, sans doublon au re-scan immédiat
- [ ] Lighthouse mobile ≥ 90 en performance

## Notes

Pas de cookie/consentement nécessaire : le hash IP+UA est anonymisé et éphémère — mentionner quand même la mesure d'audience dans une ligne de footer.
