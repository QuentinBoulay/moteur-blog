<script>
    import { goto } from '$app/navigation';
    import ArticleItem from "../lib/article-item.svelte";
    import { articles, categories, getArticles } from "../lib/stores.js";

    let status;
    let category;
    let search;
    let filteredArticles = [];

    $: {
        let articlesList = getArticles();

        if (status) {
            filteredArticles = articlesList.filter(article => article.status === status);
        }

        if (search) {
            filteredArticles = articlesList.filter(article => article.title.includes(search));
        }

        console.log(filteredArticles)
    }

    function addArticle() {
        goto(`/article/new`);
    }

    function categoriesList() {
        goto(`/categories`);
    }

</script>

<h1>Blog</h1>

<p>Filtres :</p>

<input type="text" placeholder="Rechercher un article" bind:value={search} />
<select bind:value={status}>
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
    {#if (filteredArticles.length > 0)}
    <table>
        <tr>
            <th scope="column">Titre</th>
            <th scope="column">Date de publication</th>
            <th scope="column">Catégories</th>
            <th scope="column">Statut</th>
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

<button on:click={addArticle}>Ajouter un article</button>
<button on:click={categoriesList}>Liste des catégories</button>
