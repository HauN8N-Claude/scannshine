# Guide — Passer Dodo Payments en LIVE (à faire soi-même)

> À suivre **une fois le KYC Dodo validé**. Objectif : activer les vrais paiements en production.
> Durée : ~20 min. Rien à coder — tout se passe dans les dashboards Dodo et Vercel.

## Prérequis
- KYC Dodo **validé** (le compte peut basculer en mode Live)
- Accès au **dashboard Vercel** du projet `scannshine`
- Le mode Test a déjà été validé (tunnel de paiement testé avec la carte `4242 4242 4242 4242`)

---

## Étape 1 — Basculer Dodo en mode Live
Dans le dashboard Dodo, en haut, bascule l'interrupteur **Test → Live**.
⚠️ Les objets créés en mode Test (produit, clé, webhook) **n'existent pas** en Live : il faut les **recréer** en Live. C'est normal.

## Étape 2 — Recréer le produit (en Live)
**Products → Create product** :
- Type : **Subscription**
- Prix : **33.50** — devise **EUR** (⚠️ jamais USD)
- Billing period : **Monthly**
- **Trial period : 7 days**
- Nom : **ScanNShine — Abonnement mensuel**
- → copie le **Product ID** (`pdt_...`)

## Étape 3 — Créer la clé API (en Live)
**Settings → API Keys → Create** → copie la clé (`dodo_live_...`)
🔒 Elle ne s'affiche qu'une fois : copie-la immédiatement.

## Étape 4 — Créer le webhook (en Live)
**Settings → Webhooks → Add endpoint** :
- URL : **`https://scannshine.com/api/webhooks/dodo`**
- Événements : la famille **`subscription.*`** (active, renewed, cancelled, on_hold) et **`payment.*`** (succeeded, failed)
- → copie le **Signing Secret** (`whsec_...`)

## Étape 5 — Vérifier les infos de facturation
**Settings → Business** : nom **ScanNShine**, entité **PolynetIA**, adresse **BP 380968, 98718 Punaauia, Polynésie française**.
C'est ce qui apparaît sur les factures envoyées aux clients.

## Étape 6 — Mettre les clés dans Vercel
**Vercel → projet scannshine → Settings → Environment Variables.**
Pour chaque variable ci-dessous : si elle existe déjà (valeurs test), **modifie-la** ; sinon **ajoute-la**. Environnement : **Production** (coche au moins Production).

| Nom (exact) | Valeur |
|---|---|
| `DODO_PAYMENTS_API_KEY` | `dodo_live_...` (étape 3) |
| `DODO_PRODUCT_ID` | `pdt_...` (étape 2) |
| `DODO_PAYMENTS_WEBHOOK_KEY` | `whsec_...` (étape 4) |
| `DODO_PAYMENTS_ENVIRONMENT` | `live_mode` |

⚠️ Respecte l'orthographe exacte des noms (sensibles à la casse). `DODO_PAYMENTS_ENVIRONMENT` doit valoir précisément **`live_mode`** (et non « live »).

## Étape 7 — Redéployer
Les variables d'environnement ne s'appliquent qu'au **prochain déploiement**.
**Vercel → Deployments → dernier déploiement → menu «…» → Redeploy** (décoche « use existing build cache » si proposé).

## Étape 8 — Test réel de bout en bout
Une fois redéployé :
1. Inscris-toi avec un **email de test à toi** sur scannshine.com
2. Va jusqu'au checkout et paie avec une **vraie carte** (ce sera un vrai débit de 0 € pendant l'essai, puis 33,50 € à J+7 — ou annule avant)
3. Vérifie : retour sur le tableau de bord, statut **« Abonnement actif »** dans « Mon abonnement »
4. Dans **Dodo → Payments/Subscriptions**, l'abonnement doit apparaître
5. Dans **Dodo → Webhooks**, l'endpoint doit montrer des livraisons en **succès (2xx)**
6. Vérifie la **facture** reçue par email
7. Teste l'**annulation** depuis « Mon abonnement » → statut passe à « Annulé »

---

## Dépannage rapide
- **Le statut ne passe pas à « actif » après paiement** → le webhook n'arrive pas. Vérifie dans Dodo → Webhooks que l'URL est exacte (`https://scannshine.com/api/webhooks/dodo`) et que les livraisons sont en 2xx. Si 401/403 : le `DODO_PAYMENTS_WEBHOOK_KEY` dans Vercel ne correspond pas au Signing Secret Live.
- **« clé manquante » / erreur au checkout** → une des 4 variables est absente/mal orthographiée dans Vercel, ou le projet n'a pas été redéployé après l'ajout.
- **Montant en USD au lieu d'EUR** → le produit a été créé en USD ; recrée-le en EUR.
- **Toujours en test** → `DODO_PAYMENTS_ENVIRONMENT` n'est pas `live_mode`, ou la clé est encore `dodo_test_...`.

## Variables (récap technique — noms attendus par le code)
`DODO_PAYMENTS_API_KEY`, `DODO_PRODUCT_ID`, `DODO_PAYMENTS_WEBHOOK_KEY`, `DODO_PAYMENTS_ENVIRONMENT` (`test_mode` | `live_mode`).
Webhook : `POST /api/webhooks/dodo`. Retour post-paiement géré par le code (`/onboarding?paiement=confirmation`), rien à configurer côté Dodo pour ça.
