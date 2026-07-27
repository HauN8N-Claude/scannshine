---
project_id: avis-google
created: 2026-07-27
status: draft
---

# Meta Ads — Guide « La Méthode Visibilité Locale » (2 990 XPF)

Kit créatif complet pour la campagne du **guide payant** (info-produit low-ticket),
LP : `/guidepremium`. Contient, pour chaque annonce : la copy prête à coller
(primary text long + 3 headlines + description) **et** les prompts à coller dans
**ChatGPT / GPT Image** pour générer les visuels.

> ⚠️ Ne pas confondre avec `docs/meta-ads.md` + `docs/prompts-visuels-ia.md` :
> ceux-là vendent l'**abonnement ScanNShine** (3 990 XPF/mois, chevalet QR en
> caisse). **Ici on vend le guide PDF à 2 990 XPF** — produit différent, promesse
> différente, visuels différents (pas de chevalet QR).

---

## 0. Rappel produit & cible (le cadre qui borne toute la copy)

- **Produit** : *La Méthode Visibilité Locale* — guide PDF 34 pages. Audit Google
  100 points, plan d'action 30 jours, dossier spécial IA, fiches par métier, plan
  photo, tableau de bord mensuel.
- **Prix** : **2 990 XPF**, paiement unique, accès à vie, **garanti 14 jours**.
- **Landing** : `/guidepremium` (⚠️ actuellement `robots: index:false` + pixel Meta
  à poser — cf. §5. Ne pas lancer les ads avant que l'achat soit tracké).
- **Cible** : le **commerçant du fenua avec du passage** — snack/roulotte/resto,
  coiffeur/institut/barbier, boutique/artisan, garage/prestataire, pension/activité
  touristique. Pas le concessionnaire auto.
- **Douleur centrale (H2 de la LP)** : « Vous faites du bon travail. Google ne le
  montre pas. » Le concurrent moins bon mais mieux noté capte ses clients (locaux
  **et** touristes).
- **Diagnostic copy** : prospect **niveau 2** (conscient du problème) · marché
  **stade 1-2** (vierge) → accroches **simples et directes**.
- **Registre** : **vouvoiement** (aligné LP). Zéro jargon. Prix en **XPF**. Ancrage
  **fenua**.

---

## 1. Règles communes aux prompts GPT Image (à respecter sur TOUS les prompts)

Ces règles reprennent l'expérience de `prompts-visuels-ia.md`, adaptées à un
info-produit.

1. **Modèle & formats** : générer avec le générateur d'images de ChatGPT (GPT Image).
   Demander d'abord le **carré 1024×1024** (feed 1:1), puis une variante **portrait
   1024×1536** (à recadrer en 9:16 pour Reels/Stories). Terminer chaque prompt par
   « Format carré 1:1 » ou « Format portrait vertical ».
2. **Pas de texte dans l'image** (sauf prompts « mockup » explicites) : le modèle
   rate encore les accents français. Le texte (hook + prix + garantie) s'ajoute
   **après**, dans l'éditeur de créas Meta ou par compositing, dans la charte.
3. **Zéro logo de marque** (Google, Google Maps, Meta, ChatGPT, OpenAI…) : risque
   de refus Meta. Ne **jamais** reproduire l'interface Google Maps ni un logo d'IA —
   suggérer, ne pas copier. Demander « interface générique non identifiable ».
4. **Écrans de téléphone flous / génériques** : jamais de contenu lisible ni
   d'interface reconnaissable à l'écran.
5. **Esthétique smartphone, pas stock photo** : le contenu qui ressemble à de
   l'organique performe mieux en PF. D'où « photo prise au smartphone, légèrement
   imparfaite, cadrage naturel » dans les prompts.
6. **Vérifier mains, visages, doigts, dents** avant d'utiliser. Générer 2-4
   variations par prompt, ne garder que les propres.
7. **Astuce mockup produit** : GPT Image accepte une **image de référence**. Pour un
   rendu fidèle du guide, joindre la vraie couverture
   `public/images/ebook/cover-mockup.png` (ou `audit.png` / `plan30j.png`) et
   demander de la « placer sur la tablette/le téléphone de la scène ». Sinon, le
   modèle inventera une couverture — acceptable seulement en visuel d'ambiance flou.

---

## 2. Les 5 annonces (copy complète + prompts visuels)

Ordre = priorité de test pour du **froid** (sauf Ad 5, réservée au retargeting).
Chaque annonce attaque **un seul nerf émotionnel** (règle d'A/B : un angle = un
moteur).

---

### Ad 1 — « Le touriste compare en 30 secondes » (peur de perdre + statut) — priorité n°1

*Lead : Problème-Solution. L'argument n°1 de la LP, le plus visuel pour du froid.*

**Primary text (long) :**

> Un touriste arrive à Tahiti. Il a faim. Il sort son téléphone, cherche où manger,
> et compare deux commerces en trente secondes.
>
> Il ne vous connaît pas. Il ne connaît pas votre voisin non plus. Alors il choisit
> celui dont la fiche inspire le plus confiance : le mieux noté, avec des photos et
> des avis récents.
>
> Si c'est le voisin — même s'il est moins bon que vous — c'est lui qui remplit sa
> salle ce soir. Ce n'est pas une question de qualité. C'est une question de fiche
> Google.
>
> *La Méthode Visibilité Locale* est le guide qui vous fait passer devant :
> comprendre ce qui fait remonter une fiche sur Google Maps, récolter des avis
> récents en continu, transformer votre fiche en vraie vitrine qui donne envie de
> pousser la porte.
>
> 34 pages, pensé pour les commerces du fenua. Sans site internet, sans compétence
> technique, sans payer de publicité chaque mois.
>
> 2 990 XPF · Paiement unique · Accès à vie · Garanti 14 jours.

**Headlines (3) :** « Le mieux noté gagne le client » · « Passez devant le commerce d'à côté » · « Les touristes vous choisissent sur Google »
**Description :** Le guide complet — 2 990 XPF, garanti 14 jours
**CTA bouton :** En savoir plus

**Prompts visuels GPT Image :**

*V1 — Le couple de touristes qui choisit (visuel principal)*
> Photo réaliste prise au smartphone : un couple de touristes en tenue de vacances,
> debout dans une rue commerçante ensoleillée de Papeete, penchés ensemble sur un
> seul téléphone, en train de choisir où aller manger. Expression concentrée, l'un
> pointe l'écran du doigt. L'écran n'est pas lisible (reflet de lumière), aucune
> interface reconnaissable. En arrière-plan flou : devantures de snacks colorées,
> scooters, végétation tropicale. Lumière dure de midi, ombres franches, ambiance
> authentique de rue polynésienne. Aucun texte, aucun logo. Format carré 1:1.

*V2 — Les deux commerces voisins (comparaison)*
> Photo réaliste au smartphone : deux petits snacks polynésiens voisins dans la même
> rue, vus de face depuis le trottoir d'en face. Celui de gauche vide, rideau à
> moitié tiré, aucune animation. Celui de droite avec une file de cinq clients qui
> attendent, touristes et locaux mélangés. Même architecture simple, tôle et bois
> peint de couleurs vives. Lumière de fin de matinée, ciel tropical. Composition
> symétrique qui invite à comparer. Aucune enseigne lisible, aucun texte, aucun
> logo. Format carré 1:1.

---

### Ad 2 — « Vous faites du bon travail, Google ne le montre pas » (injustice / identification)

*Lead : Story / Identification. Reprend le H2 exact de la LP → cohérence
message-marché parfaite.*

**Primary text (long) :**

> Vous faites du bon travail. Vos clients repartent contents. Mais sur Google, ça
> ne se voit pas.
>
> Trop peu d'avis. Trop anciens. Une fiche qui paraît à l'abandon. Alors le client
> qui vous découvre sur son téléphone passe son chemin — sans même vous connaître.
> Et chaque semaine, l'écart avec les commerces mieux notés se creuse un peu plus.
>
> Le pire ? Ça n'a rien à voir avec la qualité de ce que vous faites. Personne ne
> vous a simplement montré comment rendre votre fiche visible.
>
> C'est exactement ce que fait ce guide : un audit de votre fiche sur 100 points,
> un plan clair, et une méthode pour que Google montre enfin le vrai visage de votre
> commerce. Sans site, sans technique, sans budget publicité.
>
> Le prix d'un plein d'essence, une méthode qui travaille pour vous des années.
>
> 2 990 XPF · Accès immédiat · Garanti 14 jours.

**Headlines (3) :** « Votre fiche ne vous rend pas justice » · « Le bon travail, enfin visible sur Google » · « Sans site, sans technique »
**Description :** La Méthode Visibilité Locale — 34 pages
**CTA bouton :** En savoir plus

**Prompts visuels GPT Image :**

*V1 — Le commerçant pensif derrière son comptoir (visuel principal)*
> Photo réaliste prise au smartphone : un commerçant polynésien, la quarantaine,
> debout derrière le comptoir de son petit commerce vide, regarde son téléphone
> avec une expression pensive et un peu préoccupée. Le commerce est propre et bien
> tenu mais désert, sans client. Lumière naturelle douce de milieu d'après-midi qui
> entre par la porte. Écran du téléphone non lisible. Ambiance calme, un peu suspendue.
> Photo documentaire authentique, non posée. Aucun texte lisible, aucun logo.
> Format portrait vertical.

*V2 — L'artisan appliqué mais seul*
> Photo réaliste au smartphone : un artisan polynésien concentré sur son travail
> (atelier, établi, mains soignées en action) dans un local propre et accueillant,
> mais totalement vide de clients. Contraste voulu entre la qualité visible du
> travail et l'absence de fréquentation. Lumière naturelle chaude, tons authentiques.
> Style photo de reportage local. Aucun texte, aucun logo. Format carré 1:1.

---

### Ad 3 — « Vos clients demandent déjà à l'IA » (nouveauté / longueur d'avance)

*Lead : Grand Secret / Proclamation. Le scroll-stopper unique — c'est le « dossier
spécial IA » de la LP, le sujet que personne ne traite encore ici.*

**Primary text (long) :**

> Vos futurs clients ne demandent plus seulement à Google où manger, où dormir, où
> faire réparer leur voiture. Ils le demandent à une intelligence artificielle.
>
> Et elle ne recommande que les commerces qu'elle « voit » clairement. La plupart
> des commerçants du fenua ne le savent pas encore — c'est précisément votre
> longueur d'avance, si vous la prenez maintenant.
>
> *La Méthode Visibilité Locale* consacre un dossier entier à ce sujet que personne
> ne traite encore ici : comment devenir la réponse que l'IA donne, en plus de
> sortir en premier sur Google Maps.
>
> Vous y trouverez aussi l'audit de votre fiche sur 100 points, le plan d'action
> sur 30 jours et le système d'avis qui vous fait remonter.
>
> 34 pages, pensé pour les commerces de Polynésie. 2 990 XPF, accès à vie, garanti
> 14 jours.

**Headlines (3) :** « Soyez la réponse de l'IA » · « Une longueur d'avance sur vos concurrents » · « Le sujet que personne ne traite ici »
**Description :** Dossier spécial IA inclus — 2 990 XPF
**CTA bouton :** En savoir plus

**Prompts visuels GPT Image :**

*V1 — La question posée au téléphone (visuel principal)*
> Photo réaliste prise au smartphone : une jeune femme locale assise à la terrasse
> d'un café de Papeete, parle à son téléphone tenu près d'elle, l'air de poser une
> question à un assistant vocal. Expression naturelle et curieuse. Écran non lisible,
> aucune interface ni logo reconnaissable. Autour : ambiance tropicale urbaine,
> végétation, tables de café floues. Lumière de matinée douce. Photo de rue
> authentique. Aucun texte lisible, aucun logo. Format carré 1:1.

*V2 — Concept « être recommandé » (ambiance)*
> Photo réaliste au smartphone, cadrage rapproché : une main tient un téléphone dont
> l'écran, légèrement lumineux, affiche une interface de discussion générique et
> abstraite (bulles de conversation floues, aucun texte lisible, aucun logo). Fond
> tropical doux et flou d'un commerce polynésien accueillant. Lumière chaude et
> moderne, sensation d'avance technologique mais chaleureuse. Aucun texte lisible,
> aucun logo, aucune marque. Format portrait vertical.

---

### Ad 4 — « Une action par jour pendant 30 jours » (contrôle / anti-surcharge)

*Lead : Promesse. Désamorce l'objection « je n'ai pas le temps / je n'y comprends
rien ». Vend le plan 30 jours comme mécanisme.*

**Primary text (long) :**

> « Je sais qu'il faudrait m'occuper de ma fiche Google… mais je n'ai pas le temps,
> et je n'y comprends rien. »
>
> Si vous vous êtes déjà dit ça, ce guide est fait pour vous.
>
> Pas de théorie, pas de jargon. D'abord un audit de votre fiche sur 100 points pour
> repérer les 3 corrections qui rapportent le plus. Ensuite un plan sur 30 jours :
> une seule action simple par matin.
>
> Au bout du mois, une fiche Google qui vous ramène des clients toute seule — locaux
> et touristes. Si vous savez utiliser un téléphone, vous savez appliquer ce guide.
>
> Et si ça ne vous apporte rien, vous êtes remboursé sous 14 jours.
>
> 2 990 XPF · Paiement unique · Accès à vie.

**Headlines (3) :** « Un plan clair, une action par jour » · « Réglez votre visibilité en 30 jours » · « Pas de théorie : un plan »
**Description :** Audit 100 points + plan 30 jours
**CTA bouton :** En savoir plus

**Prompts visuels GPT Image :**

*V1 — Le commerçant qui lit le guide, café du matin (visuel principal — joindre `plan30j.png` en référence)*
> Photo réaliste prise au smartphone : un commerçant polynésien détendu, assis à une
> table de son commerce le matin avant l'ouverture, tient une tablette (ou un
> téléphone) et lit avec attention, une tasse de café à côté. Posture calme et
> concentrée, sensation de « je sais quoi faire aujourd'hui ». Lumière rasante dorée
> du matin. Écran non lisible (le vrai contenu sera composité ensuite). Ambiance
> sereine et organisée. Aucun texte lisible, aucun logo. Format carré 1:1.

