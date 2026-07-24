# Mémoire de contexte — Business de cartes NFC pour avis Google en Polynésie française

> Document de passation destiné à Claude ou à un autre LLM. Il rassemble les éléments techniques, opérationnels, commerciaux et stratégiques discutés afin de servir de base à la construction d’un business model.

## 1. Concept

Créer et commercialiser en Polynésie française des supports physiques facilitant le dépôt d’avis Google authentiques :

- cartes NFC ;
- stickers NFC ;
- supports anti-métal ;
- chevalets ou plaques de comptoir ;
- QR codes de secours ;
- supports personnalisés à l’image du business.

Parcours client final :

```text
Téléphone du client
→ scan NFC ou QR code
→ URL courte contrôlée par le prestataire
→ redirection vers le lien Google Review
→ fiche Google du business
→ note et avis
```

La valeur ne repose pas uniquement sur la carte. L’offre peut inclure la vérification de la fiche, la récupération du lien, la programmation, le design, le QR code, les tests, la maintenance et les statistiques d’ouverture.


## 2. Proposition de valeur

Positionnement recommandé :

> Faciliter la collecte d’avis Google authentiques grâce à un support NFC et QR code clé en main, personnalisé, testé et maintenable localement.

Bénéfices pour le commerce :

- parcours très simple pour le client ;
- aucune application spécifique à installer ;
- support visible au moment opportun ;
- NFC et QR code sur le même support ;
- lien modifiable sans remplacer la carte ;
- accompagnement local ;
- contrôle de la bonne fiche Google ;
- solution compatible Android et iPhone ;
- possibilité de maintenance et de suivi des ouvertures.

Ne pas présenter l’offre comme une vente d’avis ou une garantie de résultats.


## 3. Marché initial et cibles

Zone de lancement :

- Tahiti ;
- puis Moorea et les autres îles de Polynésie française.

Communes possibles : Papeete, Punaauia, Faa’a, Pirae, Arue, Mahina, Paea, etc.

Segments potentiels :

- restaurants et snacks ;
- hôtels et pensions ;
- salons de coiffure et instituts ;
- garages et loueurs ;
- prestataires touristiques ;
- centres de plongée et activités nautiques ;
- commerces de proximité ;
- cabinets et professions libérales ;
- agences immobilières ;
- artisans et sociétés de services.

Critères de qualification :

- fiche Google active ;
- activité dépendante de la réputation ;
- passage fréquent de clients ;
- nombre d’avis encore faible ou irrégulier ;
- emplacement adapté à un support ;
- équipe prête à proposer le scan au bon moment.


## 4. Deux méthodes pour obtenir le lien Google Review

### Méthode A — Lien fourni par le propriétaire

Le propriétaire ou gestionnaire de la fiche Google Business récupère le lien depuis sa fiche :

```text
Voir les avis
→ Recevoir plus d’avis / Demander des avis
→ Copier le lien
```

Aucun mot de passe ni accès au compte n’est nécessaire. Le propriétaire transmet simplement le lien.

Avantages :

- méthode la plus simple ;
- pas de Google Cloud ;
- pas de clé API ;
- pas de coût API ;
- très faible risque de mauvaise fiche ;
- validation directe par le client.

Limite : dépendance à la disponibilité du propriétaire.

Message utilisable :

> Ouvrez votre fiche Google, cliquez sur « Voir les avis », puis « Recevoir plus d’avis » et envoyez-moi le lien. Je n’ai besoin ni de votre mot de passe ni d’un accès au compte.

### Méthode B — Google Places API

Aucun accès au compte gérant l’établissement n’est nécessaire. La recherche utilise les données publiques Google Maps.

Champ à récupérer :

```text
googleMapsLinks.writeAReviewUri
```

À ne pas confondre avec :

```text
googleMapsLinks.reviewsUri
```

`writeAReviewUri` sert à rédiger un avis. `reviewsUri` sert à consulter les avis.

Processus :

```text
Nom + commune + Tahiti + Polynésie française
→ Text Search (New)
→ vérification du nom et de l’adresse
→ récupération du Place ID
→ Place Details (New)
→ récupération de writeAReviewUri
→ sauvegarde du lien
```

Exemple de requête Text Search :

