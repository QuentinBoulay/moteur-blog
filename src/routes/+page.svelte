<script>
    import { goto } from '$app/navigation';
    import ArticleItem from "../lib/ArticleItem.svelte";
    import { articles, categories, getArticles } from "../lib/stores.js";
    import Header from '../lib/templates/Header.svelte';
    import Footer from '../lib/templates/Footer.svelte';

    let status;
    let category;
    let search;
    let filteredArticles = [];

    $: {
        let articlesList = $articles;

        if (status) {
            filteredArticles = articlesList.filter(article => article.status === status);
        } else {
            filteredArticles = articlesList;
        }

        if (search) {
            filteredArticles = articlesList.filter(article => article.title.includes(search));
        }

        console.log(articlesList);
    }

    function addArticle() {
        goto(`/article/new`);
    }

    function categoriesList() {
        goto(`/categories`);
    }

</script>

<Header />

<div class="container">
    <h1>Moteur de blog</h1>
    
    <section id="filters">
        <input type="text" placeholder="Rechercher un article" bind:value={search} />
        <select bind:value={status}>
            <option value="">Tous les statuts</option>
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
    </section>

    <div class="buttons">
        <button on:click={addArticle}>Ajouter un article</button>
        <button on:click={categoriesList}>Liste des catégories</button>
    </div>

    {#if (getArticles().length > 0)}
        {#if (filteredArticles.length > 0)}
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
            <p>Aucun article ne correspond à votre recherche</p>
        {/if}
    {:else}
        <p>Aucun article n'est disponible actuellement</p>
    {/if}
</div>

<Footer />

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    table th {
        text-align: left;
        padding-bottom: 10px;
    }

    #filters {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin: 50px auto;
    }

    #filters input, #filters select {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        height: 50px;
        min-width: 200px;
    }

    .buttons button:first-child {
        margin-left: 0;
    }
</style>
