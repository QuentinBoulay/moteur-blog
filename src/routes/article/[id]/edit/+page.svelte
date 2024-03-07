<script>
    import { page } from '$app/stores';
    import { articles } from '../../../../lib/stores';
    import { goto } from '$app/navigation';

    let titleValue = '';
    let textValue = '';
    let categoriesValue = [];

    $: {
        const article = $articles.find(article => article.id == $page.params.id);
        if (article) {
            if (!titleValue) titleValue = article.title;
            if (!textValue) textValue = article.text;
        }
    }

    function updateArticle() {
        articles.update(articles => {
            return articles.map(article => {
                if (article.id == $page.params.id) {
                    return {
                        ...article,
                        title: titleValue,
                        text: textValue,
                    };
                } else {
                    return article;
                }
            });
        });

        console.log(articles.update)

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
                    <input type="checkbox" id={category} name="categories" />
                </label>
            {/each}
        </label>
        <br>
        <button on:click={updateArticle}>Save</button>
        {/if}
    {/each}
{/if}

