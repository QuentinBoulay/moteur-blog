<script>
    import { goto } from '$app/navigation';
    import { categories } from '../../lib/stores';
    import Header from '../../lib/templates/Header.svelte';
    import Footer from '../../lib/templates/Footer.svelte';

    function addCategory() {
        goto(`/category/new`);
    }

    function goToHome() {
        goto(`/`);
    }
</script>

<Header />

<div class="container">
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
    
    <div class="buttons">
        <button on:click={addCategory}>Ajouter une catégorie</button>
        <button on:click={goToHome}>Revenir à l'accueil</button>
    </div>
</div>

<Footer />

<style>
    .buttons {
        margin-top: 30px;
    }

    .buttons button:first-child {
        margin-left: 0;
    }
</style>