*V2 — Flat lay « le plan » (ambiance méthode)*
> Photo réaliste vue de dessus (flat lay) sur une table en bois clair : une tablette
> posée (écran éteint ou neutre, pour compositing ultérieur), un carnet ouvert avec
> une liste cochée à la main (traits génériques, aucun mot lisible), un stylo, une
> tasse de café et une fleur de tiaré fraîche. Composition soignée mais naturelle,
> lumière du matin, ombres douces. Esthétique minimaliste chaleureuse. Aucun texte
> lisible, aucun logo. Format carré 1:1.

---

### Ad 5 — « Le prix d'un plein d'essence » (offre directe) — RETARGETING uniquement

*Lead : Offre. À réserver au retargeting (visiteurs LP + vues vidéo) : prospect
plus chaud, on attaque l'offre.*

**Primary text (long) :**

> Une agence vous facturerait la visibilité Google des dizaines de milliers de
> francs — et vous en resteriez dépendant.
>
> Voici l'autre chemin : la méthode complète, entre vos mains, pour le prix d'un
> plein d'essence.
>
> *La Méthode Visibilité Locale*, c'est 34 pages qui contiennent tout : l'audit de
> votre fiche sur 100 points, le plan d'action sur 30 jours, le dossier spécial IA,
> les priorités par métier et le tableau de bord pour suivre vos progrès.
>
> Accès immédiat après le paiement, à garder à vie. Aucun abonnement. Et si le guide
> ne vous apporte rien : un mot sous 14 jours, vous êtes remboursé. Vous ne prenez
> aucun risque.
>
> 2 990 XPF, une fois. Une méthode qui travaille pour vous des années.

