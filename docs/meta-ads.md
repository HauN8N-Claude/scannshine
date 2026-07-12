---
project_id: avis-google
created: 2026-07-12
status: draft
---

# Kit de lancement Meta Ads — ScanNShine

Plan d'exécution du canal payant principal (cf. `marketing.md`). Budget validé par le fondateur : **20 000–40 000 XPF/mois** (palier test). Objectif produit : contribuer aux **10 clients payants à J+30**.

## 0. Le calcul qui borne tout

- CAC cible : **< 12 000 XPF** (≈ 3 mois de MRR à 3 990 XPF).
- Hypothèse PRD : conversion essai → payant ≥ 25 %.
- Donc : **coût par essai démarré cible ≤ 3 000 XPF**.
- À 30 000 XPF/mois, il faut **≥ 10 essais démarrés/mois** via les ads pour rester dans les clous (≈ 2-3 clients payants/mois).

Toute décision (couper une annonce, monter le budget) se ramène à ce chiffre : **3 000 XPF par essai démarré, maximum**.

## 1. Prérequis avant de dépenser 1 XPF

| # | Prérequis | Statut |
|---|-----------|--------|
| 1 | Business Manager Meta + moyen de paiement | À créer |
| 2 | Page Facebook « ScanNShine » (+ compte Instagram lié) | À créer |
| 3 | Domaine vérifié dans le Business Manager | À faire au déploiement prod |
| 4 | **Pixel Meta installé sur la landing** + événements | ❌ Absent du code — tâche dev (voir §6) |
| 5 | Landing déployée en prod (Vercel) | En attente clés prod |
| 6 | Convention UTM en place | Définie ci-dessous (§6) |

⚠️ Sans le pixel et ses événements, impossible d'optimiser sur les inscriptions ni de mesurer le coût par essai. **Ne pas lancer avant.**

## 2. Structure de campagne

Le marché est minuscule (~190 000 utilisateurs Facebook en PF). Conséquences directes :

- **Pas de découpage en audiences** : une seule audience large fait le travail, c'est la créa qui cible.
- **Pas de test A/B multi-ad-sets** : le budget est trop petit pour sortir des stats par ad set. On teste **au niveau des annonces**.

```
Campagne : SNS-Lancement (objectif Ventes/Conversions)
└── Ad set unique : PF-Broad
    ├── Géo : Polynésie française (toutes îles)
    ├── Âge : 25–60, tous genres
    ├── Ciblage détaillé : AUCUN (broad) — l'audience PF est déjà micro
    ├── Placements : Advantage+ (feed FB, Reels, Stories dominent en PF)
    ├── Optimisation : « Inscription terminée » (CompleteRegistration)
    │   (basculer sur StartTrial si le volume le permet un jour)
    └── 4 annonces = 4 angles (voir §4)
```

Pourquoi broad et pas « intérêts entrepreneurs » : layering d'intérêts sur 190 k personnes = audience de quelques milliers, coûts qui explosent, apprentissage impossible. Les créas parlent « caisse », « fiche Google », « clients » — un salarié qui n'a pas de commerce ne cliquera pas.

## 3. Budget et paliers de décision

| Palier | Budget/jour | Durée | Question à trancher |
|--------|------------|-------|---------------------|
| 1 — Validation du message | 1 000 XPF (~30 000/mois) | Semaines 1–2 | Quel angle a le meilleur CTR ? Les gens cliquent-ils ? |
| 2 — Validation du funnel | 1 000–1 300 XPF | Semaines 3–4 | Les clics deviennent-ils des inscriptions ≤ 3 000 XPF/essai ? |
| 3 — Scale (hors budget test) | 2 000+ XPF | Après 1er mois | Seulement si CAC réel < 12 000 XPF confirmé sur ≥ 5 clients |

**Règles de coupe (à appliquer froidement) :**
- Annonce avec CTR lien < 1 % après ~4 000 impressions → couper, remplacer par une variante de l'angle gagnant.
- Coût par essai > 4 500 XPF sur 2 semaines glissantes malgré itérations → suspendre et retravailler landing/offre, pas le budget.
- Ne **jamais** toucher à la campagne plus d'une fois par semaine (phase d'apprentissage Meta).

## 4. Copy des annonces — 4 angles

Registre : vouvoiement (aligné landing). Zéro jargon (pas de « taux de conversion », « funnel », « SaaS »...). Prix toujours en XPF. Ancrage fenua. Le lien pointe vers la landing avec UTM (§6).

### Angle A — L'injustice silencieuse (douleur n°1, message central)

- **Hook vidéo / 1re ligne :** « Vos clients contents partent sans rien écrire. Vos clients fâchés, eux, laissent un avis. »
- **Primary text :**
  > Vos clients contents partent sans rien écrire. Vos clients fâchés, eux, trouvent toujours le temps.
  >
  > Résultat : votre fiche Google ne raconte pas la vérité sur votre commerce.
  >
  > ScanNShine inverse ça : un QR code en caisse, le client scanne, et laisse son avis en 30 secondes. Prêt en 10 minutes, 3 990 XPF/mois, essai gratuit 7 jours.
- **Headlines (3 variantes) :** « Vos clients contents, enfin visibles » · « Le QR code qui remplit votre fiche Google » · « Plus d'avis Google, sans rien demander »
- **Description :** Essai gratuit 7 jours · Sans engagement
- **CTA bouton :** S'inscrire

### Angle B — Le concurrent mieux noté (statut + peur de perdre)

