# MIERR — site web

Site vitrine statique en **HTML / CSS / JavaScript**, sans framework ni base de données.
Il fonctionne sur n'importe quel hébergement (OVH, Hostinger, Netlify, GitHub Pages, cPanel…) :
il suffit de déposer le contenu de ce dossier (`mierr/`) à la racine du serveur, ou de le
garder tel quel s'il est déjà servi depuis `docs/mierr/` (GitHub Pages).

Ce site est **indépendant** du reste du dépôt : il ne modifie aucun fichier du site
« La Grande Royale » déjà présent dans `docs/`.

---

## 1. Contenu du dossier

```
index.html               Accueil
la-mierr.html             La MIERR : identité, historique, organisation, galerie historique
departements.html         SEMIC, JEMOC, SEMIFIG, sections, service des événements, communication
activites.html             Convention, CO-SEMIC, CO-JEMOC, Vision de l'Aigle, Pentecôte,
                           discipolat, calendrier des activités
institut-biblique.html    Institut biblique de formation pastorale de Sion + inscription
presse.html                Publications, vidéothèque, médiathèque audio, maison d'édition Schékina
galerie.html               Galerie photo filtrable + lightbox
actualites.html            Liste des actualités de l'église
contact.html                Coordonnées, réseaux sociaux, carte, formulaire, mentions légales
assets/css/style.css       Toute la mise en forme
assets/js/script.js        Toutes les interactions
assets/img/                Visuels de substitution (SVG) à remplacer par les vraies photos
LISEZ-MOI.md               Ce document
```

Les polices **Playfair Display** et **Work Sans** sont chargées depuis Google Fonts.

Ce site couvre l'intégralité du cahier des charges transmis par la MIERR : identité,
histoire, organisation, départements/sections/services, presse (dont Schékina), activités
et calendrier, Institut biblique de Sion avec formulaire d'inscription, actualités, galerie,
contact, et un menu/pied de page communs à toutes les pages.

---

## 2. Ce qui reste à compléter

Ce premier lot est une **maquette statique complète** : toutes les pages, sections et
composants prévus par le cahier des charges sont en place, mais une grande partie du
contenu réel n'a pas encore été fournie par la MIERR. Tout texte entre **[crochets]**
est un espace réservé à compléter :

- **Logo officiel** : remplacez `assets/img/logo-mierr.svg` et `assets/img/favicon.svg`
  par le vrai logo de la MIERR (formats recommandés : SVG ou PNG à fond transparent).
- **Couleurs officielles** : la palette actuelle (bleu profond + or) est provisoire —
  voir la section « Couleurs » ci-dessous pour la remplacer en un seul endroit.
- **Photos** : toutes les images de `assets/img/` sont des visuels générés (fonds dégradés
  avec initiales). Remplacez-les par de vraies photos en `.jpg` ou `.webp`, puis mettez à
  jour l'extension dans les fichiers HTML concernés (`.svg` → `.jpg`).
- **Historique détaillé** (`la-mierr.html`) : dates précises, faits marquants et légendes
  de chaque étape de la frise chronologique.
- **Organisation** (`la-mierr.html`) : noms et fonctions des garants de la vision, du
  conseil pastoral, des leaders et responsables.
- **Départements et sections** (`departements.html`) : identité, mission, objectifs,
  responsables, activités et programmes de SEMIC, JEMOC, SEMIFIG, section des travailleurs
  salariés et section des entrepreneurs.
- **Activités** (`activites.html`) : thèmes, dates, lieux, prédicateurs/intervenants de
  chaque événement, et entrées réelles du calendrier.
- **Institut biblique** (`institut-biblique.html`) : histoire, niveaux de formation,
  matières enseignées, conditions d'admission, durée et calendrier des sessions.
- **Presse et Schékina** (`presse.html`) : vraies publications, catalogue des ouvrages,
  identifiants des vidéos YouTube.
- **Coordonnées** (`contact.html` et pied de page de toutes les pages) : adresse,
  téléphone, e-mail, lien Google Maps, mentions légales (éditeur, responsable de
  publication, hébergeur).
- **Réseaux sociaux** : les icônes Facebook / YouTube / WhatsApp / Instagram / TikTok du
  pied de page pointent vers `#` — à relier aux vrais comptes de la MIERR.

---

## 3. Réglages rapides

### Numéro WhatsApp et e-mails

Dans `assets/js/script.js`, tout en haut :

```js
var CONFIG = {
  whatsapp: "22600000000",   // numéro international, sans le "+" — A REMPLACER
  messageWhatsapp: "Bonjour MIERR, je souhaite avoir des renseignements...",
  emails: ["contact@mierr.org"] // A REMPLACER par les vraies adresses de la MIERR
};
```

