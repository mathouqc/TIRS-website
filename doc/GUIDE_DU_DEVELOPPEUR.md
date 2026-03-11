# Guide du développeur — TIRS Website

## 1. Objectif du guide

Ce guide explique:

- les technologies utilisées pour construire le site
- les fonctionnalités déjà implémentées et leur fonctionnement général
- la méthode pour contribuer au projet, même sans connaissance préalable d'Astro, MDX, Tailwind ou Three.js

Public visé:

- nouveaux contributeurs
- étudiants qui rejoignent le projet
- toute personne qui veut corriger, améliorer, traduire ou ajouter du contenu

---

## 2. Démarrage rapide (10 minutes)

### 2.1 Prérequis

- Node.js 20+
- npm
- Git

### 2.2 Installation

```bash
npm install
```

### 2.3 Lancement local

```bash
npm run dev
```

### 2.4 Build de vérification

```bash
npm run build
```

Scripts disponibles (dans `package.json`):

- `npm run dev` — lance le serveur de développement Astro
- `npm run build` — génère le site statique
- `npm run preview` — prévisualise la version buildée

---

## 3. Technologies utilisées (explication simple)

### 3.1 Astro (framework principal)

Rôle:

- génère des pages très performantes (HTML statique)
- charge JavaScript uniquement quand nécessaire (architecture islands)

Concrètement dans ce projet:

- pages dans `src/pages`
- layouts dans `src/layouts`
- composants UI dans `src/components`

### 3.2 MDX (contenu des leçons)

Rôle:

- écrire les leçons comme du Markdown enrichi
- insérer des composants interactifs dans les leçons

Concrètement:

- les leçons sont dans `src/pages/fr/lessons` et `src/pages/en/lessons`
- chaque leçon MDX utilise `@/layouts/LessonLayout.astro`

### 3.3 React + Three.js (interactivité)

Rôle:

- React sert à créer des composants interactifs côté client
- Three.js sert aux scènes 3D (simulation visuelle)

Concrètement:

- exemple actuel: `src/components/ThreeIsland.jsx`
- utilisé dans les leçons avec `client:load`

### 3.4 Tailwind CSS + Starwind UI (design système)

Rôle:

- Tailwind fournit des classes utilitaires pour le style
- Starwind fournit des composants UI prêts à l'emploi

Concrètement:

- styles globaux: `src/styles/global.css` et `src/styles/starwind.css`
- composants Starwind: `src/components/starwind`

### 3.5 KaTeX + remark-math/rehype-katex (équations)

Rôle:

- afficher des équations mathématiques dans le contenu MDX

Concrètement:

- configuré dans `astro.config.mjs`
- style KaTeX chargé dans `src/layouts/BaseLayout.astro`

---

## 4. Architecture actuelle du projet

### 4.1 Dossiers importants

- `src/pages` — routes du site (FR/EN)
- `src/layouts` — structure des pages
- `src/components` — composants réutilisables
- `src/lib` — utilitaires (ex: i18n)
- `src/i18n/translations` — dictionnaires de traductions
- `src/styles` — styles et tokens de design
- `public` — assets statiques
- `doc` — documentation projet

### 4.2 Alias d'import

Le projet utilise l'alias `@` pour pointer vers `src`.

Exemple:

- `@/layouts/PageLayout.astro`
- `@/lib/i18n`

---

## 5. Fonctionnalités implémentées (état actuel)

### 5.1 Internationalisation FR/EN

Ce qui existe:

- routes préfixées `/fr/...` et `/en/...`
- locale par défaut: `fr`
- redirection de `/` vers `/fr/`
- dictionnaires de traduction typés

Fonctionnement général:

- la locale est déduite depuis l'URL (`src/lib/i18n.ts`)
- les composants lisent les textes via `t(locale)`
- le switch de langue garde la page courante (Header/Footer)

### 5.2 Navigation globale

