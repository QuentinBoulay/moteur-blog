<script>
    import { goto } from '$app/navigation';
    import ArticleItem from "../lib/article-item.svelte";
    import { articles, categories, getArticles } from "../lib/stores.js";

    let status;
    let category;
    let filteredArticles = [];

    $: {
        let articlesTest = getArticles();

        if (status) {
            filteredArticles = articlesTest.filter(article => article.status === status);
        }

        console.log(filteredArticles)
    }

    function addArticle() {
        goto(`/article/new`);
    }

    function categoriesList() {
        goto(`/categories`);
    }

    function search(event) {
        let search = event.target.value;
        filteredArticles = filteredArticles.filter(article => article.title.includes(search));
    }

</script>

<h1>Blog</h1>

<p>Filtres :</p>

<input type="text" placeholder="Rechercher un article" on:change={search} />
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
    <p>Aucun article n'est disponible actuellement</p>
{/if}

<button on:click={addArticle}>Ajouter un article</button>
<button on:click={categoriesList}>Liste des catégories</button>
