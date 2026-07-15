# Guide — Installer le Pixel Meta (à faire soi-même)

> Le code du pixel est **déjà en place**. Il ne manque que l'**ID du pixel** à renseigner.
> Durée : ~15 min. Rien à coder.

## Ce qui est déjà fait côté code
- Chargement du pixel + **PageView** automatique sur toutes les pages (via le layout racine).
- **CompleteRegistration** envoyé à l'inscription réussie.
- **StartTrial** envoyé au retour d'un checkout Dodo réussi.
- Si la variable `NEXT_PUBLIC_META_PIXEL_ID` est absente, **aucun script ne se charge** (pas de pixel tant que tu n'as pas mis l'ID).

---

## Étape 1 — Ouvrir le Gestionnaire d'événements
- Va sur **[business.facebook.com](https://business.facebook.com)** (crée un compte Business si tu n'en as pas)
- Menu → **Gestionnaire d'événements** (Events Manager)

## Étape 2 — Créer le pixel
- **Connecter des données → Web** → **Pixel Meta** → *Connecter*
- Nom : **ScanNShine**
- Renseigne l'URL du site : `https://scannshine.com`
- → tu obtiens un **ID de pixel** (nombre à ~15 chiffres). C'est la seule valeur dont j'ai besoin.

## Étape 3 — Ajouter l'ID dans Vercel
**Vercel → projet scannshine → Settings → Environment Variables → Add** :

| Nom (exact) | Valeur | Environnement |
|---|---|---|
| `NEXT_PUBLIC_META_PIXEL_ID` | ton ID (ex. `123456789012345`) | Production (+ Preview si tu veux) |

⚠️ Le préfixe `NEXT_PUBLIC_` est obligatoire (variable côté navigateur). Respecte l'orthographe exacte.

## Étape 4 — Redéployer (indispensable)
Les variables `NEXT_PUBLIC_*` sont **figées au moment du build** : ajouter la variable ne suffit pas, il faut **redéployer**.
**Vercel → Deployments → dernier déploiement → «…» → Redeploy**.

## Étape 5 — Vérifier que ça marche
- Installe l'extension Chrome **Meta Pixel Helper**
- Ouvre **https://scannshine.com** → l'icône doit détecter le pixel **ScanNShine** et un événement **PageView**
- Dans **Events Manager**, l'onglet *Aperçu en temps réel (Test Events)* doit montrer PageView quand tu navigues
- Test des événements de conversion : fais une inscription de test → **CompleteRegistration** doit apparaître ; va au bout d'un checkout (test) → **StartTrial**

## Étape 6 — Vérifier le domaine (pour les pubs)
Toujours dans Events Manager → **Paramètres → Vérification du domaine** : vérifie `scannshine.com` (enregistrement DNS ou balise). Nécessaire pour attribuer correctement les conversions dans les campagnes.

---

## Correspondance événements ↔ tunnel (déjà codée)
| Événement Meta | Se déclenche quand | Sert à |
|---|---|---|
| `PageView` | chargement de n'importe quelle page | audience de retargeting, trafic |
| `CompleteRegistration` | inscription réussie | mesurer les inscrits |
| `StartTrial` | retour d'un paiement/essai Dodo réussi | **optimiser les pubs sur les essais démarrés** |

C'est `StartTrial` que tu voudras utiliser comme **événement d'optimisation** de tes campagnes Meta Ads (cf. `docs/meta-ads.md`), une fois qu'il y a assez de volume.

## ⚠️ Note conformité (RGPD)
Le pixel Meta dépose des traceurs publicitaires. En rigueur RGPD/CNIL, ces traceurs nécessitent le **consentement préalable** du visiteur (bandeau cookies). Aujourd'hui le site n'a **pas de bandeau de consentement cookies** : le pixel se charge dès la visite. Deux options à trancher plus tard :
- ajouter un **bandeau cookies** qui conditionne le chargement du pixel au consentement (le plus conforme) ;
- ou assumer le risque au démarrage et régulariser rapidement.
À prévoir avant de scaler les dépenses pub. (La politique de confidentialité mentionne déjà les cookies de mesure « sous réserve de consentement ».)

---

## Récap technique
Variable attendue par le code : `NEXT_PUBLIC_META_PIXEL_ID` (composant `src/features/analytics/meta-pixel.tsx`).
Événements : `PageView` (auto), `CompleteRegistration` (signup), `StartTrial` (retour checkout Dodo).
Tu me transmets juste l'**ID** si tu préfères que je le mette en config ; sinon suis les étapes 3-4 toi-même dans Vercel.
