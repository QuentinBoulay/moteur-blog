<script>
    import { page } from '$app/stores';
    import { articles, getCategories } from '../../../../lib/stores';
    import { goto } from '$app/navigation';
    import Header from '../../../../lib/templates/Header.svelte';
    import Footer from '../../../../lib/templates/Footer.svelte';
    import { onDestroy } from 'svelte';

    let article = {
        title: '',
        text: '',
        categories: [],
        status: ''
    };

    let categories = getCategories();

    function findArticle() {
        return $articles.find(a => a.id == $page.params.id);
    }

    function updateArticle() {
        const index = $articles.findIndex(a => a.id === article.id);
        if (index !== -1) {
            articles.update(articles => {
                articles[index] = article;
                return articles;
            });
        }
        goto(`/`);
    }

    function initialize() {
        article = findArticle();
    }

    initialize();

    onDestroy(() => {
        article = null;
    });
</script>

<Header />

{#if article}
    <h1>Article : {article.title}</h1>
    <label>Titre :
        <input type="text" bind:value={article.title} />
    </label>
    <br>
    <label>Texte :
        <textarea bind:value={article.text} />
    </label>
    <br>
    <label>Categories :
        <select multiple bind:value={article.categories}>
            {#each categories as category}
                <option value={category.name} selected={article.categories.includes(category.name)}>
                    {category.name}
                </option>
            {/each}
        </select>
    </label>
    <br>
    <label>Statut :
        <select bind:value={article.status}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
        </select>
    </label>
    <br>
    <button on:click={updateArticle}>Enregistrer</button>
{/if}

<Footer />
