<script>
    import { articles, getArticles, getCategories } from "../../../lib/stores.js";
    import { goto } from '$app/navigation';

    let selected = [];

    let categories = getCategories();

    let newArticle = {
        id: getArticles().length + 1,
        title: "",
        date: "",
        text: "",
        categories: [],
        keywords: "",
        status: "draft"
    };

    function addArticle() {
        let date = new Date();
        let today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        let keywords = newArticle.keywords.split(",");
 
        newArticle.date = today;
        newArticle.categories = selected.map(category => category.name);
        newArticle.keywords = keywords;

        console.log(selected)

        articles.add(newArticle);
        goto(`/`)
    }
</script>

<h1>Création d'un nouvel article</h1>

<input type="text" placeholder="Titre de l'article" bind:value={newArticle.title}>

<select multiple bind:value={selected}>
    {#each categories as category}
        <option value={category}>
            {category.name}
        </option>
    {/each}
</select>

<input type="text" placeholder="Mots-clés de l'article" bind:value={newArticle.keywords}>

<select bind:value={newArticle.status}>
    <option value="draft">Brouillon</option>
    <option value="published">Publié</option>
</select>

<textarea cols="30" rows="10" bind:value={newArticle.text}></textarea>

<button on:click={addArticle}>Ajouter l'article</button>
