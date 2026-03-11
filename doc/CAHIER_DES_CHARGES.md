# Cahier des charges — Site web pédagogique sur les sciences de l'espace

## 1. Contexte & objectifs

**Contexte.**  
Création d’un site web pédagogique présentant des concepts liés aux sciences de l’espace, dans l’esprit de plateformes comme Khan Academy/Udemy : parcours structurés, nombreuses illustrations, et simulations interactives pour favoriser la compréhension.

**Objectifs.**

- Offrir des parcours d’apprentissage modulaires et progressifs (cours → chapitres → leçons).
- Faciliter la création et la mise à jour du contenu par des auteurs non techniques (sans toucher au code).
- Intégrer des médias riches (images, vidéos, animations) et des simulations interactives.
- Garantir accessibilité, performance, sécurité et référencement (SEO).

## 2. Public cible

- Élèves à l’université en initiation aux sciences de l’espace.
- Curieux et autodidactes recherchant des contenus vulgarisés de qualité.
- Enseignants souhaitant réutiliser des modules, visuels et exercices.

## 3. Périmètre fonctionnel

### 3.1 Parcours d’apprentissage

- Structure hiérarchique : **Programme → Cours → Chapitre → Leçon**.
- Pages de leçon avec :
    - titre
    - objectifs pédagogiques
    - corps de texte
    - encadrés
    - glossaire
    - médias
    - quiz
- Suivi de progression (pourcentage, leçons terminées, reprise où l’on s’est arrêté).  
  _Optionnel en phase 2._

### 3.2 Contenus riches

- Galerie d’images haute résolution avec légendes et crédits.
- Insertion de vidéos (hébergement externe ou interne) avec chapitrage et transcription.
- Simulations interactives intégrées (iframes, widgets, ou composants dédiés) avec instructions et consignes d’usage.

### 3.4 Recherche & navigation

- Menu par thématiques et niveaux
- Fil d’Ariane
- Navigation **leçon précédente / suivante**

Recherche plein texte avec filtres :

- thème
- niveau
- type de média
- durée

### 3.5 Interactivité & évaluation

- Quiz :
    - QCM
    - vrai/faux
    - appariement  
      avec feedback immédiat.
- Exercices pratiques autour des simulations (consignes, objectifs, questions).

## 4. Exigences non fonctionnelles

- **Accessibilité** : conformité WCAG 2.2 niveau AA  
  (navigation clavier, contrastes, sous-titres, descriptions).

- **Performance** :  
  temps de chargement **LCP < 2,5 s** sur connexion 4G  
  images responsives et lazy-loading.

- **SEO** :
    - balisage sémantique
    - métadonnées Open Graph
    - sitemap
    - microdonnées
    - URL lisibles

- **Sécurité** :
    - HTTPS
    - protections contre XSS / CSRF
    - gestion des rôles
    - sauvegardes
    - journalisation

- **RGPD / Confidentialité** :
    - bandeau consentement
    - politique de confidentialité
    - anonymisation analytique

- **Internationalisation** :
    - FR (initial)
    - extensible EN  
      gestion **i18n** pour contenus et interface.

## 5. Architecture recommandée

Stack **Astro + Starwind UI**  
(gratuit, simple pour étudiants, auto-hébergé).

### 5.1 Générateur / UI

- **Framework** : Astro (islands architecture, très performant).
- **Template** : Starwind UI pour design et composants prêts.

### 5.2 Contenu

- **Format** : MDX (Markdown + components)
- **Structure** : dossiers par cours / chapitre + frontmatter pour méta
    - langue
    - niveau
    - tags
- **Équations** : KaTeX client-side.

### 5.3 Édition / workflow auteur

**Phase 1 (simple, gratuit)**

- GitHub web editor
- auteurs éditent MDX dans l’interface GitHub

**Review / versioning**

- GitHub Pull Requests

### 5.4 Simulations & interactivité

- **3D** : Three.js (Astro islands)  
  ou **react-three-fiber**

- **Graphiques / plots**
    - Plotly.js
    - Vega-Lite
    - D3

- Chargement ciblé : utiliser **islands** pour charger JS seulement sur les pages avec simulation.

- Exécutions interactives côté client :
    - **JupyterLite**
    - **Pyodide**  
      pour notebooks Python dans le navigateur.

- **MATLAB**
    - fournir fichiers `.m` téléchargeables
    - ou réimplémenter en JS  
      (éviter MATLAB web pour les licences).

### 5.5 i18n (fr/en)

Approche :

- dossiers `fr/` et `en/`
- plugin i18n Astro  
  ou routing manuel via layout.

Traduction :

- fichiers MDX séparés par langue  
  ou frontmatter + système de traduction.

### 5.6 Médias

- Images / vidéos :
    - dans le repo pour petits fichiers
    - Cloudinary (free tier)
    - ou stockage S3 / Wasabi

- PDFs :
    - liens de téléchargement dans les leçons.

### 5.7 Recherche & fulltext

**Option gratuite**

- Lunr.js
- Simple-JS search  
  (index généré au build)

**Option scalable**

- Algolia DocSearch (si éligible open source)

### 5.8 Hébergement & CI/CD

**Hébergement recommandé**

- GitHub Pages
- Netlify

**Déploiement**

- push → build automatique depuis GitHub

**CI additionnel**

- GitHub Actions pour tests / builds personnalisés.

### 5.9 Authentification & suivi (plus tard)

- Auth / users :
    - Supabase
    - Netlify Identity

- Tracking progression :
    - serverless Supabase / Postgres
    - ou fichiers JSON versionnés au départ.

### 5.10 Observabilité & performance

- Minimiser JS initial (Astro islands).
- Optimisation d’image via :
    - `@astrojs/image`
    - Cloudinary

**Structure de repo suggérée**

```
/src/pages — MDX pages (fr/en)
/src/components — composants UI + composants simulation
/public — images, PDFs

astro.config.mjs
package.json
i18n config
netlify/cloudflare config
```

## 6. Intégrations & données

- **Analytics**
    - Matomo
    - Google Analytics 4 (avec consentement)

- Tableaux de bord pédagogiques.

- **Formulaires**
    - contact
    - feedback par leçon
    - signalement d’erreurs
    - suggestions

- **CDN**
  pour médias lourds (images / vidéos)
    - optimisation et transformation d’images.

## 7. Gouvernance éditoriale & workflow

**Rôles**

- Auteurs — rédaction
- Éditeurs — relecture
- Responsable pédagogique — validation
- Admin — technique

**Processus**

1. Idéation
2. Rédaction
3. Relecture scientifique
4. Révision accessibilité / SEO
5. Validation
6. Publication

Calendrier éditorial **trimestriel** + backlog des leçons.

## 8. Maquettes & UI (description)

**Page d’accueil**

- héros visuel
- accès rapide aux parcours
- recherche
- ressources mises en avant

**Page cours**

- objectifs
- plan des chapitres
- prérequis
- durée estimée

**Page leçon**

- contenu par blocs
- encadrés **« À retenir »**
- quiz
- simulations
- liens **« pour aller plus loin »**

## 9. Planning indicatif & livrables

- TODO

## 10. Critères d’acceptation

- Un parcours complet publié :
    - ≥ 3 chapitres
    - ≥ 10 leçons
    - images
    - ≥ 1 vidéo
    - ≥ 1 simulation intégrée.

- Édition complète réalisable par un **auteur non technique** sans développeur.

- Conformité **WCAG 2.2 AA** sur un échantillon de pages.
