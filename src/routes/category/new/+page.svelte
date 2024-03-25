<script>
    import { categories, getCategories } from "../../../lib/stores.js";
    import { goto } from '$app/navigation';
    import "../../../styles/global.css"
    import Header from '../../../lib/templates/Header.svelte';
    import Footer from '../../../lib/templates/Footer.svelte';

    let newCategory = {
        id: getCategories().length + 1,
        name: ""
    };

    function addCategory() {
        categories.add(newCategory);
        goto(`/categories`)
    }
</script>

<Header />

<div class="container">
    <h1>Création d'une nouvelle catégorie</h1>
    
    <input type="text" placeholder="Nom de la catégorie" bind:value={newCategory.name}>
    
    <div class="buttons">
        <button on:click={addCategory}>Ajouter la catégorie</button>
        <button on:click={() => goto(`/categories`)}>Retour à la liste des catégories</button>
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

    input {
        margin: 5px 0;
    }
</style>