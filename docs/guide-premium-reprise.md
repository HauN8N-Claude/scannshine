# Reprise — Tunnel « Guide Premium » (/guidepremium)

> Fichier mémoire pour reprendre le travail là où on s'est arrêté.
> Dernière mise à jour : session du 2026-07-26.

## 🎯 Objectif

Vendre un **ebook / guide low-ticket à 1 990 XPF** (paiement **unique**) aux
commerces de Polynésie. Ce guide est un **produit d'appel (tripwire)** dont la
vraie valeur est de :

1. **Fabriquer une liste de prospects ultra-qualifiés** (des commerçants qui
   viennent de payer pour ce sujet) — stockés dans un CRM Google Sheet.
2. Les faire **monter vers la plaque ScanNShine (4 990 XPF)** via un upsell.

Deux mécanismes d'upsell demandés par le client :

- **Page d'upsell** après achat → redirige vers le formulaire `/commander`.
- **Stockage CRM Google Sheet** (comme les leads du formulaire) → relance à froid.

## 💳 Décisions actées

- **Encaissement : Dodo Payments** (pas Gumroad). Raison : Dodo est Merchant of
  Record qui **verse en Polynésie** (Gumroad = payout PF non confirmé, PayPal
  supprimé). Dodo garde aussi le lead dans notre funnel (return_url + webhook).
