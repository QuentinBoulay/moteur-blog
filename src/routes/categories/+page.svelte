<script>
    import { goto } from '$app/navigation';
    import { categories } from '../../lib/stores';

    function addCategory() {
        goto(`/category/new`);
    }
</script>

<h1>Liste des catégories</h1>

{#if ($categories.length > 0)}
    <table>
        <tr>
            <th scope="column">Nom</th>
        </tr>
        {#each $categories as category}
            <tr>
                <td>{category.name}</td>
            </tr>
        {/each}
    </table>
{:else}
    <p>Aucune catégorie n'est disponible actuellement</p>
{/if}

<button on:click={addCategory}>Ajouter une catégorie</button>