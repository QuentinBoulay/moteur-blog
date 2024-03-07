<script>
    import { page } from '$app/stores'
    import { articles } from '../../../lib/stores';
</script>

<h1>Article {$page.params.id}</h1>

{#if $articles}
    {#each $articles as article}
        {#if article.id == $page.params.id}
            <p>{article.date}</p>
            <h2>{article.title}</h2>
            <p>{article.text}</p>
            <p>Categories : {article.categories}</p>
        {/if}
    {/each}
{/if}



