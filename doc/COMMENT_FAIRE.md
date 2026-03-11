# HOW TO — i18n et pages de contenu FR/EN

Ce document explique ce qui est en place dans le projet et la procédure à suivre pour:

- ajouter des traductions i18n globales (UI partagée: header, footer, labels)
- ajouter des pages de contenu en français et en anglais

## 1. État actuel de l'i18n

Le projet utilise une stratégie simple et robuste:

- routing par préfixe de langue dans l'URL: `/fr/...` et `/en/...`
- dictionnaires de traductions typés dans `src/i18n/translations`
- utilitaires de locale et de chemins dans `src/lib/i18n.ts`
- composants globaux (Header/Footer/Layout) qui lisent la locale et affichent les textes traduits

Points importants déjà implémentés:

- locale par défaut: `fr`
- langues supportées: `fr`, `en`
- racine `/` redirige vers `/fr/`

## 2. Ajouter des traductions i18n globales

Objectif: ajouter une nouvelle clé de traduction utilisée dans l'interface globale (ex: nouveau label de bouton).

### Étape 1 - Ajouter la clé au schéma de types

Éditer `src/i18n/translations/schema.ts` et ajouter la clé dans `TranslationMessages`.

Exemple:

```ts
export interface TranslationMessages {
	// ...clés existantes
	newsletterCta: string;
}
```

### Étape 2 - Renseigner la valeur FR

Éditer `src/i18n/translations/fr.ts`:

```ts
export const fr: TranslationMessages = {
	// ...clés existantes
	newsletterCta: 'S inscrire à la newsletter',
};
```

### Étape 3 - Renseigner la valeur EN

Éditer `src/i18n/translations/en.ts`:

```ts
export const en: TranslationMessages = {
	// ...clés existantes
	newsletterCta: 'Subscribe to newsletter',
};
```

### Étape 4 - Utiliser la traduction dans un composant

Dans un composant Astro, récupérer la locale puis le dictionnaire via `t(locale)`.

Pattern utilisé dans le projet:

```astro
---
import { localeFromPathname, resolveLocale, t } from '@/lib/i18n';

const locale = resolveLocale(localeFromPathname(Astro.url.pathname));
const text = t(locale);
---

<button>{text.newsletterCta}</button>
```

## 3. Ajouter une nouvelle page de contenu en FR et EN

Objectif: créer une page équivalente dans les deux langues.

### Option A - Page Astro (ex: page simple)

1. Créer la version FR dans `src/pages/fr/...`
2. Créer la version EN dans `src/pages/en/...`
3. Utiliser `PageLayout` avec `locale` explicite

Exemple FR (`src/pages/fr/ma-page.astro`):

```astro
---
import PageLayout from '@/layouts/PageLayout.astro';
---

<PageLayout title="Ma page" locale="fr">
	<h1>Ma page</h1>
	<p>Contenu en français.</p>
</PageLayout>
```

Exemple EN (`src/pages/en/my-page.astro`):

```astro
---
import PageLayout from '@/layouts/PageLayout.astro';
---

<PageLayout title="My page" locale="en">
	<h1>My page</h1>
	<p>English content.</p>
</PageLayout>
```

### Option B - Leçon MDX (recommandé pour contenu pédagogique)

1. Créer un fichier FR dans `src/pages/fr/lessons/...`
2. Créer le fichier EN miroir dans `src/pages/en/lessons/...`
3. Garder le même slug (nom de fichier) pour faciliter la correspondance FR/EN
4. Utiliser le layout `@/layouts/LessonLayout.astro`

Exemple FR (`src/pages/fr/lessons/orbites.mdx`):

```mdx
---
layout: '@/layouts/LessonLayout.astro'
title: 'Orbites'
lang: fr
---

# Orbites

Contenu de la leçon en français.
```

Exemple EN (`src/pages/en/lessons/orbits.mdx` ou `src/pages/en/lessons/orbites.mdx` selon choix de slug):

```mdx
---
layout: '@/layouts/LessonLayout.astro'
title: 'Orbits'
lang: en
---

# Orbits

Lesson content in English.
```

Recommandation du projet: conserver le même slug FR/EN quand possible pour simplifier le switch de langue.

## 4. Mettre à jour la navigation globale

Si la nouvelle page doit apparaître dans la navigation:

