# Moteur de Blog Svelte

## Description
Ce projet est un moteur de blog construit avec Svelte. Il comprend des fonctionnalités telles que la création, l'édition, et l'affichage d'articles, la gestion des catégories, et un éditeur intégré.

## Prérequis
- Node.js (version recommandée : voir `package.json`)

## Installation
2. Installez les dépendances :
```bash
npm install
```

## Utilisation
1. Démarrez le serveur de développement :
```bash
npm run dev
```
2. Ouvrez votre navigateur et accédez à l'URL suivante : `http://localhost:5173/`

## Fonctionnalités
1. Gestion des articles :
    - Création d'articles : `/article/new` (src/routes/article/new/+page.svelte)
    - Édition d'articles : `/article/[id]/edit` (src/routes/article/[id]/edit/+page.svelte)
        - L'ID est récupéré à partir de l'URL 
    - Affichage d'articles : `/article/[id]` (src/routes/article/[id]/+page.svelte)

2. Gestion des catégories : 
    - Création de catégories : `/category/new` (src/routes/category/new/+page.svelte)
    - Vue des catégories : `/categories` (src/routes/categories/+page.svelte)

3. Composants de template :
    - En-tête et pied de page : `Header.svelte` et `Footer.svelte` (src/lib/templates)

## Auteur

- Sébastien BURNET
- Quentin BOULAY