- **Hook :** « 12 avis quand votre concurrent en a 200 ? »
- **Primary text :**
  > Le touriste ouvre Google Maps, compare deux snacks, et va chez celui qui a 200 avis. Même si le vôtre est meilleur.
  >
  > Ce n'est pas une question de qualité. C'est une question d'avis.
  >
  > ScanNShine met un QR code en caisse qui transforme vos vrais clients contents en avis Google, semaine après semaine. Essai gratuit 7 jours.
- **Headlines :** « Le mieux noté gagne le client » · « Rattrapez votre concurrent sur Google » · « Les touristes choisissent sur Maps »
- **Description :** 3 990 XPF/mois · Prêt en 10 minutes
- **CTA :** En savoir plus

### Angle C — Ça travaille tout seul (temps + contrôle)

- **Hook :** « Demander un avis de vive voix, c'est gênant. Alors on ne le fait pas. »
- **Primary text :**
  > Demander un avis à un client, c'est gênant. Et même quand il dit oui... il oublie 10 minutes après.
  >
  > Le QR ScanNShine, lui, est en caisse et travaille tout seul. Le client scanne, note, c'est fait. Vous suivez vos scans et vos nouveaux avis chaque semaine, depuis votre téléphone.
  >
  > Aucune installation, aucun site web nécessaire. Juste votre fiche Google.
- **Headlines :** « L'avis Google se demande tout seul » · « En caisse, ça tourne sans vous » · « Prêt en 10 minutes, chrono »
- **Description :** Essai gratuit 7 jours · Support en français
- **CTA :** S'inscrire

### Angle D — Le prochain avis 1 étoile (peur, à manier honnêtement)

- **Hook :** « Le client mécontent ne vous le dit pas. Il le dit à Google. »
- **Primary text :**
  > Un souci en service, et le client sort son téléphone... pour l'écrire sur votre fiche Google, devant tout le monde.
  >
  > Avec ScanNShine, vos clients ont aussi un moyen simple de vous écrire en privé — vous réglez le problème directement avec eux. Et le lien Google reste ouvert à tous : rien n'est filtré, rien n'est caché.
  >
  > 3 990 XPF/mois, essai gratuit 7 jours.
- **Headlines :** « Réglez les soucis en privé, d'abord » · « Écoutez vos clients avant Google » · « Le retour privé qui sauve la note »
- **Description :** Conforme aux règles Google
- **CTA :** En savoir plus

⚠️ Sur cet angle D : garder impérativement la phrase « le lien Google reste ouvert à tous » (ou équivalent). On ne promet **jamais** de bloquer/filtrer les avis négatifs — c'est la contrainte anti-review-gating du produit, et une promesse contraire ferait bannir le compte publicitaire à terme.

## 5. Briefs créas (zéro matière existante — tout est tournable au smartphone)

### Créa 1 — « Le scan en caisse » (vidéo 9:16, 15–20 s) — priorité n°1
POV vertical : une main pose un chevalet QR près d'une caisse (n'importe quel comptoir fait l'affaire) → un téléphone scanne → écran : la page de collecte (utiliser le business seed `/r/demo-snack`) → tap sur les étoiles → la fiche Google s'ouvre. Texte incrusté qui suit le hook de l'angle A. Pas de voix nécessaire, musique locale libre de droits. **Tournable aujourd'hui, sans commerce partenaire.**

### Créa 2 — « Avant / après » (statique ou motion léger, 1:1 et 9:16)
Deux fiches Google côte à côte : « Snack A — 12 avis ★3,8 » vs « Snack B — 200 avis ★4,7 », flèche « le touriste va où ? ». Style illustration/mockup assumé (pas de vrai nom de commerce, pas de faux témoignage). Sert l'angle B.

### Créa 3 — Face caméra fondateur (vidéo 9:16, 20–30 s)
Script : hook angle A → « j'ai construit ScanNShine pour les commerces du fenua » → démo écran 5 s → « essai gratuit 7 jours, lien en dessous ». L'accent et l'ancrage local sont un avantage de ciblage que aucun concurrent US ne peut copier.

### Intérim IA
En attendant les tournages : 2-3 statiques générés par IA (chevalet QR sur un comptoir de snack, ambiance polynésienne) pour les angles A et C. À remplacer par du réel dès que possible — le réel local performera mieux.

## 6. Mesure

**Convention UTM** (à coller sur tous les liens d'annonces) :

```
https://<domaine-prod>/?utm_source=facebook&utm_medium=paid&utm_campaign=sns-lancement&utm_content=angle-a-injustice
```

`utm_content` : `angle-a-injustice` · `angle-b-concurrent` · `angle-c-toutseul` · `angle-d-negatif`.

**Tâche dev à créer — Pixel Meta :**
- Script pixel sur la landing (`app/page.tsx` / layout racine) — via un composant respectant le consentement.
- Événements : `PageView` (auto), `CompleteRegistration` au signup réussi, `StartTrial` au retour de checkout Dodo réussi.
- Plus tard (si volume) : Conversions API côté serveur.

**Tableau de bord hebdo (5 chiffres, pas plus) :** dépense · CTR lien par angle · coût par visite landing · coût par essai démarré · essais → payants.

## 7. Checklist de lancement

- [ ] Business Manager + moyen de paiement + page FB + Insta lié
- [ ] Domaine prod vérifié dans le Business Manager
- [ ] Pixel + événements posés et testés (Meta Pixel Helper)
- [ ] Landing en prod, parcours signup → checkout fonctionnel de bout en bout
- [ ] 4 annonces montées (angle A en vidéo créa 1, B en statique créa 2, C et D en statique/vidéo selon dispo)
- [ ] UTM posés, campagne à 1 000 XPF/jour, publication
- [ ] Rituel hebdo : relever les 5 chiffres, appliquer les règles de coupe (§3)