**Headlines (3) :** « La méthode complète, 2 990 XPF » · « Moins qu'un plein, utile des années » · « Garanti ou remboursé »
**Description :** Accès immédiat · À garder à vie
**CTA bouton :** Acheter

**Prompts visuels GPT Image :**

*V1 — Le guide entre les mains (mockup produit — joindre `cover-mockup.png` en référence)*
> Photo réaliste prise au smartphone : les mains d'un commerçant polynésien tiennent
> une tablette qui affiche la couverture d'un guide (placer ici l'image de couverture
> fournie en référence). Arrière-plan flou : comptoir d'un petit commerce du fenua,
> lumière naturelle chaude. Cadrage type contenu organique, légèrement imparfait.
> La couverture doit rester nette et lisible. Aucun autre texte, aucun logo de marque.
> Format carré 1:1.

*V2 — Le guide + la fiche « pleine d'avis » (bénéfice — écran générique, PAS Google Maps)*
> Photo réaliste au smartphone, flat lay sur un bureau clair : une tablette affichant
> la couverture du guide (image fournie en référence) à côté d'un téléphone dont
> l'écran montre une fiche de commerce générique et stylisée — beaucoup d'étoiles
> dorées et de petites vignettes de photos, SANS reproduire l'interface Google Maps,
> sans logo, sans texte lisible. Fleur de tiaré, tasse de café. Lumière douce, ombres
> délicates. Aucun logo de marque. Format portrait vertical.

