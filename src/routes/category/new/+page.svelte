<script>
    import { categories, getCategories } from "../../../lib/stores.js";
    import { goto } from '$app/navigation';

    let newCategory = {
        id: getCategories().length + 1,
        name: ""
    };

    function addCategory() {
        categories.add(newCategory);
        goto(`/categories`)
    }
</script>

<h1>Création d'une nouvelle catégorie</h1>

<input type="text" placeholder="Nom de la catégorie" bind:value={newCategory.name}>

<button on:click={addCategory}>Ajouter la catégorie</button>
