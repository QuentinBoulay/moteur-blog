<script>
    import ArticleItem from "../lib/article-item.svelte";


    let articles = [];

    function addArticle() {
        console.log('add');
    }
</script>


<h1>Blog</h1>

{#if (articles.length > 0)}
    {#each articles as article}
        <ArticleItem articleData={article}/>
    {/each}
{:else}
    <p>Aucun article n'est disponible actuellement</p>
{/if}

<button on:click={addArticle}>Ajouter un article</button>