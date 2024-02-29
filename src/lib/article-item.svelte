<script>

    import { goto } from '$app/navigation';

    export let articleData;
    export let articlesList;

    function showArticle() {
        goto(`/article/${articleData.id}`);
    }

    function updateArticle() {
        goto(`/article/${articleData.id}/edit`);
    }

    function deleteArticle() {
        const index = articlesList.findIndex(article => article.id === articleData.id);
        articlesList.splice(index, 1);
    }
</script>

{#if (articleData)}
    <tr>
        <td>{articleData.title}</td>
        <td>{articleData.date}</td>
        <td>{articleData.categories}</td>
        <td>{articleData.status}</td>
        <td><button on:click={showArticle}>Voir</button></td>
        <td><button on:click={updateArticle}>Modifier</button></td>
        <td><button on:click={deleteArticle}>Supprimer</button></td>
    </tr>
{/if}