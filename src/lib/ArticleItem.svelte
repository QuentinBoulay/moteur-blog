<script>
    import { goto } from '$app/navigation';
    import { articles } from './stores.js';

    export let article;

    function showArticle() {
        goto(`/article/${article.id}`);
    }

    function updateArticle() {
        goto(`/article/${article.id}/edit`);
    }

    function deleteArticle() {
        console.log(article.id)
        articles.delete(article.id);
    }

    let disabled = false;
</script>

{#if (article)}
    <tr>
        <td>{article.title}</td>
        <td>{article.date}</td>
        <td>{article.categories}</td>
        <td>{article.status}</td>
        <td>
            <button class="btn btn-success" on:click={showArticle}>Voir</button>
            <button class="btn btn-warning" on:click={updateArticle} disabled={article.status === "archived" ? !disabled : disabled}>Modifier</button>
            <button class="btn btn-danger" on:click={deleteArticle}>Supprimer</button>
        </td>
    </tr>
{/if}

<style>
    td {
        padding: 8px;
    }
</style>