---
project_id: avis-google
created: 2026-07-27
status: draft
---

# Meta Ads — ScanNShine, la plaquette avis Google (4 990 XPF, paiement unique)

Kit créatif complet pour le **produit vendu sur la LP principale** `/` : la plaquette
NFC/QR ScanNShine qui transforme les clients contents en avis Google, en **paiement
unique de 4 990 XPF**. Contient, pour chaque annonce : la copy prête à coller
(primary text long + 3 headlines + description) **et** les prompts à coller dans
**ChatGPT / GPT Image**.

> **Modèle de vente réel** : lead-gen, pas e-commerce. Formulaire `/commander` → on
> rappelle → **livraison en main propre à Tahiti → réglée à la livraison, testée
> devant le client**. Aucun paiement en ligne, aucun abonnement, aucun essai.
>
> ⚠️ Ne pas confondre avec `docs/meta-ads-guide-visibilite.md` (guide PDF 2 990 XPF).
> Ce fichier **remplace** le cadrage « abonnement 3 990 XPF/mois » des anciens
> `meta-ads.md` / `prompts-visuels-ia.md`, obsolète depuis le pivot vers la plaque
> one-shot. Les **angles** de `meta-ads.md` restent valides ; seule la couche
> **offre + CTA + objectif de campagne** change (corrigée ici).

---

## 0. Rappel produit & cible

- **Produit** : plaquette NFC/QR permanente posée en caisse/comptoir → le client
  approche son téléphone et laisse son avis Google en 30 s ; l'insatisfait est routé
  vers un retour privé (le lien Google reste toujours visible — conformité UGC
  Google, pas de review gating). **Posée en 2 minutes, sans site, sans technique.**
- **Prix** : **4 990 XPF, paiement unique, sans abonnement.**
- **Mécanisme de vente** : formulaire `/commander` (nom, vini, commune, adresse) →
  **on rappelle** pour vérifier la fiche Google → **livraison en main propre** →
  **réglée à la livraison, testée devant le client**. Aucun paiement en ligne.
- **Landing** : `/` (principale, mobile-first) → `/commander`.
- **Cible** : le **gérant de TPE du fenua avec du passage** — snack/roulotte/resto,
  coiffure/institut, boutique/artisan, garage, pension/activité touristique.
- **Message central (marketing.md)** : « Vos clients contents partent sans rien
  écrire. Vos clients fâchés, eux, laissent un avis. On inverse ça. »
- **Diagnostic copy** : prospect **niveau 2** (conscient du problème) · marché
  **stade 1-2** (vierge) → accroches simples et directes.
- **Registre** : **vouvoiement**. Zéro jargon. XPF. Ancrage fenua.
- **Réassurance clé à faire passer** (c'est l'avantage local vs tout achat en ligne) :
  **on vous rappelle, on vient vous la poser, vous réglez seulement à la livraison
  une fois testée devant vous.** Zéro risque, zéro avance.

---

## 1. Règles communes aux prompts GPT Image

Reprises de `prompts-visuels-ia.md` :

1. **Formats** : carré 1024×1024 (feed 1:1) + variante portrait 1024×1536 (→ 9:16).
   Terminer par « Format carré 1:1 » / « Format portrait vertical ».
2. **Pas de texte dans l'image** : accents français ratés. Texte (hook + « 4 990 XPF »
   + « livrée et testée devant vous ») ajouté après, dans la charte.
3. **Le QR généré ne scanne jamais** : « motif QR générique », remplacé par le vrai
   QR (`/r/demo-snack`) par compositing.
4. **Zéro logo de marque** (Google, Maps, Meta…) : risque de refus Meta. Ne jamais
   reproduire l'interface Google Maps.
5. **Esthétique smartphone, pas stock photo** (« photo prise au smartphone,
   légèrement imparfaite »).
6. **Vérifier mains/visages** ; garder 2-4 variations propres.

---

## 2. Les 5 annonces (copy complète + prompts visuels)

Ordre = priorité de test pour du **froid** (sauf Ad 4, taillée pour le retargeting).
Chaque annonce attaque **un seul nerf émotionnel**.

---

