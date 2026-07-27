---
project_id: avis-google
created: 2026-07-27
status: draft
---

# Meta Ads — ScanNShine, la plaquette avis Google (abonnement 3 990 XPF/mois)

Kit créatif complet pour la campagne du **produit principal** : la plaquette /
QR ScanNShine qui transforme les clients contents en avis Google. LP : `/`
(landing principale) → essai gratuit 7 jours → abonnement **3 990 XPF/mois**.
Contient, pour chaque annonce : la copy prête à coller (primary text long +
3 headlines + description) **et** les prompts à coller dans **ChatGPT / GPT Image**.

> Ce fichier **consolide et étoffe** `docs/meta-ads.md` (plan de campagne + 4 angles)
> et `docs/prompts-visuels-ia.md` (bibliothèque de 20+ prompts visuels) au format du
> kit ebook. Pour la stratégie de campagne détaillée (budget, structure, mesure),
> `meta-ads.md` reste la référence. Pour toutes les variations de visuels,
> `prompts-visuels-ia.md` reste la bibliothèque complète.
>
> ⚠️ Ne pas confondre avec `docs/meta-ads-guide-visibilite.md` : celui-là vend le
> **guide PDF à 2 990 XPF** (paiement unique). **Ici on vend l'abonnement 3 990 XPF/mois.**

---

## 0. Rappel produit & cible

- **Produit** : plaquette / QR permanent posé en caisse → le client scanne, laisse
  son avis Google en 30 s ; l'insatisfait est routé vers un retour privé (le lien
  Google reste toujours visible — conformité UGC Google, pas de review gating).
  Dashboard de pilotage. **Prêt en 10 minutes, sans site, sans technique.**
- **Prix** : **3 990 XPF/mois**, **essai gratuit 7 jours**, sans engagement.
- **Landing** : `/` (mobile-first, ~90 % du trafic mobile).
- **Cible** : le **gérant de TPE du fenua avec du passage** — snack/roulotte/resto,
  coiffure/institut, boutique/artisan, garage, pension/activité touristique.
- **Message central (marketing.md)** : « Vos clients contents partent sans rien
  écrire. Vos clients fâchés, eux, laissent un avis. On inverse ça. »
- **Diagnostic copy** : prospect **niveau 2** (conscient du problème : fiche à
  12 avis vs concurrent à 200) · marché **stade 1-2** (vierge) → accroches simples
  et directes.
- **Registre** : **vouvoiement** (aligné LP). Zéro jargon. XPF. Ancrage fenua.
- **Différence clé de copy vs le guide** : ici on vend un **outil qui fait le
  travail** (la plaquette en caisse), pas une méthode à appliquer soi-même.

---

## 1. Règles communes aux prompts GPT Image

Reprises de `prompts-visuels-ia.md` (règles éprouvées) :

1. **Formats** : générer le **carré 1024×1024** (feed 1:1) puis une variante
   **portrait 1024×1536** (à recadrer 9:16). Terminer par « Format carré 1:1 » /
   « Format portrait vertical ».
2. **Pas de texte dans l'image** : accents français ratés. Texte (hook + « Essai
   gratuit 7 jours » + prix) ajouté après, dans la charte.
3. **Le QR généré ne scanne jamais** : demander un « motif QR générique » et le
   remplacer par le vrai QR (`/r/demo-snack`) par compositing.
4. **Zéro logo de marque** (Google, Maps, Meta…) : risque de refus Meta. Ne jamais
   reproduire l'interface Google Maps — suggérer, pas copier.
5. **Esthétique smartphone, pas stock photo** : le contenu organique performe mieux
   en PF (« photo prise au smartphone, légèrement imparfaite »).
6. **Vérifier mains/visages** ; générer 2-4 variations, ne garder que les propres.

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
> Prêt en 10 minutes, sans site internet, sans compétence technique.
>
> 3 990 XPF/mois · Essai gratuit 7 jours · Sans engagement.