1. Ajouter une nouvelle clé dans les traductions (`schema.ts`, `fr.ts`, `en.ts`)
2. Ajouter l'entrée dans `navLinks` des composants:
	 - `src/components/Header.astro`
	 - `src/components/Footer.astro`

Exemple:

```ts
const navLinks = [
	{ href: '/', label: text.navHome },
	{ href: '/lessons/intro', label: text.navLessons },
	{ href: '/about', label: text.navAbout },
	{ href: '/resources', label: text.navResources },
];
```

Le helper `localizePath()` se charge d'appliquer `/fr` ou `/en` automatiquement.

## 5. Bonnes pratiques à respecter

- Toujours garder les mêmes clés dans `fr.ts` et `en.ts`.
- Ajouter toute nouvelle clé au schéma TypeScript avant usage.
- Passer explicitement `locale="fr"` ou `locale="en"` dans les pages Astro.
- En MDX, renseigner `lang: fr` ou `lang: en` dans le frontmatter.
- Utiliser l'alias `@/` pour les imports (`@` pointe vers `src`).
- Éviter le middleware i18n pour les redirections dans ce repo; préférer des pages de redirection explicites.

## 6. Gestion des couleurs

Le projet gère les couleurs avec des variables CSS (tokens), utilisées ensuite par les classes Tailwind/Starwind.

### 6.1 Où sont définies les couleurs

- `src/styles/starwind.css`
  - palette de marque: `--brand-50` à `--brand-900`
  - tokens de thème clair dans `:root` (`--background`, `--foreground`, `--primary`, etc.)
  - tokens de thème sombre dans `.dark` (mêmes noms de variables, valeurs différentes)
  - mapping vers Tailwind via `@theme inline` (`--color-background`, `--color-primary`, etc.)

- `src/styles/global.css`
  - styles globaux du site
  - classe utilitaire `.bg-brand-gradient` qui utilise `--brand-500` et `--brand-800`

### 6.2 Comment fonctionne le thème clair/sombre

- le script inline dans `src/layouts/BaseLayout.astro` lit `localStorage.colorTheme`
- si aucune préférence n'est stockée, il suit `prefers-color-scheme`
- le thème sombre est activé en ajoutant la classe `dark` sur `<html>`
- la variante `dark` de Tailwind est configurée dans `src/styles/starwind.css`

En pratique:

- les composants utilisent des classes comme `bg-background`, `text-foreground`, `border-border`
- ces classes pointent vers les variables CSS, qui changent automatiquement entre clair et sombre

### 6.3 Modifier les couleurs correctement

1. Modifier les valeurs source dans `src/styles/starwind.css`
	- palette de marque: `--brand-*`
	- tokens sémantiques: `--primary`, `--muted`, `--error`, etc.
2. Vérifier les deux thèmes
	- bloc `:root` pour le mode clair
	- bloc `.dark` pour le mode sombre
3. Vérifier les pages principales en clair et en sombre
	- lisibilité du texte
	- contraste des boutons/liens
	- contraste des bordures et états focus

### 6.4 Règles recommandées

- privilégier les tokens sémantiques (`--primary`, `--background`) plutôt que des couleurs codées en dur dans les composants
- garder une cohérence entre `--primary` et la palette `--brand-*`
- éviter de casser le contraste (objectif WCAG AA)
- si une couleur de lien change, vérifier aussi `--prose-link-color`, `--prose-link-hover-color`, `--prose-link-decoration-color`

## 7. Checklist de validation

Après ajout de traductions ou de pages:

1. Lancer le site en local:

```bash
npm run dev
```

2. Vérifier les URLs:

- `/fr/...` affiche le contenu FR
- `/en/...` affiche le contenu EN
- `/` redirige vers `/fr/`

3. Vérifier le switch de langue dans le footer:

- il garde le chemin courant
- il bascule proprement de FR vers EN et inversement

4. Vérifier le build:

```bash
npm run build
```

## 8. Fichiers de référence

- `src/lib/i18n.ts` — fonctions utilitaires locale/path
- `src/i18n/translations/schema.ts` — contrat des traductions
- `src/i18n/translations/fr.ts` — dictionnaire FR
- `src/i18n/translations/en.ts` — dictionnaire EN
- `src/components/Header.astro` — navigation et textes globaux
- `src/components/Footer.astro` — switch de langue et navigation
- `src/layouts/PageLayout.astro` — layout de pages standard
- `src/layouts/LessonLayout.astro` — layout des leçons MDX

