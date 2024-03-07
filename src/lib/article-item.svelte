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
        <td><button on:click={showArticle}>Voir</button></td>
        <td><button on:click={updateArticle} disabled={article.status === "archived" ? !disabled : disabled}>Modifier</button></td>
        <td><button on:click={deleteArticle}>Supprimer</button></td>
    </tr>
{/if}