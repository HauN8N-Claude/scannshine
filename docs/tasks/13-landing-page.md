---
task_id: 13
title: Landing page + pricing
status: pending
priority: P0
estimated_hours: 3
prd_features: ["Pages Required (Landing)"]
archi_sections: ["Ce que NOW.TS fournit (Landing structure)"]
depends_on: [01]
---

# Task 13: Landing page + pricing

## Context

La porte d'entrée du funnel d'acquisition (Meta Ads, Insta/TikTok, influenceurs). Cible : un gérant de TPE polynésienne, non technique, méfiant envers le paiement en ligne. Objectif unique : démarrer l'essai 7 jours.

## Requirements

- [ ] **Hero** : promesse claire — « Transformez vos clients satisfaits en avis Google ⭐ » + sous-titre local (« Pensé pour les commerces du fenua ») + CTA « Essai gratuit 7 jours » + visuel du funnel (mockup téléphone + chevalet)
- [ ] **Le problème** : « 12 avis quand votre concurrent en a 200 ? » — 3 douleurs en icônes
- [ ] **Comment ça marche** : 3 étapes illustrées (le client scanne → il note → il publie sur Google) + mention du formulaire privé pour les insatisfaits
- [ ] **Pricing** : carte unique — 3 990 XPF/mois, essai 7 jours, sans engagement, liste des features ; mention « ≈ 33,50 €, paiement sécurisé »
- [ ] **FAQ** : 5-6 questions (Est-ce autorisé par Google ? Ça marche sans site web ? Comment j'affiche le QR ? Je peux annuler ? Le paiement est-il sécurisé ? Ça marche dans les îles ?)
- [ ] **Réassurance locale** : entreprise polynésienne, support en français, WhatsApp
- [ ] SEO : title/meta/OG en français, OG image
- [ ] Mobile-first (le trafic Meta Ads sera ~90 % mobile)

## Technical Details

**Files to create/modify:**
- `app/page.tsx` + sections dans `src/components/landing/`
- `app/opengraph-image` — OG image

Réutiliser les blocs landing de NOW.TS, remplacer copy + couleurs ScanNShine.

## Acceptance Criteria

- [ ] Lighthouse mobile ≥ 90 (performance + SEO)
- [ ] CTA → signup fonctionne
- [ ] Lecture fluide sur un écran 375 px
- [ ] La FAQ répond explicitement à « est-ce conforme aux règles Google ? » (oui : on n'empêche jamais l'accès à Google)

## Notes

Copy en français simple, ton direct, vocabulaire local assumé (fenua, patenté). Pas de jargon SaaS (« plateforme », « solution »).
