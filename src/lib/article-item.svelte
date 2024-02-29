<script>
    export let articleData;
</script>

{#if (articleData)}
    <tr>
        <td>{articleData.title}</td>
        <td>{articleData.date}</td>
        <td>{articleData.categories}</td>
        <td>{articleData.status}</td>
    </tr>
{/if}