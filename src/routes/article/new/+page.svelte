<script>
    import { articles, getArticles, getCategories } from "../../../lib/stores.js";
    import { goto } from '$app/navigation';
    import "../../../styles/global.css";
    import Header from '../../../lib/templates/Header.svelte';
    import Footer from '../../../lib/templates/Footer.svelte';

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

        articles.add(newArticle);
        goto(`/`)
    }

    function goToHome() {
        goto(`/`);
    }
</script>

<Header />

<h1>Création d'un nouvel article</h1>

<input type="text" placeholder="Titre de l'article" bind:value={newArticle.title}>
<br>

<select multiple bind:value={selected}>
    {#each categories as category}
        <option value={category}>
            {category.name}
        </option>
    {/each}
</select>
<br>

<input type="text" placeholder="Mots-clés de l'article" bind:value={newArticle.keywords}>
<br>

<select bind:value={newArticle.status}>
    <option value="draft">Brouillon</option>
    <option value="published">Publié</option>
</select>
<br>

<textarea cols="30" rows="10" bind:value={newArticle.text}></textarea>
<br>

<button on:click={addArticle}>Ajouter l'article</button>
<button on:click={goToHome}>Revenir à l'accueil</button>


<Footer />