### Ad 1 — « L'injustice silencieuse » (douleur n°1, message central) — priorité n°1

*Lead : Problème-Solution. Le cœur du positionnement.*

**Primary text (long) :**

> Vos clients contents repartent le sourire aux lèvres… et ne laissent jamais
> d'avis. Vos clients fâchés, eux, trouvent toujours cinq minutes pour l'écrire
> sur Google.
>
> Résultat : votre fiche ne raconte pas la vérité sur votre commerce. Elle donne
> une image plus terne que la réalité — et ce sont vos futurs clients qui la voient
> en premier, avant même de vous connaître.
>
> ScanNShine inverse ça. Une plaquette posée en caisse : le client approche son
> téléphone et laisse son avis Google en 30 secondes, au moment où il est le plus
> content. Sans que vous ayez à le demander.
>
> Posée en 2 minutes, sans site internet ni compétence technique.
>
> 4 990 XPF, paiement unique. On vous rappelle, on vient vous la poser, et vous la
> testez avant de régler.

**Headlines (3) :** « Vos clients contents, enfin visibles » · « La plaquette qui remplit votre fiche Google » · « Plus d'avis, sans rien demander »
**Description :** 4 990 XPF · paiement unique
**CTA bouton :** En savoir plus

**Prompt visuel GPT Image (voir aussi A1-A4 dans `prompts-visuels-ia.md`) :**
> Photo réaliste prise au smartphone, point de vue d'un client debout devant la
> caisse d'un petit snack de Polynésie française. Sur le comptoir en bois clair
> légèrement usé, une petite plaquette de table blanche et propre présente un QR code
> générique (noir sur blanc, sans texte). Autour : une caisse simple, un présentoir
> de bonbons flou, nappe à motifs polynésiens. Lumière naturelle douce de fin
> d'après-midi. Profondeur de champ courte, focus net sur la plaquette. Légère
> imperfection de cadrage comme une vraie photo de téléphone. Aucun texte, aucun
> logo. Format carré 1:1.

---

### Ad 2 — « Le concurrent mieux noté » (peur de perdre + statut)

*Lead : Problème-Solution. L'argument touriste, très fort pour du froid.*

**Primary text (long) :**

> Un touriste ouvre Google Maps. Il compare deux snacks en trente secondes. Il
> choisit celui qui a 200 avis — pas le vôtre, qui en a 12.
>
> Même si le vôtre est meilleur. Même si vous cuisinez mieux, servez mieux,
> accueillez mieux. Ce n'est pas une question de qualité. C'est une question d'avis
> récents.
>
> ScanNShine met en caisse une plaquette qui transforme vos vrais clients contents
> en avis Google, semaine après semaine. Vous rattrapez votre retard, puis vous
> passez devant — auprès des touristes comme des locaux.
>
> 4 990 XPF, paiement unique — livrée et testée devant vous, réglée à la livraison.

**Headlines (3) :** « Le mieux noté gagne le client » · « Rattrapez votre concurrent sur Google » · « Les touristes choisissent sur Maps »
**Description :** 4 990 XPF · livrée en main propre
**CTA bouton :** En savoir plus

**Prompt visuel GPT Image (voir aussi B1-B2) :**
> Photo réaliste au smartphone : deux petits snacks polynésiens voisins dans la même
> rue, vus de face depuis le trottoir d'en face. Celui de gauche vide, rideau à
> moitié tiré. Celui de droite avec une file de cinq clients qui attendent,
> touristes et locaux mélangés. Même architecture simple, tôle et bois peint de
> couleurs vives. Lumière de fin de matinée, ciel tropical. Composition symétrique
> qui invite à comparer. Aucune enseigne lisible, aucun texte, aucun logo.
> Format carré 1:1.

---

### Ad 3 — « Ça travaille tout seul » (temps + contrôle)

*Lead : Problème-Solution. Désamorce la gêne de demander un avis.*

**Primary text (long) :**