Ce qui existe:

- header responsive (desktop + menu mobile)
- footer avec liens principaux
- navigation localisée automatiquement

Fichiers clés:

- `src/components/Header.astro`
- `src/components/Footer.astro`

### 5.3 Pages de contenu FR/EN

Ce qui existe:

- pages statiques FR/EN (`index`, `about`)
- leçons MDX FR/EN (`intro`, `history-of-astronomy-1`, `history-of-astronomy-2`)

Fonctionnement général:

- une page par langue
- layouts communs pour mutualiser l'affichage

### 5.4 Leçons avec sommaire automatique

Ce qui existe:

- `LessonLayout` génère un sommaire latéral à partir des headings MDX
- support des niveaux de titres 1 à 3

Fichier clé:

- `src/layouts/LessonLayout.astro`

### 5.5 Thème clair/sombre

Ce qui existe:

- gestion du thème dans `localStorage` (`colorTheme`)
- fallback automatique sur la préférence système
- classe `dark` appliquée sur `<html>`

Fichiers clés:

- `src/layouts/BaseLayout.astro`
- `src/styles/starwind.css`

### 5.6 Système de couleurs (tokens)

Ce qui existe:

- palette de marque `--brand-*`
- tokens sémantiques (`--background`, `--foreground`, `--primary`, etc.)
- mapping vers classes utilitaires Tailwind

Fichiers clés:

- `src/styles/starwind.css`
- `src/styles/global.css`

### 5.7 Simulation 3D (prototype)

Ce qui existe:

- composant React + Three.js avec cube animé
- rendu côté client uniquement (island)

Fichier clé:

- `src/components/ThreeIsland.jsx`

---

## 6. Comment contribuer sans connaître la stack

### 6.1 Contribuer uniquement au contenu (chemin le plus simple)

1. Choisir une leçon FR et sa version EN
2. Modifier le fichier `.mdx`
3. Vérifier en local avec `npm run dev`
4. Ouvrir une Pull Request

### 6.2 Ajouter une nouvelle traduction globale

1. Ajouter la clé dans `src/i18n/translations/schema.ts`
2. Ajouter la valeur FR dans `src/i18n/translations/fr.ts`
3. Ajouter la valeur EN dans `src/i18n/translations/en.ts`
4. Utiliser la clé dans un composant via `t(locale)`

### 6.3 Ajouter une nouvelle page FR + EN

1. Créer la page FR dans `src/pages/fr/...`
2. Créer la page EN dans `src/pages/en/...`
3. Mettre à jour la navigation si nécessaire
4. Vérifier les deux routes en local

### 6.4 Ajouter une nouvelle leçon MDX

1. Créer un fichier dans `src/pages/fr/lessons/...`
2. Créer le miroir EN dans `src/pages/en/lessons/...`
3. Ajouter le frontmatter (`layout`, `title`, `lang`)
4. Vérifier l'affichage et le sommaire auto

---

## 7. Fonctionnement général des pages

### 7.1 Chaîne de rendu

1. Astro résout la route (`src/pages`)
2. Le layout applique la structure commune (`BaseLayout`, `PageLayout`, `LessonLayout`)
3. Header/Footer appliquent l'i18n et la navigation localisée
4. Si une island est présente, son JS est chargé côté client seulement

### 7.2 Où lire quoi

- logique i18n: `src/lib/i18n.ts`
- dictionnaires: `src/i18n/translations`
- shell global HTML/thème/footer: `src/layouts/BaseLayout.astro`
- pages standards: `src/layouts/PageLayout.astro`
- pages de leçon: `src/layouts/LessonLayout.astro`

---

## 8. Bonnes pratiques de contribution

- toujours faire les modifications FR et EN ensemble
- garder les mêmes clés de traduction dans `fr.ts` et `en.ts`
- éviter les couleurs en dur dans les composants; utiliser les tokens
- privilégier les composants existants dans `src/components/starwind`
- vérifier le build avant PR (`npm run build`)
- garder les commits petits et ciblés

