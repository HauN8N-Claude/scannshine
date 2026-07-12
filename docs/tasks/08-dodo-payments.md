---
task_id: 08
title: Intégration Dodo Payments (checkout, webhooks, gating)
status: pending
priority: P0
estimated_hours: 4
prd_features: ["Self-service complet (essai 7j + abonnement)"]
archi_sections: ["Intégration Dodo Payments", "ADR-001", "ADR-002"]
depends_on: [07]
---

# Task 08: Intégration Dodo Payments (checkout, webhooks, gating)

## Context

La pièce custom principale : Dodo Payments (Merchant of Record, marchands PF supportés) remplace le Stripe de NOW.TS. Abonnement 33,50 €/mois (affiché 3 990 XPF), essai 7 jours natif, activation 100 % automatique.

## Requirements

- [ ] Créer le produit d'abonnement dans le dashboard Dodo (33,50 €/mois, trial 7 jours) — mode test d'abord
- [ ] `src/lib/dodo.ts` : client SDK (`dodopayments` npm + adaptateur `@dodopayments/nextjs` si disponible)
- [ ] Checkout : depuis l'écran 3 de l'onboarding → session de checkout Dodo (customer lié au user) → retour sur `/dashboard?welcome=1`
- [ ] Webhook `app/api/webhooks/dodo/route.ts` : **vérification de signature + idempotence** (event id déjà traité → 200 direct). Mapper : `subscription.active`→TRIALING/ACTIVE, `payment.succeeded`→ACTIVE, `payment.failed`→PAST_DUE, `subscription.cancelled`→CANCELLED. Stocker `dodoCustomerId`, `dodoSubscriptionId`, `trialEndsAt`
- [ ] Gating : layout `(dashboard)` vérifie `subscriptionStatus ∈ {TRIALING, ACTIVE}` ; PAST_DUE/CANCELLED → écran « réactiver » avec lien portail Dodo. **`/r/{slug}` reste servi pendant 7 jours de grâce** (cf. archi)
- [ ] Settings/billing : statut, prochaine échéance, lien vers le portail client Dodo (gestion CB, annulation)
- [ ] Vérifier l'affichage devise : si XPF impossible chez Dodo, afficher « 3 990 XPF ≈ 33,50 €, débité en euros » au checkout

## Technical Details

**Files to create/modify:**
- `src/lib/dodo.ts`, `app/api/webhooks/dodo/route.ts`
- `app/(dashboard)/settings/billing/` — page abonnement
- Env : `DODO_API_KEY`, `DODO_WEBHOOK_SECRET`

S'appuyer sur la structure du handler Stripe NOW.TS mis de côté en task 01 (`/_reference`).

## Acceptance Criteria

- [ ] Checkout test complet : CB test → webhook reçu → `subscriptionStatus = TRIALING` en DB sans intervention manuelle
- [ ] Webhook rejoué (retry) → aucun double traitement
- [ ] Compte CANCELLED → dashboard bloqué mais `/r/{slug}` répond encore pendant la grâce
- [ ] Annulation depuis le portail Dodo → statut mis à jour via webhook

## Notes

Consulter la doc Dodo à jour au moment de l'implémentation (noms d'events exacts). Tester les webhooks en local via le CLI/tunnel Dodo ou ngrok.
