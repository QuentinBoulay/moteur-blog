<script>
    import { page } from '$app/stores';
    import { articles } from '../../../../lib/stores';
    import { goto } from '$app/navigation';

    let id;
    let titleValue = '';
    let date;
    let textValue = '';
    let categoriesValue = [];
    let keywords
    let status

    $: {
        const article = $articles.find(article => article.id == $page.params.id);
        if (article) {
            if (article.status === "archived") {
                goto(`/`);
            } else {
                id = article.id;
                titleValue = article.title;
                date = article.date;
                textValue = article.text;
                categoriesValue = article.categories;
                keywords = article.keywords;
                status = article.status;
            
            }
        }
    }

    function updateCategories(category, checked) {
        if (checked) {
            categoriesValue.push(category);
        } else {
            categoriesValue = categoriesValue.filter(c => c !== category);
        }
    }

    function updateArticle() {
        const updatedArticle = {
            id: id,
            title: titleValue,
            date: date,
            text: textValue,
            categories: categoriesValue,
            keywords: keywords,
            status: status
        };

        console.log(updatedArticle)

        articles.update($page.params.id, updatedArticle);

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
            {#each article.categories as category}
                <label for={category}>{category}
                    <input type="checkbox" id={category} name="categories" checked={categoriesValue.includes(category)} on:change={(e) => updateCategories(category, e.target.checked)} />
                </label>
            {/each}
        </label>
        <br>
        <button on:click={updateArticle}>Save</button>
        {/if}
    {/each}
{/if}