**Headlines (3) :** « Vos clients contents, enfin visibles » · « La plaquette qui remplit votre fiche Google » · « Plus d'avis, sans rien demander »
**Description :** Essai gratuit 7 jours · Sans engagement
**CTA bouton :** S'inscrire

**Prompt visuel GPT Image (voir aussi A1-A4 dans `prompts-visuels-ia.md`) :**
> Photo réaliste prise au smartphone, point de vue d'un client debout devant la
> caisse d'un petit snack de Polynésie française. Sur le comptoir en bois clair
> légèrement usé, un petit chevalet de table blanc et propre présente un QR code
> générique (noir sur blanc, sans texte). Autour : une caisse simple, un présentoir
> de bonbons flou, nappe à motifs polynésiens. Lumière naturelle douce de fin
> d'après-midi. Profondeur de champ courte, focus net sur le chevalet. Légère
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
> Prêt en 10 minutes, sans compétence technique.
>
> 3 990 XPF/mois · Essai gratuit 7 jours.

**Headlines (3) :** « Le mieux noté gagne le client » · « Rattrapez votre concurrent sur Google » · « Les touristes choisissent sur Maps »
**Description :** 3 990 XPF/mois · Prêt en 10 minutes
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
> Vous, vous suivez vos scans et vos nouveaux avis chaque semaine, depuis votre
> téléphone. Aucune installation, aucun site web. Juste votre fiche Google qui
> monte, toute seule.
>
> 3 990 XPF/mois · Essai gratuit 7 jours.

**Headlines (3) :** « L'avis Google se demande tout seul » · « En caisse, ça tourne sans vous » · « Prêt en 10 minutes, chrono »
**Description :** Essai gratuit 7 jours · Support en français
**CTA bouton :** S'inscrire

**Prompt visuel GPT Image (voir aussi C1-C3) :**
> Photo réaliste au smartphone : scène animée dans un snack polynésien à l'heure du
> déjeuner. Au premier plan net : le chevalet QR blanc générique sur le comptoir.
> En arrière-plan flou : le patron en action, plusieurs assiettes en main, clients
> attablés. Contraste voulu entre le chevalet immobile et l'agitation derrière.
> Lumière naturelle, couleurs vives, ambiance chaleureuse de service. Aucun texte,
> aucun logo. Format carré 1:1.

---

### Ad 4 — « 7 jours d'essai, zéro risque » (offre / essai) — RETARGETING + froid tiède

*Lead : Promesse / Offre. L'essai gratuit comme accroche — friction minimale.*

**Primary text (long) :**

> Et si, dans 7 jours, votre fiche Google avait déjà ses premiers nouveaux avis ?
>
> Avec ScanNShine, c'est un essai gratuit. Vous posez la plaquette en caisse, vos
> clients scannent, les avis arrivent. Si ça ne vous convainc pas, vous arrêtez —
> vous n'avez rien payé.
>
> Pas de site à créer, pas de technique, pas d'engagement. Prêt en 10 minutes,
> pensé pour les commerces du fenua.
>
> Ensuite, 3 990 XPF/mois — le prix d'un ou deux couverts, pour une fiche qui vous
> ramène des clients toute l'année.

**Headlines (3) :** « 7 jours d'essai, zéro risque » · « Vos premiers avis cette semaine » · « Prêt en 10 minutes, sans engagement »
**Description :** Essai gratuit 7 jours · Sans engagement
**CTA bouton :** S'inscrire

**Prompt visuel GPT Image (fondateur — ancrage local inimitable) :**
> Photo réaliste au smartphone, style selfie vidéo : un entrepreneur polynésien
> souriant, la quarantaine, tient son téléphone à bout de bras face à lui dans un
> petit commerce du fenua, l'air de parler à la caméra avec conviction et
> sympathie. Derrière lui, flou : un comptoir avec un petit chevalet QR blanc
> générique. Lumière naturelle chaude, ambiance authentique et proche. Aucun texte
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
> 3 990 XPF/mois · Essai gratuit 7 jours.

