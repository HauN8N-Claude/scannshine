---
task_id: 11
title: Page QR plein écran + PDF imprimables
status: pending
priority: P0
estimated_hours: 3
prd_features: ["Funnel d'avis (QR PDF + smartphone)", "Dashboard"]
archi_sections: ["QR code & PDF"]
depends_on: [07]
---

# Task 11: Page QR plein écran + PDF imprimables

## Context

Les deux supports du QR décidés au PRD : le PDF à imprimer (chevalet caisse, autocollant) et le « QR de poche » affiché depuis le smartphone du gérant (métiers mobiles : taxis, artisans, activités touristiques).

## Requirements

- [ ] Page `app/(dashboard)/qr/page.tsx` — **QR plein écran** : QR SVG en grand, nom du commerce, fond `brandColor`, bouton « plein écran » (Fullscreen API), hint « ajoutez cette page à votre écran d'accueil »
- [ ] Route `app/api/pdf/[slug]/route.ts` — génération PDF via `@react-pdf/renderer`, 2 gabarits :
  - **Chevalet A5** : « Votre avis compte ! Scannez pour nous noter ⭐ » + QR + logo + couleurs du commerce
  - **Autocollant 10×10 cm** : QR + une ligne d'appel
- [ ] Boutons de téléchargement des 2 PDF depuis la page QR (et depuis l'écran 3 de l'onboarding — remplacer le placeholder de la task 07)
- [ ] QR avec marge de silence correcte et contraste noir/blanc (jamais le QR en couleur claire — scannabilité avant esthétique)

## Technical Details

**Files to create/modify:**
- `app/(dashboard)/qr/page.tsx`
- `app/api/pdf/[slug]/route.ts` (query `?template=chevalet|sticker`) — protégée : réservée au propriétaire du business
- `src/lib/pdf-templates.tsx` — composants react-pdf

## Acceptance Criteria

- [ ] Les 2 PDF se téléchargent et s'impriment aux bonnes dimensions
- [ ] Le QR imprimé en A5 scanne à 1 m de distance avec un téléphone moyen de gamme
- [ ] Le QR plein écran scanne depuis l'écran d'un autre téléphone (test réel)
- [ ] Textes des gabarits en français, ton chaleureux

## Notes

Tester l'impression réelle N&B : le gabarit doit rester lisible sans couleur (les gérants impriment souvent en N&B).