---

## 9. Checklist avant Pull Request

- [ ] le site démarre avec `npm run dev`
- [ ] le build passe avec `npm run build`
- [ ] les routes FR/EN fonctionnent
- [ ] les textes ajoutés sont traduits dans les deux langues
- [ ] pas de régression visuelle évidente en clair/sombre
- [ ] la documentation a été mise à jour si nécessaire (`doc/`)

---

## 10. Limites actuelles et prochaines étapes

Limites actuelles (prototype):

- nombre limité de pages et de leçons
- recherche plein texte non encore implémentée
- quiz/exercices interactifs non finalisés
- suivi de progression utilisateur non implémenté

Prochaines étapes naturelles:

- enrichir le contenu pédagogique FR/EN
- ajouter les composants quiz
- intégrer la recherche sur les leçons
- renforcer accessibilité et SEO selon le cahier des charges

---

## 11. Références utiles

- `README.md`
- `doc/CAHIER_DES_CHARGES.md`
- `doc/HOW_TO.md`
- `doc/TODO.md`
- `astro.config.mjs`

---

## 12. Parcours développeur frontend débutant (pas à pas)

Cette section est pensée pour une personne qui n'a jamais utilisé Astro/Tailwind.

### 12.1 Ce que tu dois comprendre en premier

- une page = un fichier dans `src/pages`
- le style = classes Tailwind + variables dans `src/styles/starwind.css`
- le layout = structure commune (header, footer, largeur de page)
- l'i18n = mêmes pages et textes en FR et EN

### 12.2 Ta première contribution recommandée (30 à 60 min)

Objectif: ajouter une petite section visuelle sur la page d'accueil FR et EN.

1. Ouvrir `src/pages/fr/index.astro`
2. Ajouter un bloc simple (titre + paragraphe + bouton)
3. Refaire la même modification dans `src/pages/en/index.astro`
4. Lancer `npm run dev` et vérifier les deux pages
5. Lancer `npm run build` pour valider

Pourquoi ce premier exercice:

- il fait manipuler les routes, le layout et les composants
- il oblige à respecter la logique bilingue du projet

### 12.3 Exemple de boucle de travail (à répéter)

1. Choisir une tâche petite et claire
2. Repérer le fichier à modifier
3. Modifier FR puis EN
4. Vérifier visuellement en local
5. Vérifier le build
6. Ouvrir une PR avec une description courte

### 12.4 Où modifier selon ton objectif

- changer un texte de navigation: `src/i18n/translations/fr.ts` et `src/i18n/translations/en.ts`
- ajouter une page standard: `src/pages/fr/...` et `src/pages/en/...`
- ajouter une leçon: `src/pages/fr/lessons/...` et `src/pages/en/lessons/...`
- modifier header/footer: `src/components/Header.astro`, `src/components/Footer.astro`
- modifier couleurs globales: `src/styles/starwind.css`

### 12.5 Erreurs fréquentes (et comment les éviter)

- oublier la version EN après une modif FR
- ajouter une clé de traduction dans une langue seulement
- écrire des couleurs en dur au lieu d'utiliser les tokens
- oublier de lancer `npm run build` avant PR
- casser un chemin en enlevant le préfixe `/fr` ou `/en`

### 12.6 Règle d'or pour contribuer sereinement

Si tu hésites, commence par une modification purement visuelle sur une page existante, puis augmente progressivement:

1. texte et mise en page
2. composant partagé
3. nouvelle page
4. logique i18n
5. interactivité (React/Three.js)

### 12.7 Mini-glossaire utile

- Astro: framework qui génère les pages
- Layout: squelette de page réutilisé
- MDX: Markdown enrichi avec composants
- Island: composant interactif chargé côté client
- Token de couleur: variable CSS centralisée pour le thème

