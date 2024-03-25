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

    .btn {
        border: none;
        padding: 8px 12px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        border-radius: 5px;
    }

    .btn-danger {
        background-color: #ec0a0a;
        color: white;
        border: 2px solid #ec0a0a;
    }

    .btn-danger:hover {
        background-color: white;
        color: #e30d0d;
    }

    .btn-success {
        background-color: #18b300;
        color: white;
        border: 2px solid #18b300;
    }

    .btn-success:hover {
        background-color: white;
        color: #18b300;
    }

    .btn-warning {
        background-color: #d4b802;
        color: white;
        border: 2px solid #d4b802;
    }

    .btn-warning:hover {
        background-color: white;
        color: #d4b802;
    }
</style>