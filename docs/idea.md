---
project_id: avis-google
created: 2026-07-12
status: validated
validated_at: 2026-07-12
viability_score: 7/10
stepsCompleted: [0, 1, 3]
---

# Avis Google — Machine à avis pour TPE polynésiennes

**Tagline :** Le QR code qui transforme vos clients satisfaits en avis Google — pensé pour les commerces du fenua.

## Overview

| Aspect | Valeur |
|--------|--------|
| Business Model | Abonnement mensuel, self-service intégral |
| Pricing | 3 990 XPF/mois (≈ 33,40 € — le XPF est arrimé : 1 € = 119,33 XPF ; l'équivalence "37 €" annoncée est à corriger) |
| Essai | 7 jours gratuits |
| Paiement | Dodo Payments (Merchant of Record — Polynésie française confirmée dans les territoires marchands acceptés, entrée #59) |
| Cible | B2B — TPE/patentés de Polynésie française |
| Complexité code | 🟢→🟡 (funnel QR = simple ; volet CRM/SMS = ce qui fait basculer en 🟡) |
| Complexité marketing | 🟡 (Meta Ads = budget ; organique + influenceurs = lent mais adapté au fenua) |
| Viability Score | 7/10 |

## Options de nom

1. **Fetia** — "étoile" en tahitien, colle parfaitement aux étoiles Google (fetia.pf ?)
2. **Avinui** — avis + nui (grand)
3. **Mana Avis** — le "mana" de la réputation
4. **StarFenua**
5. **AviScan**

## Customer Avatar

Gérant(e) de TPE polynésienne — snack, roulotte, salon de coiffure/beauté, garage, artisan BTP, pension de famille, activité touristique, cabinet de santé. Il/elle est à la fois le patron et l'opérationnel : pas de service marketing, pas de compétence technique, pas de temps. Sait que les avis Google comptent (surtout pour capter les touristes qui choisissent via Maps) mais n'a aucun système : les clients contents partent sans rien écrire, seuls les mécontents postent. Fiche à 12 avis / 3,8★ face à un concurrent à 200 avis. Ne veut RIEN configurer : signup → paiement → ça marche.

## Le produit (MVP affiné en validation)

1. **QR permanent** : généré à l'inscription, disponible en **PDF prêt à imprimer** (chevalet, autocollant caisse) **ET affichable depuis le smartphone du gérant** (QR de poche pour les métiers mobiles).
2. **Page de collecte brandée** aux couleurs du commerce (logo, nom, couleur) : le client choisit son humeur/note ressentie.
3. **Routage conforme** : satisfait → redirection fiche Google Business ; insatisfait → **formulaire privé** transmis au gérant (email d'abord, autre canal ensuite). ⚠️ Les DEUX chemins laissent l'accès à Google visible — jamais de review gating (interdit par la politique UGC de Google).
4. **Dashboard** : scans/semaine, clics vers Google, feedbacks privés reçus.
5. **CRM naissant** : capture optionnelle du contact client (nom + mobile/email) au passage sur la page de collecte → base clients qui se construit dès le jour 1. **L'envoi de campagnes SMS marketing = v1.1**, juste après le lancement (vérifier coût/faisabilité SMS vers +689 et conformité RGPD/CNIL, applicable en PF).

## Competitor Landscape

| Concurrent | Ce qu'il fait | Prix |
|------------|---------------|------|
| Google natif | QR/lien d'avis gratuit depuis Google Business Profile | Gratuit |
| Plaques NFC one-shot (CollecteAvis, Phanion, TAPiTAG...) | Plaque physique → fiche Google, sans page intermédiaire ni tracking | 25–60 € une fois |
| NiceJob | Collecte automatisée SMS/email, small business US | ~75 $/mois |
| Podium | Plateforme messaging + avis + paiements | ~399 $/mois |
| Guest Suite / Partoo / Custplace (FR) | Collecte multi-canal + dashboard, cible réseaux/PME | ~100 €+/mois |
| Agences locales (Tahiti Kiwi...) | Référencement Google Maps en prestation | Prestation |

**Market Assessment :** 🟡 modéré-à-saturé globalement, 🟢 vierge localement. Preuve de willingness-to-pay forte à l'étranger (75–399 $/mois).

## Unique Value Proposition

Le seul outil d'avis Google **self-service, en français, avec un paiement qui fonctionne en Polynésie**, à un prix TPE (33 €/mois vs 75–399 $ ailleurs), avec page brandée + tracking + feedback négatif privé — ce que ni le QR gratuit de Google ni une plaque NFC à 30 € ne font.

## Marketing Strategy

1. **Meta Ads** — pertinent : pénétration Facebook très élevée en Polynésie, ciblage géo précis
2. **Organique Instagram + TikTok** — démos avant/après de fiches Google
3. **Affiliation influenceurs locaux** — commission récurrente sur abonnements parrainés

## Challenges & Risks (évaluation honnête)

1. **Ancrage prix contre nous** : Google gratuit + plaques à 30 € one-shot. La valeur récurrente (stats, alertes, CRM, feedback privé) doit être visible chaque semaine, sinon churn à 2-3 mois une fois les premiers avis engrangés. → Risque structurel n°1.
2. **Zéro validation terrain** : aucun entretien gérant, prix jamais confronté au marché. → 5 conversations Mom-Test pendant le build (coût : 3 jours).
3. **Plafond de marché** : ~2 000–4 000 TPE réellement adressables en PF. 100 clients = ~400 000 XPF/mois (~3 350 €) ; 300 clients = très grand succès local (~10 000 €/mois). Extension naturelle : Nouvelle-Calédonie, Antilles, DOM-TOM.
4. **Scope creep CRM/SMS** : le SMS marketing est la bonne arme anti-churn mais fait exploser le scope MVP → capture des contacts au MVP, envoi de campagnes en v1.1.
5. **Dépendance Google** : le produit vit sur la fiche Google Business ; un changement de politique UGC impacterait tout le marché (risque partagé avec tous les concurrents).

## Verdict

**7/10 — Je le construirais, avec deux conditions.** Le vide local est réel, la douleur documentée, le paiement vérifié (Dodo OK en PF), et le MVP funnel est livrable en ~2 semaines. Conditions : (1) parler à 5 gérants pendant le build pour valider le prix et le vocabulaire de vente, (2) discipline absolue sur le scope — le funnel d'abord, le CRM/SMS en v1.1.

---
*Validé : 2026-07-12*