```bash
curl -X POST   'https://places.googleapis.com/v1/places:searchText'   -H 'Content-Type: application/json'   -H 'X-Goog-Api-Key: VOTRE_CLE_API'   -H 'X-Goog-FieldMask: places.id,places.displayName,places.formattedAddress,places.googleMapsLinks'   -d '{
    "textQuery": "NOM DU BUSINESS, COMMUNE, Tahiti, Polynésie française",
    "languageCode": "fr",
    "regionCode": "PF",
    "pageSize": 5
  }'
```

Avec un Place ID connu :

```bash
curl -X GET   'https://places.googleapis.com/v1/places/PLACE_ID?languageCode=fr'   -H 'Content-Type: application/json'   -H 'X-Goog-Api-Key: VOTRE_CLE_API'   -H 'X-Goog-FieldMask: id,displayName,formattedAddress,googleMapsLinks'
```

Vérifications obligatoires :

- nom exact ;
- adresse ;
- commune ;
- île ;
- Place ID ;
- lien public de la fiche ;
- ouverture correcte de l’interface d’avis.


## 5. Différence entre le lien propriétaire et le lien API

Les URL peuvent différer dans leur forme. Le propriétaire peut obtenir une URL courte depuis Google Business ; l’API peut retourner une URL Google Maps plus longue.

Le résultat fonctionnel est le même :

```text
Ouverture de la fiche
→ choix des étoiles
→ rédaction et publication
```

Les avis ne sont pas classés différemment selon l’origine du lien. Google reste libre de filtrer ou supprimer les avis suspects ou non conformes.


## 6. Conformité Google

La méthode API n’est pas un contournement : Google fournit officiellement `writeAReviewUri`.

Principes :

- avis authentiques ;
- avis volontaires ;
- pas de faux comptes ;
- pas d’avis rédigé à la place du client ;
- pas de réduction, cadeau ou concours en échange d’un avis ;
- ne pas demander obligatoirement cinq étoiles ;
- ne pas envoyer uniquement les clients satisfaits vers Google ;
- ne pas exercer de pression.

Texte conseillé :

> Votre avis compte ! Approchez votre téléphone ou scannez le QR code pour partager votre expérience sur Google.

Éviter : « Mettez-nous 5 étoiles ».


## 7. Google Cloud, facturation et coûts API

Pour utiliser Places API (New), prévoir :

- compte Google ;
- projet Google Cloud ;
- compte de facturation associé ;
- moyen de paiement ;
- Places API activée ;
- clé API sécurisée ;
- quotas et alertes budgétaires.

Estimations évoquées pendant l’échange, à revalider au lancement :

- Place Details Pro : environ 5 000 requêtes gratuites par mois, puis environ 17 USD pour 1 000 requêtes ;
- Text Search Pro : environ 5 000 requêtes gratuites par mois, puis environ 32 USD pour 1 000 requêtes ;
- Text Search Essentials — IDs Only : conditions gratuites particulièrement favorables selon la documentation consultée.

Les prix, SKU et quotas évoluent. Ils doivent être vérifiés avant le prévisionnel.

Architecture économique :

```text
Configuration d’un business
→ un nombre limité d’appels API
→ sauvegarde du lien
```

Les scans NFC ne doivent pas appeler l’API :

```text
Scan
→ URL courte
→ lien Google déjà enregistré
```

Ainsi, chaque scan n’engendre pas de coût Places API.

À éviter :

```text
Scan
→ recherche API en temps réel
→ génération du lien à chaque visite
```


## 8. Sécurité de la clé API

Ne jamais mettre la clé :

- dans la puce NFC ;
- dans le QR code ;
- dans une URL publique ;
- dans le code source visible ;
- dans un tableur partagé ;
- dans un document remis au client.

Mesures recommandées :

- restriction à Places API (New) ;
- restriction par adresse IP serveur ;
- quotas quotidiens ;
- alertes budgétaires ;
- authentification à deux facteurs ;
- gestionnaire de mots de passe ;
- séparation test/production ;
- surveillance des usages anormaux.


## 9. URL intermédiaire contrôlée

Ne pas écrire directement le long lien Google dans la carte. Utiliser une URL courte sous son propre domaine :

```text
https://avis.votremarque.pf/restaurant-teva
```

Cette URL redirige vers `writeAReviewUri`.

Architecture :

```text
Carte NFC / QR code
→ URL courte
→ redirection HTTPS
→ Google Review
```

Avantages :

