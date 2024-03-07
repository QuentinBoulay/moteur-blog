<script>
    import { page } from '$app/stores';
    import { articles, getCategories } from '../../../../lib/stores';
    import { goto } from '$app/navigation';

    let titleValue = '';
    let textValue = '';

    let selected = [];

    let categories = getCategories();

    $: {
        const article = $articles.find(article => article.id == $page.params.id);
        if (article) {
            if (article.status === "archived") {
                goto(`/`);
            } else {
                titleValue = article.title;
                textValue = article.text;
                selected = article.categories;
            }
        }
    }

    function updateArticle() {

        console.log(updatedArticle);

        goto(`/`)
    }
</script>

<h1>Article {$page.params.id}</h1>

{#if $articles}
    {#each $articles as article}
        {#if article.id == $page.params.id}
        <label>Title : 
            <input type="text" size={article.title.length} bind:value={titleValue} />
        </label>
        <br>
        <label>Text :
            <textarea rows="5" cols="40" bind:value={textValue} />
        </label>
        <br>
        <label>Categories :         
            <select multiple bind:value={selected}>
                {#each categories as category}
                    <option value={category}>
                        {category.name}
                    </option>
                {/each}
            </select>
        </label>
        <br>
        <button on:click={updateArticle}>Save</button>
        {/if}
    {/each}
{/if}