**Headlines (3) :** « Réglez les soucis en privé, d'abord » · « Écoutez vos clients avant Google » · « Le retour privé qui sauve la note »
**Description :** Conforme aux règles Google
**CTA bouton :** En savoir plus

**Prompt visuel GPT Image (voir aussi D1-D2) :**
> Photo réaliste au smartphone : gros plan sur les mains d'un commerçant derrière
> son comptoir, tenant son téléphone, en train de lire calmement un message. Posture
> attentive mais sereine, pas de stress. Arrière-plan flou : intérieur de snack
> polynésien, chevalet QR blanc générique sur le comptoir. Lumière naturelle douce.
> Écran montrant une interface de messagerie générique floue, non lisible. Aucun
> texte lisible, aucun logo. Format carré 1:1.

> ⚠️ **Contrainte anti-review-gating (non négociable)** : garder impérativement la
> phrase « le lien Google reste ouvert à tous » (ou équivalent). On ne promet
> **jamais** de bloquer/filtrer les avis négatifs — promesse contraire = compte
> publicitaire banni à terme + non-conformité UGC Google.

---

## 3. Workflow après génération

1. Générer 2-4 variations par prompt, ne garder que les images propres.
2. Compositer le **vrai QR** (`/r/demo-snack`) par-dessus le QR générique.
3. Ajouter le **texte** (hook + « Essai gratuit 7 jours » + « 3 990 XPF/mois ») dans
   la charte ScanNShine (bleu primary `#0ea5e9`), en **1:1** et **9:16**.
4. Nommer les fichiers, ex. `sns-ad1-injustice-ia-1-1x1.png` / `-9x16.png` dans
   `docs/ads-creatives/`.
5. **Priorité créa** : Ad 1 en **vidéo** (« le scan en caisse », créa 1 de
   `meta-ads.md` §5) — le format vidéo natif est le plus performant en PF.

---

## 4. Correspondance annonces ↔ UTM ↔ test

Structure de `meta-ads.md` : marché micro (~190 k utilisateurs FB PF) → **1 ad set
broad**, on teste **au niveau des annonces**. Optimisation Meta : **`CompleteRegistration`**
(inscription) puis `StartTrial` si le volume le permet.

| Annonce | Moteur | UTM `utm_content` | Usage |
|---|---|---|---|
| Ad 1 — Injustice silencieuse | Douleur n°1 | `angle-a-injustice` | Froid — vague 1 (vidéo) |
| Ad 2 — Concurrent mieux noté | Peur / statut | `angle-b-concurrent` | Froid — vague 1 |
| Ad 3 — Ça travaille tout seul | Temps / contrôle | `angle-c-toutseul` | Froid — vague 2 |
| Ad 4 — Essai 7 jours | Offre / friction | `angle-e-essai` | **Retargeting** + tiède |
| Ad 5 — Retour privé | Réputation | `angle-d-negatif` | Froid — vague 2 |

**Lien type :**
```
https://scannshine.com/?utm_source=facebook&utm_medium=paid&utm_campaign=sns-lancement&utm_content=angle-a-injustice
```

**Plan de test (Hopkins) :**
- Vague 1 (froid) : Ad 1 (vidéo) vs Ad 2, variable = l'accroche. On garde le meilleur
  **CTR lien**.
- Vague 2 : Ad 3, Ad 5. Ad 4 en **retargeting** des visiteurs LP + vues vidéo.
- Coupe : CTR lien < 1 % après ~4 000 impressions → couper.
- Mesure : coût par visite LP → **coût par essai démarré** (cible ≤ 3 000 XPF, cf.
  `meta-ads.md` §0) → essais → payants (cible ≥ 25 %).

⚠️ **Prérequis** : pixel Meta + événements `CompleteRegistration` (signup) et
`StartTrial` (retour checkout Dodo) posés sur `/` (noté absent dans `meta-ads.md`).
Sans eux, impossible d'optimiser sur les inscriptions ni de mesurer le coût par essai.
