<script>
    import { goto } from '$app/navigation';
    import ArticleItem from "../lib/ArticleItem.svelte";
    import { articles, categories, getArticles } from "../lib/stores.js";
    import "../styles/global.css";
    import Header from '../lib/templates/Header.svelte';
    import Footer from '../lib/templates/Footer.svelte';

    let status;
    let category;
    let searchQuery = '';
    let filteredArticles = [];

    $: {
        let articlesTest = getArticles();

        if (status) {
            articlesTest = articlesTest.filter(article => article.status === status);
        }

        if (status === 'all') articlesTest = getArticles();

        if (category && category !== 'all') {
            articlesTest = articlesTest.filter(article => article.categories.includes(category));
        }

        if (searchQuery) {
            articlesTest = articlesTest.filter(article => article.title.includes(searchQuery));
        }

        filteredArticles = articlesTest;
    }

    function addArticle() {
        goto(`/article/new`);
    }

    function categoriesList() {
        goto(`/categories`);
    }

    function search(event) {
        searchQuery = event.target.value;
    }

</script>

<Header />

<p>Filtres :</p>

<input type="text" placeholder="Rechercher un article" on:input={search} />
<select bind:value={status}>
    <option value="all">Tous les statuts</option>
    <option value="published">Publié</option>
    <option value="draft">Brouillon</option>
    <option value="archived">Archivé</option>
</select>
<select bind:value={category}>
    <option value="all">Toutes les catégories</option>
    <option value="none">Aucune catégorie</option>
    {#each $categories as category}
        <option value={category.name}>{category.name}</option>
    {/each}
</select>


{#if ($articles.length > 0)}
<table>
    <tr>
        <th scope="column">Titre</th>
        <th scope="column">Date de publication</th>
        <th scope="column">Catégories</th>
        <th scope="column">Statut</th>
        <th scope="column">Actions</th>
    </tr>
    {#each filteredArticles as article (article.id)}
        <ArticleItem {article} />
    {/each}
</table>
{:else}
    <p>Aucun article n'est disponible actuellement</p>
{/if}

<button on:click={addArticle}>Ajouter un article</button>
<button on:click={categoriesList}>Liste des catégories</button>

<Footer />
