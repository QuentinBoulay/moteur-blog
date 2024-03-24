<script>
    import { page } from '$app/stores'
    import { articles } from '../../../lib/stores';
    import { goto } from '$app/navigation';
    import "../../../styles/global.css";
    import Header from '../../../lib/templates/Header.svelte';
    import Footer from '../../../lib/templates/Footer.svelte';
</script>

<Header />

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

<button on:click={() => goto(`/`)}>Retour à la liste des articles</button>

<Footer />



