---
task_id: 06
title: Capture de contact CRM sur le funnel
status: pending
priority: P1
estimated_hours: 2
prd_features: ["CRM — capture de contacts"]
archi_sections: ["Le funnel public /r/{slug}", "Schéma Prisma (Contact)"]
depends_on: [04]
---

# Task 06: Capture de contact CRM sur le funnel

## Context

Construire l'actif client du commerce dès le jour 1 : capture opt-in de coordonnées sur le funnel. Prépare le SMS marketing v1.1. P1 : c'est la variable d'ajustement de la semaine.

## Requirements

- [ ] Sur l'écran de remerciement (les deux branches du funnel) : bloc « Recevez les bons plans de {commerce} » — nom + mobile (+689) ou email
- [ ] Case de consentement explicite NON pré-cochée : « J'accepte de recevoir les offres de {commerce} » → `consentAt` horodaté (RGPD/CNIL, applicable en PF)
- [ ] Server action : upsert `Contact` (dédup sur `businessId + phone`)
- [ ] Validation Zod : téléphone au format polynésien (+689 + 8 chiffres, accepter 87/88/89 et fixes 40)
- [ ] Étape ignorable en un tap (« Non merci »)

## Technical Details

**Files to create/modify:**
- `app/r/[slug]/components/contact-capture.tsx`
- `app/r/[slug]/actions.ts` — action `saveContact`

## Acceptance Criteria

- [ ] Un contact soumis avec consentement apparaît en DB avec `consentAt`
- [ ] Sans case cochée, la soumission est refusée
- [ ] Un doublon (même téléphone, même commerce) ne crée pas de 2ᵉ ligne
- [ ] Le funnel reste fluide : la capture n'ajoute aucune friction avant la redirection Google

## Notes

⚠️ Ordre du flux : la redirection Google passe TOUJOURS en premier (c'est la valeur cœur) — la capture contact vient après, jamais en barrage.