- **Route** : `/guidepremium` (LP) + `/guidepremium/merci` (upsell).
- **Prix affiché** : **1 990 XPF uniquement** (pas d'euro sur la page).
- Domaine rattaché à scannshine.com (même projet Next.js / même déploiement).

## ✅ Ce qui est FAIT (code, déployé)

| Élément | Fichier |
|---|---|
| Page de vente (charte ScanNShine, désirs du marché) | `app/guidepremium/page.tsx` |
| Section « Ce guide est fait pour vous si… » (persona) | idem (const `FOR_YOU_IF`) |
| Bouton d'achat → checkout Dodo (client, anti-double-clic) | `src/features/guide/guide-checkout-button.tsx` |
| Action checkout invité, paiement UNIQUE, `metadata.source=guide`, `return_url=/guidepremium/merci` | `src/features/guide/guide-checkout.action.ts` |
| Webhook `onPaymentSucceeded` → écrit l'acheteur dans le CRM Sheet dédié | `app/api/webhooks/dodo/route.ts` (fn `handleGuidePayment`) |
| Page d'upsell merci → `/commander` | `app/guidepremium/merci/page.tsx` |
| Variables d'env déclarées | `src/lib/env.ts` (`DODO_GUIDE_PRODUCT_ID`, `GSHEET_GUIDE_WEBHOOK_URL`) |

La page est en **`noindex`** (hors Google) tant que le produit n'est pas branché.

## ⏳ Ce qui RESTE à faire (manuel + à finaliser)

1. **Produit one-time Dodo** : ✅ **CRÉÉ** en test_mode →
   `DODO_GUIDE_PRODUCT_ID = pdt_0Nk4NJWZKB8gm67uxkWrM` (nom « Le Guide Premium »,
   16,90 € = 1 990 XPF, digital_products, taxe incluse).
   - ⏳ **Reste à poser cette valeur sur Vercel** (Production) + redéployer.
   - Vérifié : la session de checkout se crée et la page Dodo affiche bien
     « Le Guide Premium · €16.90 · Mode de test ».
   - Webhook Dodo déjà configuré → `https://scannshine.com/api/webhooks/dodo`
     (actif, reçoit tous les events dont `payment.succeeded`).
   - ⚠️ Compte Dodo actuellement en **test_mode** (clé test). Pour vendre en
     réel : produit + clé + `DODO_PAYMENTS_ENVIRONMENT=live_mode`.
2. **CRM Google Sheet du guide** :
   - Créer un **onglet séparé** « Guide — Acheteurs » dans le Sheet, avec un
     `doPost` Apps Script qui mappe : `date, name, email, amount, currency, paymentId, source, statut`.
   - Déployer en web app → poser la var Vercel **`GSHEET_GUIDE_WEBHOOK_URL`**
     (URL `/a/macros/polynetia.com/.../exec`, comme pour `GSHEET_WEBHOOK_URL`).
3. **Livraison de l'ebook** : NON encore implémentée. Aujourd'hui la page merci
   dit « vous allez recevoir le guide par email » mais **rien n'envoie le PDF**.
   À faire quand le PDF sera prêt (il est rédigé dans un autre chat / `docs/ebook`) :
   - Stocker le PDF (Blob, `BLOB_READ_WRITE_TOKEN` déjà configuré).
   - Envoyer un email (Resend, déjà configuré) avec lien de téléchargement signé,
     depuis le webhook `onPaymentSucceeded` (branche guide).
4. **Juridique** : ajouter au checkout / CGV la **renonciation au droit de
   rétractation 14 j** (contenu numérique livré immédiatement) — sinon
   remboursement exigible.
5. **Contenu** : les 6 bénéfices (`OUTCOMES`) et le titre « Le Guide Premium »
   sont provisoires → aligner sur les vrais chapitres du PDF.
6. **Passer la page en index** : dans `app/guidepremium/page.tsx`, `robots.index`
   `false → true` au lancement.
7. **Redéploiement** après pose des vars Vercel (une var n'est prise en compte
   qu'au déploiement suivant).

## 🔌 Variables d'environnement (Vercel Production)

| Var | Rôle | État |
|---|---|---|
| `DODO_PAYMENTS_API_KEY` | Client Dodo (partagé plaque + guide) | déjà là |
| `DODO_PAYMENTS_WEBHOOK_KEY` | Signature webhook Dodo | déjà là |
| `DODO_GUIDE_PRODUCT_ID` | Produit one-time du guide | **à créer + poser** |
| `GSHEET_GUIDE_WEBHOOK_URL` | Webhook Apps Script CRM guide | **à créer + poser** |

## 🧪 Comment tester (une fois les vars posées + redéployé)

1. `/guidepremium` → « Obtenir le guide » → doit rediriger vers le checkout Dodo.
2. Payer en mode test (carte 4242…) → retour sur `/guidepremium/merci` (upsell).
3. Vérifier la **nouvelle ligne dans l'onglet « Guide — Acheteurs »** du Sheet
   (source = « Guide Premium », statut « Nouveau »).
4. Vérifier que le webhook ne loggue pas d'erreur GSheet.
5. `/guidepremium/merci` → « Je veux la plaquette » → doit mener à `/commander`.

## ⚠️ Pièges connus

- Le webhook Dodo `onPaymentSucceeded` se déclenche aussi pour le **1er paiement
  d'un abonnement**. La branche guide ne s'exécute que si `metadata.source ===
  "guide"` → ne pas retirer ce garde-fou.
- Apps Script renvoie **toujours un 302** vers son URL `echo`, même en succès :
  ne juger l'échec que sur `response.ok` (pas sur `response.redirected`).
- `getServerUrl()` doit renvoyer l'apex `https://scannshine.com` en prod pour que
  le `return_url` soit correct.

## 🗺️ Résumé funnel

```
/guidepremium (page de vente, 1990 XPF)
   → bouton « Obtenir le guide » → checkout Dodo (invité, one-time)
      → paiement OK
         → return_url → /guidepremium/merci (UPSELL → /commander = plaque)
         → webhook onPaymentSucceeded → CRM Google Sheet « Guide — Acheteurs »
         → (À FAIRE) email de livraison du PDF
```

---

## 🔄 MàJ session 2026-07-27 (build avancé jusqu'au test)

**Fait (vérifié) :**
- Produit Dodo créé (test_mode) : `pdt_0Nk4NJWZKB8gm67uxkWrM` (16,90 €, one-time).
- Vercel Production : `DODO_GUIDE_PRODUCT_ID` **posé** + `GSHEET_GUIDE_WEBHOOK_URL` **posé** (webhook Apps Script du Sheet 1fCQ2PhE…) + redéployé.
- Bouton `/guidepremium` en prod → redirige bien vers le checkout Dodo (testé).
- Webhook Dodo → `https://scannshine.com/api/webhooks/dodo` (actif, tous events).
- Webhook CRM testé en direct (ligne écrite dans le Sheet).
- **Téléphone obligatoire** au checkout (`require_phone_number`) + capté (`customer.phone_number`) → écrit dans le CRM.
- Garde-fou webhook : achat guide détecté via `metadata.source=guide` OU produit guide dans le panier.

**Reste :**
- Mettre à jour le script Apps Script du Sheet guide pour ajouter la colonne **Téléphone** (ordre : Date, Nom, Téléphone, Email, Montant, Devise, Payment ID, Source, Statut).
- Faire 1 **achat test réel** (carte 4242) — l'automatisation du formulaire carte Dodo est impossible en headless (skeleton figé).
- Livraison du PDF (email + lien) — toujours à implémenter.
- Passer `robots.index` à true au lancement + passer Dodo en **live_mode** (produit + clé live) pour vendre en réel.
- Nettoyer les lignes de test dans le Sheet guide.

