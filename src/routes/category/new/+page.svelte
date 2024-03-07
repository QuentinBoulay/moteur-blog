<script>
    import { categories, getCategories } from "../../../lib/stores.js";
    import { goto } from '$app/navigation';

    let newCategory = {
        id: getCategories().length + 1,
        name: "",
        description: ""
    };

    function addCategory() {
        categories.add(newCategory);
        console.log(getCategories())
        goto(`/`)
    }
</script>

<h1>Création d'une nouvelle catégorie</h1>

<input type="text" placeholder="Nom de la catégorie" bind:value={newCategory.name}>
<textarea cols="30" rows="10" placeholder="Description de la catégorie" bind:value={newCategory.description}></textarea>

<button on:click={addCategory}>Ajouter la catégorie</button>