- correction à distance ;
- changement de fiche ou de Place ID ;
- carte réutilisable sans reprogrammation ;
- URL courte compatible NTAG213 ;
- suivi des ouvertures ;
- même URL pour NFC et QR ;
- maîtrise de la marque ;
- possibilité d’abonnement de maintenance.

Prérequis :

- nom de domaine ;
- hébergement ;
- certificat HTTPS ;
- système de redirection ;
- base client ;
- sauvegardes ;
- interface interne de modification.

Prévoir une vérification annuelle et une mise à jour après déménagement, fusion de fiches ou changement de nom.


## 10. Matériel NFC

Caractéristiques recherchées :

```text
NXP NTAG213, NTAG215 ou NTAG216
13,56 MHz
NFC Forum Type 2
ISO/IEC 14443 Type A
NDEF
Read/Write
Rewritable
Compatible Android et iPhone
```

Mémoire indicative :

- NTAG213 : 144 octets utilisateur ;
- NTAG215 : 504 octets ;
- NTAG216 : 888 octets.

Le NTAG213 suffit pour une URL courte.

À éviter :

```text
125 kHz
EM4100
TK4100
UID card
Access control card
Read only
Pre-locked
```

Pour une surface métallique, prendre un modèle :

```text
anti-metal / on-metal / ferrite
```

Le métal peut bloquer une puce standard. Tester la carte dans son installation réelle.


## 11. Kit de démarrage

Matériel minimum :

- smartphone Android avec NFC ;
- iPhone récent disponible pour les tests ;
- ordinateur ;
- connexion Internet ;
- 20 cartes NFC NTAG213 ;
- quelques stickers standards ;
- 5 stickers anti-métal ;
- prototypes de chevalets ou plaques ;
- emballages simples ;
- imprimante papier pour maquettes.

Ne pas commander un gros volume avant de tester :

- puces ;
- distance de lecture ;
- compatibilité Android/iPhone ;
- humidité et chaleur ;
- impression ;
- surface métallique ;
- taux de défaut fournisseur.

Facultatif au départ :

- lecteur NFC USB ;
- imprimante PVC ;
- imprimante UV ;
- machine de découpe ;
- plastifieuse.


## 12. Logiciels

### Programmation NFC

Application recommandée : NFC Tools.

Procédure :

```text
Écrire
→ Ajouter un enregistrement
→ URL/URI personnalisée
→ coller l’URL courte
→ Écrire
→ approcher la carte
```

Utiliser un enregistrement URL et non un simple texte.

### Autres outils

- Google Cloud Console ;
- curl ou Postman ;
- script ou interface interne ;
- Canva, Inkscape, Affinity Designer ou Illustrator ;
- générateur de QR code statique ;
- Google Sheets, Excel, Airtable ou Notion ;
- outil de facturation ;
- gestionnaire de mots de passe ;
- CRM à terme.

Le QR code doit contenir exactement la même URL courte que la puce.


## 13. Procédure opérationnelle standard

1. Qualifier le business et sa fiche Google.
2. Demander en priorité le lien au propriétaire.
3. Utiliser l’API en secours ou pour automatiser.
4. Vérifier précisément la fiche.
5. Créer une URL courte HTTPS.
6. Créer le QR code.
7. Programmer la puce.
8. Relire la puce et vérifier qu’elle ne contient qu’une URL.
9. Tester sur Android et iPhone.
10. Tester sur le support final.
11. Faire valider le nom, l’adresse, le visuel et la destination par le client.
12. Livrer avec notice et conditions.
13. Conserver le mapping client, Place ID, URL Google et URL courte.
14. Prévoir maintenance et contrôle annuel.

Ne verrouiller la carte en lecture seule qu’après validation complète. Certains verrouillages sont irréversibles.


## 14. Checklist qualité

```text
□ Puce détectée
□ Type NTAG compatible
□ Carte inscriptible
□ Une seule URL NDEF
□ URL HTTPS
□ Redirection fonctionnelle
□ Bonne fiche Google
□ Nom correct
□ Adresse et commune correctes
□ Interface d’avis ouverte
□ QR code identique
□ Test Android
□ Test iPhone
□ Test avec coque
□ Test sur support final
□ Test anti-métal si nécessaire
□ Validation du client
□ Base clients mise à jour
□ Verrouillage non prématuré
```


## 15. Base clients

Champs recommandés :

