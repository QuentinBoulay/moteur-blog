<script>
    export let articleData;
</script>

{#if (articleData)}
    <p>Article - {articleData.title}</p>
{/if}