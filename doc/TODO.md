# TODO — Site web pédagogique (sciences de l'espace)

## 1) Architecture et structure des contenus

- [ ] Mettre en place la hiérarchie pédagogique: Programme -> Cours -> Chapitre -> Leçon.
- [ ] Définir un modèle de frontmatter pour les leçons (langue, niveau, tags, durée, objectifs, prérequis).
- [ ] Standardiser les blocs de contenu de leçon: objectifs, corps, encadrés, glossaire, quiz, médias, ressources.
- [ ] Documenter la convention de nommage et d'organisation des fichiers (cours/chapitres/leçons).

## 2) Pages et navigation

- [ ] Finaliser la page d'accueil: hero, accès rapide aux parcours, recherche, ressources mises en avant.
- [ ] Finaliser les pages cours: objectifs, plan des chapitres, prérequis, durée estimée.
- [ ] Finaliser les pages leçon: structure par blocs, encadrés "A retenir", quiz, simulation, liens "Pour aller plus loin".
- [ ] Implémenter le fil d'Ariane.
- [ ] Implémenter la navigation leçon précédente / suivante.
- [ ] Structurer le menu par thématiques et niveaux.

## 3) Internationalisation (FR/EN)

- [ ] Vérifier que toutes les routes existent en FR et en EN pour les pages principales.
- [ ] Mettre en place le fallback de traduction pour les clés manquantes.
- [ ] Définir et documenter le workflow de traduction des contenus MDX (FR source, EN cible).
- [ ] Ajouter une checklist de validation i18n avant publication.

## 4) Contenus riches et médias

- [ ] Créer une galerie d'images HD avec légendes et crédits.
- [ ] Mettre en place l'insertion de vidéos avec transcription et chapitrage.
- [ ] Définir la stratégie d'hébergement média (repo, CDN, Cloudinary, ou S3-compatible).
- [ ] Ajouter les liens de téléchargement PDF dans les leçons.
- [ ] Standardiser les consignes d'usage pour chaque simulation (objectif, étapes, limites).

## 5) Simulations et interactivité

- [ ] Intégrer au moins une simulation interactive (island Astro dédiée).
- [ ] Ajouter un composant de consignes pédagogiques autour des simulations.
- [ ] Prévoir une stratégie pour notebooks interactifs côté client (JupyterLite/Pyodide) si retenue.
- [ ] Prévoir la diffusion des scripts MATLAB (.m) téléchargeables ou leurs alternatives JS.

## 6) Recherche et indexation

- [ ] Implémenter la recherche plein texte côté build (Lunr.js ou équivalent).
- [ ] Ajouter les filtres de recherche: thème, niveau, type de média, durée.
- [ ] Vérifier la pertinence du ranking des résultats sur un jeu de contenus test.

## 7) Quiz et évaluation

- [ ] Définir le format de données des quiz (QCM, vrai/faux, appariement).
- [ ] Implémenter un composant de quiz avec feedback immédiat.
- [ ] Ajouter des exercices pratiques liés aux simulations (consignes, objectifs, questions).
- [ ] Rédiger des critères de qualité pédagogique pour les quiz.

## 8) Accessibilité (WCAG 2.2 AA)

- [ ] Vérifier la navigation clavier complète.
- [ ] Vérifier les contrastes de couleurs (textes, composants, états interactifs).
- [ ] Vérifier alternatives textuelles (images, schémas, médias).
- [ ] Vérifier sous-titres/transcriptions pour les vidéos.
- [ ] Réaliser un audit accessibilité sur un échantillon de pages clés.

## 9) Performance

- [ ] Atteindre un LCP < 2.5 s sur profil 4G (page d'accueil + page leçon).
- [ ] Appliquer images responsives + lazy-loading.
- [ ] Limiter le JS initial (islands uniquement quand nécessaire).
- [ ] Mesurer et documenter les performances avant/après optimisations.

## 10) SEO

- [ ] Vérifier balisage sémantique sur les pages clés.
- [ ] Ajouter/valider métadonnées Open Graph.
- [ ] Générer et publier le sitemap.
- [ ] Ajouter microdonnées (cours/leçons selon besoin).
- [ ] Vérifier lisibilité/cohérence des URLs.

## 11) Sécurité, confidentialité, conformité

- [ ] Forcer HTTPS sur tous les environnements publics.
- [ ] Vérifier protections XSS/CSRF selon les surfaces interactives.
- [ ] Définir la stratégie de gestion des rôles (a minima pour la suite du projet).
- [ ] Mettre en place sauvegardes et journalisation minimales.
- [ ] Ajouter bandeau de consentement RGPD.
- [ ] Rédiger/relire la politique de confidentialité.
- [ ] Activer l'anonymisation de l'analytics.

## 12) CI/CD et déploiement

- [ ] Choisir la cible d'hébergement (GitHub Pages ou Netlify).
- [ ] Configurer le déploiement automatique sur push.
- [ ] Ajouter pipeline CI pour build + vérifications qualité (lint/tests si disponibles).
- [ ] Documenter la procédure de release.

## 13) Workflow éditorial

- [ ] Formaliser le processus: idéation -> rédaction -> relecture scientifique -> revue accessibilité/SEO -> validation -> publication.
- [ ] Définir une checklist de revue Pull Request pour contenus et technique.
- [ ] Définir le guide auteur (édition GitHub web, frontmatter, médias, quiz).

## 14) Critères d'acceptation du MVP

- [ ] Publier un parcours complet avec au moins 3 chapitres et 10 leçons.
- [ ] Inclure des images dans le parcours publié.
- [ ] Inclure au moins 1 vidéo avec transcription.
- [ ] Inclure au moins 1 simulation interactive intégrée.
- [ ] Vérifier qu'un auteur non technique peut éditer et publier via workflow documenté.
- [ ] Valider la conformité WCAG 2.2 AA sur un échantillon représentatif.

## 15) Phase 2 (optionnel / plus tard)

- [ ] Authentification utilisateurs (Supabase ou équivalent).
- [ ] Suivi de progression apprenant (pourcentage, leçons terminées, reprise).
- [ ] Tableaux de bord pédagogiques.
- [ ] Recherche scalable (Algolia DocSearch) si croissance des contenus.