Tous les boutons WhatsApp du site (dont le bouton flottant) utilisent ce numéro ; tous les
formulaires envoient vers ces adresses e-mail.

### Couleurs

Dans `assets/css/style.css`, section `:root` :

```css
--bleu: #0F2340;   /* couleur principale (foi, profondeur)   */
--or:   #C9A227;   /* couleur d'accent (gloire, réveil)      */
--ivoire: #FAF7F0; /* fond clair                             */
```

Modifier ces valeurs suffit à changer l'identité visuelle de l'ensemble du site — à faire
dès que les couleurs officielles de la MIERR seront communiquées.

### Vidéos YouTube

Chaque vignette vidéo (accueil, `presse.html#videotheque`) a un attribut `data-video` vide :

```html
<div class="video-tuile galerie-item" data-video="">
```

Renseignez-y l'identifiant de la vidéo YouTube (la partie après `watch?v=`), par exemple
`data-video="dQw4w9WgXcQ"`. La vidéo se charge au clic seulement, pour garder la page rapide.

---

## 4. Les formulaires

Le site étant purement statique, les formulaires (`contact.html`,
`institut-biblique.html#inscription`) **vérifient les champs obligatoires puis ouvrent le
logiciel de messagerie du visiteur** avec un message pré-rempli adressé aux e-mails
définis dans `CONFIG.emails`.

Pour recevoir les messages directement dans une boîte mail, sans passer par le logiciel du
visiteur, deux solutions gratuites et sans serveur :

1. **Formspree** (formspree.io) — créez un formulaire, récupérez son adresse, puis
   remplacez `<form class="formulaire" data-formulaire ...>` par
   `<form class="formulaire" action="https://formspree.io/f/VOTRE_ID" method="POST">`
   et retirez l'attribut `data-formulaire` (qui déclenche l'ouverture de la messagerie).
2. **Web3Forms** (web3forms.com) — même principe, avec une clé d'accès.

Le paramètre `?objet=…` fonctionne déjà : par exemple
`contact.html?objet=Institut%20biblique#contact` présélectionne l'objet correspondant
dans le formulaire de contact.

---

## 5. Vers un vrai espace d'administration

Le cahier des charges prévoit un tableau de bord permettant à un administrateur de publier
des actualités, gérer le calendrier, les photos, vidéos, audios, documents, les fiches des
départements et responsables, ainsi que les inscriptions à l'Institut biblique — sans
toucher au code.

Ce premier lot est **volontairement statique** (pages HTML éditées directement), afin de
livrer rapidement une base complète, conforme au cahier des charges, avec du contenu à
brancher. La mise en place d'un vrai back-office nécessite une étape technique
supplémentaire, à discuter avec la MIERR : choix d'un CMS (headless ou classique) ou d'une
petite application sur mesure (authentification, base de données, formulaires connectés),
et choix d'un hébergement adapté (le simple hébergement statique actuel ne suffira plus).

En attendant, toute mise à jour de contenu (actualités, événements, photos, responsables…)
se fait en éditant directement les fichiers `.html` concernés, en suivant les modèles de
blocs déjà en place (cartes, lignes d'événements, frise chronologique, etc.).

---

## 6. Ce qui est déjà en place

- Menu fixe qui devient opaque au défilement, menu plein écran sur téléphone
- Barre de progression de lecture en haut de page
- Animations d'apparition au défilement (désactivées si le visiteur a demandé la
  réduction des animations dans son système)
- Onglets pour les départements et les activités (avec lien direct par ancre, ex.
  `departements.html#semic`)
- Frise chronologique interactive pour l'historique de la MIERR
- Galerie filtrable + lightbox (flèches, touche Échap, navigation au clavier)
- Accordéons pour les formations de l'institut et les mentions légales
- Formulaires avec validation et pré-remplissage par e-mail
- Bouton WhatsApp flottant sur toutes les pages
- Balises `<meta>` pour le référencement et le partage sur les réseaux sociaux
- Feuille de style d'impression

---

## 7. Mise en ligne

1. Vérifiez le site en local : ouvrez `index.html` dans un navigateur.
2. Envoyez **tout le dossier** `mierr/` (les 9 fichiers `.html` + le dossier `assets/`)
   à la racine de votre hébergement — ou conservez-le dans `docs/mierr/` si le site est
   déjà publié via GitHub Pages depuis le dossier `docs/`.
3. La page d'accueil est `index.html`.
