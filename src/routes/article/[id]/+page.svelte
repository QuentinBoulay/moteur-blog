<script>
    import { page } from '$app/stores'
    import { articles } from '../../../lib/stores';
    import { goto } from '$app/navigation';
    import "../../../styles/global.css";
    import Header from '../../../lib/templates/Header.svelte';
    import Footer from '../../../lib/templates/Footer.svelte';
</script>

<Header />


<div class="container">

    {#if $articles}
        {#each $articles as article}
            {#if article.id == $page.params.id}
                <h1>Article : {article.title}</h1>
                <p class="date">Publié le : {article.date}</p>
                <p class="categories">Categories : {article.categories}</p>
                <p class="content">{article.text}</p>
            {/if}
        {/each}
    {/if}

    <button on:click={() => goto(`/`)}>Retour à la liste des articles</button>
</div>


<Footer />


<style>
    button {
        margin: 10px 0;
    }

    h1 {
        margin-bottom: 20px;
    }

    .date, .categories {
        margin: 10px 0;
    }

    .content {
        margin: 40px 0;
    }
</style>