---

## 3. Workflow après génération

1. Générer 2-4 variations par prompt, ne garder que les images sans défaut de
   mains/visages/perspective.
2. Pour les prompts « mockup » (Ad 4 V1, Ad 5 V1/V2) : joindre la vraie image
   (`cover-mockup.png` / `plan30j.png`) en référence pour un rendu fidèle, ou
   compositer la couverture par-dessus après coup.
3. Ajouter le **texte** (hook de l'angle + « 2 990 XPF » + « Garanti 14 jours »)
   dans la charte ScanNShine (bleu primary `#0ea5e9`), en **1:1** et **9:16** — soit
   par compositing, soit dans l'éditeur de créas Meta.
4. Nommer les fichiers finaux de façon cohérente, ex. :
   `guide-ad1-touriste-ia-1-1x1.png` / `-9x16.png` dans `docs/ads-creatives/`.

---

## 4. Correspondance annonces ↔ UTM ↔ test

Réutiliser la structure de `docs/meta-ads.md` (marché micro ~190 k utilisateurs FB
en PF → **1 seul ad set broad**, on teste **au niveau des annonces**).

| Annonce | Moteur | UTM `utm_content` | Usage |
|---------|--------|-------------------|-------|
| Ad 1 — Touriste compare | Peur de perdre / statut | `guide-touriste` | Froid — vague 1 |
| Ad 2 — Bon travail invisible | Injustice / identification | `guide-injustice` | Froid — vague 1 |
| Ad 3 — L'IA recommande | Nouveauté / avance | `guide-ia` | Froid — vague 1 |
| Ad 4 — Plan 30 jours | Contrôle / anti-surcharge | `guide-plan30j` | Froid — vague 2 |
| Ad 5 — Prix d'un plein | Offre directe | `guide-offre` | **Retargeting** |

**Lien type (UTM à coller) :**

```
https://scannshine.com/guidepremium/?utm_source=facebook&utm_medium=paid&utm_campaign=sns-guide&utm_content=guide-touriste
```

**Plan de test (Hopkins) :**
- Vague 1 (froid) : Ad 1 vs Ad 2 vs Ad 3, même budget, variable = l'accroche. On
  garde le meilleur **CTR lien**.
- Vague 2 : Ad 5 en **retargeting** des vues vidéo + visiteurs `/guidepremium`.
- Coupe : toute annonce sous **1 % de CTR lien** après ~4 000 impressions.
- Mesure : coût par visite LP → **coût par achat guide** (2 990 XPF).

---

## 5. Prérequis technique avant de dépenser 1 XPF

- [ ] LP `/guidepremium` passée en **`robots: index:true`** (lancement produit Dodo
      confirmé).
- [ ] **Pixel Meta** posé sur `/guidepremium` avec l'événement **`Purchase`** au
      retour de checkout Dodo réussi (aujourd'hui noté absent dans `meta-ads.md`).
      Sans lui, impossible d'optimiser sur les ventes ni de mesurer le coût par achat.
- [ ] Page Facebook + Business Manager + domaine vérifié.
- [ ] UTM posés (§4), campagne montée en **1 ad set broad**, budget test aligné sur
      `meta-ads.md` §3.
