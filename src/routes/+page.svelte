<script>
    import { goto } from '$app/navigation';
    import ArticleItem from "../lib/article-item.svelte";
    import { articles } from "../lib/stores.js";

    function addArticle() {
        goto(`/article/new`);
    }

    function categoriesList() {
        goto(`/categories`);
    }
</script>

<h1>Blog</h1>

{#if ($articles.length > 0)}
<table>
    <tr>
        <th scope="column">Titre</th>
        <th scope="column">Date de publication</th>
        <th scope="column">Catégories</th>
        <th scope="column">Statut</th>
    </tr>
        {#each $articles as article}
            <ArticleItem {article} />
        {/each}
</table>
{:else}
    <p>Aucun article n'est disponible actuellement</p>
{/if}

<button on:click={addArticle}>Ajouter un article</button>
<button on:click={categoriesList}>Liste des catégories</button>
