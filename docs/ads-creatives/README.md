# Créas Meta Ads — ScanNShine

Visuels statiques générés pour la campagne SNS-Lancement (cf. `docs/meta-ads.md`).
8 fichiers : 4 angles × 2 formats (1080×1080 feed, 1080×1920 stories/reels).

| Fichier | Angle | utm_content |
|---------|-------|-------------|
| `angle-a-injustice-*.png` | A — L'injustice silencieuse | `angle-a-injustice` |
| `angle-b-concurrent-*.png` | B — Le concurrent mieux noté | `angle-b-concurrent` |
| `angle-c-toutseul-*.png` | C — Ça travaille tout seul | `angle-c-toutseul` |
| `angle-d-negatif-*.png` | D — Le prochain avis 1 étoile | `angle-d-negatif` |

Déclinaison persona « salons & instituts de beauté » (badge visuel adapté) :

| Fichier | Variante | utm_content |
|---------|----------|-------------|
| `salon-a-bouche-a-oreille-*.png` | S1 — Le compliment qui part avec elle (angle A) | `salon-a-bouche-a-oreille` |
| `salon-b-nouvelle-cliente-*.png` | S2 — La nouvelle cliente compare (angle B) | `salon-b-nouvelle-cliente` |
| `salon-c-entre-deux-rdv-*.png` | S3 — Entre deux rendez-vous (angle C) | `salon-c-entre-deux-rdv` |

Notes :

- Le QR code sur les visuels A et C est réel et pointe vers
  `https://scannshine.com/r/demo-snack` (business seed de démo).
- Ces statiques sont l'intérim prévu au §5 de meta-ads.md — à remplacer
  par les vidéos smartphone (créa 1 « scan en caisse », créa 3 face caméra)
  dès qu'elles sont tournées. Le réel local performera mieux.
- Source : HTML/CSS rendu via Chrome headless (script hors repo, jetable).
  Pour régénérer, refaire un rendu 1080×1080 et 1080×1920 des mêmes layouts.