> Demander un avis à un client, de vive voix, c'est gênant. Alors on ne le fait pas.
> Et même quand le client dit « oui, oui, je le ferai »… il oublie dix minutes plus
> tard, dans sa voiture.
>
> La plaquette ScanNShine, elle, ne dort jamais et n'a jamais honte de demander.
> Elle est en caisse : le client approche son téléphone, note, c'est fait.
>
> Vous, vous voyez vos nouveaux avis arriver, semaine après semaine. Aucune
> installation, aucun site web, aucun abonnement.
>
> Une plaquette, un paiement unique de 4 990 XPF, et votre fiche Google monte toute
> seule.

**Headlines (3) :** « L'avis Google se demande tout seul » · « En caisse, ça tourne sans vous » · « Posée en 2 minutes, chrono »
**Description :** 4 990 XPF · sans abonnement
**CTA bouton :** En savoir plus

**Prompt visuel GPT Image (voir aussi C1-C3) :**
> Photo réaliste au smartphone : scène animée dans un snack polynésien à l'heure du
> déjeuner. Au premier plan net : la plaquette QR blanche générique sur le comptoir.
> En arrière-plan flou : le patron en action, plusieurs assiettes en main, clients
> attablés. Contraste voulu entre la plaquette immobile et l'agitation derrière.
> Lumière naturelle, couleurs vives, ambiance chaleureuse de service. Aucun texte,
> aucun logo. Format carré 1:1.

---

### Ad 4 — « Livrée, testée, réglée sur place » (offre / zéro risque) — RETARGETING + froid tiède

*Lead : Offre. La réassurance locale comme accroche — l'anti-arnaque, l'argument qui
convertit le sceptique.*

**Primary text (long) :**

> Pas de paiement en ligne. Pas d'abonnement. Pas de piège.
>
> Vous commandez votre plaquette ScanNShine, on vous rappelle pour vérifier votre
> fiche Google avec vous, puis on vient vous la poser en main propre — et vous la
> testez devant nous avant de régler.
>
> Si elle ne marche pas sous vos yeux, vous ne payez pas. C'est aussi simple que ça.
>
> 4 990 XPF, une fois, et elle travaille pour votre fiche Google tous les jours.
> Pensée et livrée par des gens du fenua.

**Headlines (3) :** « Livrée et testée devant vous » · « Vous payez à la livraison, pas avant » · « 4 990 XPF, une fois, sans abonnement »
**Description :** Réglé à la livraison · Sans engagement
**CTA bouton :** En savoir plus

**Prompt visuel GPT Image (la remise en main propre — confiance locale) :**
> Photo réaliste prise au smartphone : sur le comptoir d'un petit commerce
> polynésien, une personne pose une petite plaquette de table blanche et soignée
> (motif QR générique, sans texte) près de la caisse, tandis que le gérant, souriant
> et confiant, approche son téléphone pour la tester. Ambiance chaleureuse et locale,
> sentiment de confiance et de proximité. Lumière naturelle douce. Aucun texte
> lisible, aucun logo. Format portrait vertical.

---

### Ad 5 — « Le retour privé qui sauve la note » (peur, à manier honnêtement)

*Lead : Problème-Solution. Protection réputation — sans jamais promettre de filtrer.*

**Primary text (long) :**

> Un souci pendant le service. Le client ne vous dit rien… mais il sort son
> téléphone sur le parking pour l'écrire sur votre fiche Google, devant tout le
> monde.
>
> Avec ScanNShine, ce client a d'abord un moyen simple de vous écrire en privé —
> vous réglez le problème directement avec lui, avant qu'il ne devienne un avis
> public. Et le lien Google reste ouvert à tous : rien n'est filtré, rien n'est
> caché.
>
> Vous protégez votre réputation sans jamais tricher.
>
> 4 990 XPF, paiement unique, livrée et posée chez vous.

**Headlines (3) :** « Réglez les soucis en privé, d'abord » · « Écoutez vos clients avant Google » · « Le retour privé qui sauve la note »
**Description :** Conforme aux règles Google
**CTA bouton :** En savoir plus

**Prompt visuel GPT Image (voir aussi D1-D2) :**
> Photo réaliste au smartphone : gros plan sur les mains d'un commerçant derrière
> son comptoir, tenant son téléphone, en train de lire calmement un message. Posture
> attentive mais sereine, pas de stress. Arrière-plan flou : intérieur de snack
> polynésien, plaquette QR blanche générique sur le comptoir. Lumière naturelle
> douce. Écran montrant une interface de messagerie générique floue, non lisible.
> Aucun texte lisible, aucun logo. Format carré 1:1.

