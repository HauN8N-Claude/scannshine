# Guide des actions manuelles — ScanNShine

> Les actions que **toi seul** peux faire (créations de comptes, KYC, DNS, paiements).
> Tout le reste (configuration, code, tests) est fait par Claude dès que tu transmets les clés.
> Ordre recommandé : suivre les étapes dans l'ordre. Temps total estimé : **2 à 3 h étalées** (les validations KYC/DNS ont des délais d'attente).

---

## Étape 1 — Dodo Payments (paiements) · ~30 min + délai KYC

**Pourquoi :** c'est le seul morceau du tunnel jamais testé. Sans ces clés, pas de checkout.

1. Va sur **[dodopayments.com](https://dodopayments.com)** → *Sign up* (utilise `contact@polynetia.com`)
2. Renseigne ton business : la **Polynésie française est acceptée** (vérifié) — prépare :
   - Pièce d'identité
   - Justificatif d'activité (n° Tahiti / patente)
   - RIB du compte qui recevra les payouts
3. ⚠️ Le **mode test est utilisable immédiatement**, sans attendre la validation KYC (le KYC ne bloque que le mode live)
4. Dans le dashboard Dodo (mode **Test**) :
   - **Products → Create product** : type *Subscription*, prix **33,50 EUR / mois**, *Trial Period Days* = **7**, nom « ScanNShine — Abonnement mensuel » → copie le **Product ID**
   - **Settings → API Keys → Create** : copie la clé (elle commence par `dodo_test_...`)
   - **Settings → Webhooks → Add endpoint** : mets une URL provisoire (ex. `https://exemple.com/api/webhooks/dodo` — on la changera au moment du test) → copie le **Signing Secret**
5. **Transmets-moi les 3 valeurs** :
   ```
   DODO_PAYMENTS_API_KEY = dodo_test_xxx
   DODO_PRODUCT_ID       = prod_xxx
   DODO_PAYMENTS_WEBHOOK_KEY = whsec_xxx
   ```
6. Plus tard (avant le lancement public) : soumets le **KYC** pour débloquer le mode live — compte quelques jours de délai.

**Carte de test** pour les paiements fictifs : `4242 4242 4242 4242`, exp `06/32`, CVC `123`.

---

## Étape 2 — Nom de domaine · ~15 min · ~15–20 €/an

**Pourquoi :** requis pour les emails (Resend), le déploiement et le QR définitif.

1. Choisis et achète le domaine (ex. `scannshine.com`) chez **[Namecheap](https://namecheap.com)**, **[OVH](https://ovh.com)** ou **[Cloudflare](https://cloudflare.com)** (Cloudflare = prix coûtant, recommandé)
2. Ne configure rien d'autre pour l'instant — les enregistrements DNS viendront aux étapes 3 et 6
3. **Dis-moi simplement quel domaine tu as pris** (si différent de scannshine.com, je mets à jour `site-config.ts`)

> 💡 Vérifie aussi la dispo du `.pf` sur [domaines.pf](https://www.domaines.pf) si tu veux une variante locale (plus cher, ~6 000 XPF/an) — optionnel, redirection possible plus tard.

---

## Étape 3 — Resend (emails transactionnels) · ~15 min + délai DNS

**Pourquoi :** sans ça, les emails (feedback privé au gérant, reset de mot de passe…) ne partent pas réellement.

1. Crée un compte sur **[resend.com](https://resend.com)** (gratuit : 3 000 emails/mois)
2. **Domains → Add domain** : entre ton domaine → Resend affiche **3 enregistrements DNS** (SPF, DKIM…)
3. Ajoute ces enregistrements dans la zone DNS de ton registrar (étape 2) — propagation : de 10 min à quelques heures
4. Quand le domaine passe en **Verified** : **API Keys → Create** → copie la clé `re_xxx`
5. **Transmets-moi** :
   ```
   RESEND_API_KEY = re_xxx
   EMAIL_FROM     = ScanNShine <contact@tondomaine.com>
   ```

---

## Étape 4 — Neon (base de données production) · ~10 min

1. Compte sur **[neon.tech](https://neon.tech)** (login GitHub, gratuit jusqu'à ~10 GB)
2. **Create project** : nom `scannshine`, région **AWS us-west-2 (Oregon)** (la plus proche de la Polynésie) — ou Sydney si proposée
3. Dans le dashboard : **Connection string** → copie les deux variantes (pooled et unpooled)
4. **Transmets-moi** :
   ```
   DATABASE_URL          = postgres://... (pooled)
   DATABASE_URL_UNPOOLED = postgres://... (direct)
   ```
5. ⚠️ **Migration initiale** (règle du projet : c'est toi qui lances les migrations). Quand je te le dirai, exécute dans le dossier `scannshine` :
   ```bash
   npx prisma migrate dev --name init   # génère + applique la migration
   ```
   (je préparerai tout, tu n'auras que cette commande à lancer)

---

## Étape 5 — Upstash (Redis production) · ~5 min

1. Compte sur **[upstash.com](https://upstash.com)** (login GitHub, gratuit : 10 000 commandes/jour)
2. **Create database** : type *Regional*, région **us-west-1/2** (cohérent avec Neon)
3. Copie l'URL **`rediss://...`** (onglet *Details*, format ioredis/TLS)
4. **Transmets-moi** : `REDIS_URL = rediss://...`

---

## Étape 6 — Vercel (hébergement) · ~20 min

1. Compte sur **[vercel.com](https://vercel.com)** avec ton compte **GitHub HauN8N-Claude**
2. **Add New → Project → Import** le repo `scannshine` — ⚠️ ne clique PAS encore *Deploy* : ajoute d'abord les variables d'environnement (je te fournirai la liste exacte prête à coller quand toutes les clés seront réunies)
3. Après le premier déploiement : **Storage → Create → Blob** → le `BLOB_READ_WRITE_TOKEN` est injecté automatiquement (rien à copier)
4. **Settings → Domains → Add** : ton domaine → Vercel affiche les DNS à mettre chez ton registrar (A record + CNAME)
5. Une fois en ligne : dans **Dodo → Webhooks**, remplace l'URL par `https://tondomaine.com/api/webhooks/dodo`

---

## Étape 7 — Meta Pixel (publicité) · ~10 min · optionnel avant le lancement des ads

1. **[business.facebook.com](https://business.facebook.com)** → *Events Manager* → **Connecter une source de données → Web → Pixel Meta**
2. Nomme-le `ScanNShine` → copie l'**ID du pixel** (chiffre à ~15 digits)
3. **Transmets-moi** : `NEXT_PUBLIC_META_PIXEL_ID = 123456789012345`
   (le code est déjà en place — PageView, CompleteRegistration, StartTrial s'activeront tout seuls)

---

## Étape 8 — Côté business (en parallèle, sans ordinateur)

- **5 entretiens Mom Test** avec des gérants (snack, salon, garage…) — question clé : *« Comment tu gères tes avis Google aujourd'hui ? »* (jamais « tu achèterais ? »). Les verbatims serviront pour la landing et les ads.
- **Vérifie tes obligations locales** : patente à jour couvrant l'activité de service numérique ; relis les pages `/legal/terms` et `/legal/privacy` (encore en anglais boilerplate — je les traduirai/adapterai, mais la responsabilité juridique t'appartient : fais-les relire si possible).
- **Prépare la matière créa** : 10-15 photos/vidéos smartphone dans un vrai commerce partenaire (QR en caisse, client qui scanne, gérant souriant) — nécessaires pour les ads Meta et le contenu organique (cf. `docs/meta-ads.md` et `docs/contenu-organique.md`).

---

## 📋 Récapitulatif — ce que tu me transmets au fur et à mesure

| # | Clé | Source | Bloque quoi |
|---|-----|--------|-------------|
| 1 | `DODO_PAYMENTS_API_KEY` (test) | Dodo → API Keys | Test du paiement |
| 1 | `DODO_PRODUCT_ID` | Dodo → Products | Test du paiement |
| 1 | `DODO_PAYMENTS_WEBHOOK_KEY` | Dodo → Webhooks | Test du paiement |
| 2 | nom de domaine choisi | registrar | Emails + prod |
| 3 | `RESEND_API_KEY` + `EMAIL_FROM` | Resend | Emails réels |
| 4 | `DATABASE_URL` (+ unpooled) | Neon | Déploiement |
| 5 | `REDIS_URL` | Upstash | Déploiement |
| 6 | (rien — Blob auto) | Vercel | Upload logos |
| 7 | `NEXT_PUBLIC_META_PIXEL_ID` | Meta Business | Tracking ads |

**Le chemin critique : Étape 1 (Dodo test) → on teste le tunnel de paiement complet en local → Étapes 2-6 → mise en ligne → Dodo live après KYC → premiers clients.**