| Champ | Exemple |
|---|---|
| Référence | CL-001 |
| Business | Restaurant Teva |
| Commune / île | Punaauia / Tahiti |
| Contact | Responsable |
| Place ID | ChIJ... |
| Fiche Google | URL publique |
| Lien Review | writeAReviewUri |
| Source | Propriétaire / API |
| URL courte | /avis/restaurant-teva |
| Support | Carte PVC |
| Puce | NTAG213 |
| Anti-métal | Oui / Non |
| QR code | Fichier |
| Date de programmation | Date |
| Test Android/iPhone | Oui / Non |
| Validation client | Oui / Non |
| Livraison | Date |
| Contrôle annuel | Date |
| Maintenance | Formule |


## 16. Statistiques

Une redirection peut mesurer :

- ouvertures ;
- dates ;
- établissement ;
- support ou campagne ;
- type général d’appareil.

Attention :

```text
Une ouverture ≠ un avis publié
```

Présenter « nombre d’ouvertures du lien », jamais « nombre d’avis obtenus ».

Limiter la collecte de données et prévoir une information de confidentialité.


## 17. Modèles de revenus

Options à étudier :

### Vente unique

- support ;
- personnalisation ;
- programmation ;
- QR code ;
- livraison.

### Frais de mise en service

- vérification de la fiche ;
- configuration de l’URL ;
- programmation ;
- installation.

### Abonnement

- hébergement de la redirection ;
- mises à jour ;
- contrôle annuel ;
- statistiques ;
- support ;
- remplacement préférentiel.

### Packs

- pack comptoir ;
- pack restaurant ;
- pack hôtel ;
- pack multi-supports ;
- pack multi-sites ;
- offre premium personnalisée.

### Partenariats et marque blanche

- agences web ;
- imprimeurs ;
- community managers ;
- agences de communication ;
- consultants marketing ;
- acteurs touristiques.


## 18. Coûts à intégrer

- cartes et tags NFC ;
- prototypes et taux de défaut ;
- importation vers la PF ;
- transport, taxes et douane ;
- impression et personnalisation ;
- emballage ;
- livraison et déplacements ;
- domaine et hébergement ;
- redirections ;
- Google API ;
- logiciels ;
- assurance ;
- support après-vente ;
- remplacement ;
- temps de configuration ;
- temps commercial ;
- commissions de paiement ;
- fiscalité locale ;
- acquisition client.


## 19. Risques

Techniques :

- mauvaise fiche ;
- lien obsolète ;
- Place ID modifié ;
- serveur indisponible ;
- puce défectueuse ;
- verrouillage prématuré ;
- mauvaise lecture sur métal ;
- QR code mal imprimé.

Financiers :

- clé API compromise ;
- dépassement de quota ;
- hausse des prix ;
- logistique coûteuse ;
- marge matérielle trop faible.

Commerciaux :

- confusion avec l’achat d’avis ;
- promesse excessive ;
- faible utilisation du support ;
- concurrence low-cost ;
- retour sur investissement difficile à prouver.

Conformité :

- avis incités ;
- demande de cinq étoiles ;
- faux avis ;
- collecte excessive de données ;
- présentation laissant croire à un produit officiel Google.

Opérationnels :

- erreurs de programmation ;
- cartes inversées entre clients ;
- perte du mapping ;
- absence de sauvegarde ;
- contrôle qualité insuffisant.


## 20. MVP conseillé

Tester avec 5 à 10 entreprises :

- restaurant ;
- salon ;
- hôtel ou pension ;
- prestataire touristique ;
- commerce de proximité.

MVP :

- 20 cartes NTAG213 ;
- 5 tags anti-métal ;
- 3 formats de support ;
- domaine et redirections HTTPS ;
- NFC Tools ;
- tableur clients ;
- procédure manuelle ;
- lien propriétaire en priorité ;
- API en secours.

Mesurer :

- disposition à payer ;
- temps de configuration ;
- coût complet ;
- taux d’utilisation ;
- objections ;
- satisfaction ;
- demande de maintenance ;
- formats préférés.


## 21. Roadmap

### Phase 1 — Validation

Prototypes, tests, premiers clients, processus manuel.

### Phase 2 — Standardisation

Packs, modèles graphiques, contrats, procédures et prix.

### Phase 3 — Automatisation

Outil interne, API, génération des slugs et QR codes, dashboard.

