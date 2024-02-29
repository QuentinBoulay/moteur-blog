<script>
    import { goto } from '$app/navigation';
    import ArticleItem from "../lib/article-item.svelte";
    import data from "../lib/articles.json"

    let articles = data;

    $: console.log(articles)

    function addArticle() {
        goto(`/article/new`);
    }
</script>

<h1>Blog</h1>

{#if (articles.length > 0)}
<table>
    <tr>
        <th scope="column">Titre</th>
        <th scope="column">Date de publication</th>
        <th scope="column">Catégories</th>
        <th scope="column">Statut</th>
    </tr>
        {#each articles as article}
            <ArticleItem articleData={article} />
        {/each}
</table>
{:else}
    <p>Aucun article n'est disponible actuellement</p>
{/if}

<button on:click={addArticle}>Ajouter un article</button>