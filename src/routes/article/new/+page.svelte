<script>
    import { articles } from "../../../lib/stores.js";

    let newArticle = {
        id: articles.length + 1,
        title: "",
        date: "",
        text: "",
        categories: "",
        keywords: "",
        status: "draft"
    };

    function addArticle() {
        let date = new Date();
        let today = `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`;

        let categories = newArticle.categories.split(",");
        let keywords = newArticle.keywords.split(",");

        newArticle.date = today;
        newArticle.categories = categories;
        newArticle.keywords = keywords;

        articles.add(newArticle);
    }
</script>


<h1>Création d'un nouvel article</h1>

<input type="text" placeholder="Titre de l'article" bind:value={newArticle.title}>
<input type="text" placeholder="Catégorie de l'article" bind:value={newArticle.categories}>
<input type="text" placeholder="Mots-clés de l'article" bind:value={newArticle.keywords}>
<select bind:value={newArticle.statut}>
    <option value="draft">Brouillon</option>
    <option value="published">Publié</option>
</select>
<textarea cols="30" rows="10" bind:value={newArticle.text}></textarea>
<button on:click={addArticle}>Ajouter l'article</button>