> ⚠️ **Contrainte anti-review-gating (non négociable)** : garder impérativement la
> phrase « le lien Google reste ouvert à tous » (ou équivalent). On ne promet
> **jamais** de bloquer/filtrer les avis négatifs — promesse contraire = compte
> publicitaire banni + non-conformité UGC Google.

---

## 3. Workflow après génération

1. Générer 2-4 variations par prompt, ne garder que les images propres.
2. Compositer le **vrai QR** (`/r/demo-snack`) par-dessus le QR générique.
3. Ajouter le **texte** (hook + « 4 990 XPF · paiement unique » + « livrée et testée
   devant vous ») dans la charte ScanNShine (bleu primary `#0ea5e9`), en 1:1 et 9:16.
4. Nommer les fichiers, ex. `sns-ad1-injustice-ia-1-1x1.png` / `-9x16.png` dans
   `docs/ads-creatives/`.
5. **Priorité créa** : Ad 1 en **vidéo** (« le scan en caisse ») — le format vidéo
   natif est le plus performant en PF.

---

## 4. Objectif de campagne, UTM & test

Structure de `meta-ads.md` : marché micro (~190 k utilisateurs FB PF) → **1 ad set
broad**, on teste **au niveau des annonces**.

**⚠️ Objectif de campagne = « Prospects » (lead-gen), PAS « Ventes/Conversions ».**
La vente se conclut au téléphone + à la livraison, pas en ligne. Deux options :
- **Formulaire instantané Meta (Instant Form)** — recommandé : friction minimale,
  coût par lead plus bas, pas besoin de pixel LP. Champs courts (commerce, vini,
  commune) ; on récupère le reste au téléphone.
- **Trafic vers `/commander`** — poser l'événement **`Lead`** à la soumission du
  formulaire (le CRM email + Airtable + Google Sheet est déjà en place).

| Annonce | Moteur | UTM `utm_content` | Usage |
|---|---|---|---|
| Ad 1 — Injustice silencieuse | Douleur n°1 | `angle-a-injustice` | Froid — vague 1 (vidéo) |
| Ad 2 — Concurrent mieux noté | Peur / statut | `angle-b-concurrent` | Froid — vague 1 |
| Ad 3 — Ça travaille tout seul | Temps / contrôle | `angle-c-toutseul` | Froid — vague 2 |
| Ad 4 — Livrée & testée sur place | Offre / zéro risque | `angle-e-livraison` | **Retargeting** + tiède |
| Ad 5 — Retour privé | Réputation | `angle-d-negatif` | Froid — vague 2 |

**Lien type (si trafic vers la LP) :**
```
https://scannshine.com/?utm_source=facebook&utm_medium=paid&utm_campaign=sns-plaque&utm_content=angle-a-injustice
```

**Plan de test (Hopkins) :**
- Vague 1 (froid) : Ad 1 (vidéo) vs Ad 2, variable = l'accroche. On garde le meilleur
  **CTR lien**.
- Vague 2 : Ad 3, Ad 5. Ad 4 en **retargeting** des visiteurs LP + vues vidéo.
- Coupe : CTR lien < 1 % après ~4 000 impressions → couper.

**Mesure (produit one-shot, marge de contribution ≈ 3 190 XPF) :**
- **Coût par lead (CPL)** — cible **≤ 1 600 XPF**.
- **Taux de closing** lead → livraison réglée — cible **≥ 55 %** (le vrai levier de
  rentabilité).
- **Coût par vente** — cible **≤ 3 190 XPF** (au-delà, la vente est en perte : pas
  de LTV récurrente pour amortir).

> Rappel stratégique : le one-shot à 4 990 XPF n'a **aucune LTV** pour absorber un
> CAC élevé. La plaque est **plus rentable en upsell chaud** (acheteurs du guide via
> `/guidepremium/merci`, contacts CRM) qu'en froid pur. Voir le modèle de
> rentabilité dédié.