### Phase 4 — Scalabilité

Portail client, multi-sites, partenaires, marque blanche, abonnements et stock local.


## 22. Questions à traiter pour le business model

1. Quel segment tahitien cibler en premier ?
2. Quelle douleur est la plus forte ?
3. Quel format offre la meilleure marge ?
4. Quelle disposition à payer en XPF ?
5. Produit seul ou service clé en main ?
6. Quel abonnement de maintenance ?
7. Quelle personnalisation inclure ?
8. Quels coûts réels d’importation ?
9. Importer ou produire localement ?
10. Quel fournisseur et quel taux de défaut ?
11. Quel outil de redirection ?
12. Quel hébergement et quelles sauvegardes ?
13. Quelles statistiques proposer ?
14. Quel contrat et quelle garantie ?
15. Quel délai de livraison ?
16. Quel canal d’acquisition ?
17. Vente directe ou partenaires ?
18. Comment démontrer la valeur sans promettre d’avis ?
19. Quelle offre d’entrée ?
20. Quel modèle de revenu récurrent ?
21. Quelle structure juridique et fiscale en PF ?


## 23. Documents à produire ensuite

- Business Model Canvas ;
- étude de marché ;
- personas ;
- grille tarifaire ;
- calcul de marge ;
- prévisionnel ;
- seuil de rentabilité ;
- plan de lancement ;
- plan de prospection ;
- script commercial ;
- offre PDF ;
- conditions générales ;
- formulaire d’onboarding ;
- checklist de livraison ;
- tableau de suivi ;
- cahier des charges technique ;
- politique de confidentialité ;
- FAQ client.


## 24. Sources à revalider

- Place IDs :  
  https://developers.google.com/maps/documentation/places/web-service/place-id?hl=fr

- Google Maps links et `writeAReviewUri` :  
  https://developers.google.com/maps/documentation/places/web-service/maps-links

- Text Search (New) :  
  https://developers.google.com/maps/documentation/places/web-service/text-search

- Tarification :  
  https://developers.google.com/maps/billing-and-pricing/pricing

- Sécurité API :  
  https://developers.google.com/maps/api-security-best-practices

- Puces NTAG :  
  https://www.nxp.com/products/NTAG213_215_216

- NFC Tools :  
  https://www.wakdev.com/

Les prix, quotas, conditions et statuts de préversion doivent être vérifiés au moment du lancement.


## 25. Prompt de reprise pour Claude

```text
Tu es consultant en stratégie, business model, lancement commercial et services
numériques en Polynésie française.

À partir du mémoire fourni, construis un business model réaliste pour une
activité de création et vente de supports NFC et QR code facilitant la collecte
d’avis Google authentiques.

Travaille en XPF et tiens compte :
- du marché tahitien ;
- de la petite taille du marché ;
- des coûts et délais d’importation ;
- des taxes et contraintes logistiques ;
- des règles Google ;
- de la maintenance des redirections ;
- d’un lancement avec peu de capital ;
- des opportunités de revenu récurrent.

Produis :
1. un Business Model Canvas ;
2. trois offres commerciales ;
3. une grille tarifaire indicative en XPF ;
4. une structure de coûts ;
5. un calcul de marge ;
6. un seuil de rentabilité ;
7. un plan MVP sur 90 jours ;
8. un plan de prospection ;
9. les risques et mesures de réduction ;
10. les hypothèses à tester ;
11. dix questions à poser à des commerçants pilotes.

Distingue clairement les faits, les hypothèses et les recommandations.
Signale les données qui nécessitent une recherche locale ou une mise à jour.
```


## 26. Synthèse

Le projet défendable n’est pas une simple revente de cartes NFC.

Il combine :

```text
Support physique
+ bonne fiche Google
+ lien Review vérifié
+ URL courte maîtrisée
+ QR code
+ personnalisation
+ contrôle qualité
+ maintenance
+ accompagnement local
```

La priorité est de valider la demande et la disposition à payer avant d’investir dans une production interne ou une plateforme complexe.

Le lien transmis par le propriétaire est la méthode la plus simple. Places API est une solution de secours et d’automatisation.

La carte doit contenir une URL courte contrôlée, jamais une clé API ni un appel API exécuté à chaque scan.

La promesse commerciale doit rester : faciliter la collecte d’avis authentiques, sans garantir leur nombre ni leur publication.
