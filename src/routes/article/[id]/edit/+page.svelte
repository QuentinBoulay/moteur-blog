<script>
    import { page } from '$app/stores';
    import { articles, getCategories } from '../../../../lib/stores';
    import { goto } from '$app/navigation';

    let article = {
        title: '',
        text: '',
        categories: [],
        status: ''
    };

    let categories = getCategories();

    function updateArticle() {
        let rawArticle = $articles.find(a => a.id == $page.params.id);
        article = {
            ...rawArticle,
            categories: rawArticle.categories.map(category => category.name)
        };
        articles.update(article);
        goto(`/`);
    }
</script>

<h1>Article {$page.params.id}</h1>

{#if $articles}
    {#each $articles as article}
        {#if article.id == $page.params.id}
        <label>Title : 
            <input type="text" size={article.title.length} bind:value={article.title} />
        </label>
        <br>
        <label>Text :
            <textarea rows="5" cols="40" bind:value={article.text} />
        </label>
        <br>
        <label>Categories :         
            <select multiple bind:value={article.categories}>
                {#each categories as category}
                    <option value={category} selected={article.categories.includes(category.name)} >
                        {category.name}
                    </option>
                {/each}
            </select>
        </label>
        <br>
        <label>Status :
            <select bind:value={article.status}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
            </select>
        </label>
        <button on:click={updateArticle}>Save</button>
        {/if}
    {/each}
{/if}