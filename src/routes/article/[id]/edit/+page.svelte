<script>
    import { page } from '$app/stores';
    import { articles, getCategories } from '../../../../lib/stores';
    import { goto } from '$app/navigation';

    let titleValue = '';
    let textValue = '';

    let selectedCategories = [];
    let selectedStatus;

    let categories = getCategories();

    $: {
        const article = $articles.find(article => article.id == $page.params.id);
        if (article) {
            if (article.status === "archived") {
                goto(`/`);
            } else {
                titleValue = article.title;
                textValue = article.text;
                selectedCategories = article.categories;
                selectedStatus = article.status
            }
        }
    }

    function updateArticle() {

        const updatedArticle = {
            id: $page.params.id,
            title: titleValue,
            text: textValue,
            categories: selectedCategories,
            status: selectedStatus
        }

        articles.update(updatedArticle);

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
            <select multiple bind:value={selectedCategories}>
                {#each categories as category}
                    <option value={category}>
                        {category.name}
                    </option>
                {/each}
            </select>
        </label>
        <br>
        <label>Status :
            <select bind:value={selectedStatus}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
            </select>
        </label>
        <button on:click={updateArticle}>Save</button>
        {/if}
    {/each}
{/if}