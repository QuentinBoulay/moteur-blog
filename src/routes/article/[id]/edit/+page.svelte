<script>
    import { page } from '$app/stores';
    import { articles, getCategories } from '../../../../lib/stores';
    import { goto } from '$app/navigation';
    import Header from '../../../../lib/templates/Header.svelte';
    import Footer from '../../../../lib/templates/Footer.svelte';
    import { onDestroy } from 'svelte';
    import Editor from '$lib/Editor.svelte'

    let article = {
        title: '',
        text: '',
        categories: [],
        status: ''
    };

    let categories = getCategories();

    function onContentChange(event) {
        article.text = event.detail;
    }

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

<div class="container">
    {#if article}
        <h1>Article : {article.title}</h1>
        
        <div class="form-block">
            <label>Titre :
                <input type="text" bind:value={article.title} />
            </label>
        </div>
        
        <div class="form-block">
            <p>Texte :</p>
            <Editor on:contentChanged={onContentChange} content={article.text}/>
        </div>

        <div class="form-block categories">
            <label>Categories :
                {#if categories.length > 0}
                    {#each categories as category}
                        <label for={category.name}>
                            <input type="checkbox" value={category.name} id={category.name} checked={article.categories.includes(category.name)}/>
                            {category.name}
                        </label>
                    {/each}
                {:else}
                    <p>Aucune catégorie disponible</p>
                {/if}
            </label>
        </div>

        <div class="form-block">
            <label>Statut :
                <select bind:value={article.status}>
                    <option value="published">Publié</option>
                    <option value="draft">Brouillon</option>
                    <option value="archived">Archivé</option>
                </select>
            </label>
        </div>

        <button on:click={updateArticle} class="btn btn-success">Enregistrer</button>
    {/if}
</div>

<Footer />

<style>
    textarea {
        width: 100%;
        border: 1px solid var(--border-color);
        border-radius: 5px;
        margin: 5px 0;
    }

    input, select {
        margin: 5px 0;
    }

    .btn-success {
        margin: 10px 0;
    }

    .categories label {
        width: 100%;
        display: block;
        margin: 5px 0;
    }

    .categories label:hover {
        cursor: pointer;
    }
</style>