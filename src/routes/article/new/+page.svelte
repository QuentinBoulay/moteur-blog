<script>
    import { articles, getArticles, getCategories } from "../../../lib/stores.js";
    import { goto } from '$app/navigation';
    import "../../../styles/global.css";
    import Header from '../../../lib/templates/Header.svelte';
    import Footer from '../../../lib/templates/Footer.svelte';
    import Editor from '$lib/Editor.svelte'

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

    function onContentChange(event) {
        newArticle.text = event.detail;
    }

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

<div class="container">
    <h1>Création d'un nouvel article</h1>
    
    <div class="form-block">
        <label for="title">Titre de l'article</label>
        <input type="text" id="title" placeholder="Titre de l'article" bind:value={newArticle.title}>
    </div>
    
    <div class="form-block categories">
        <label>Categories :
            {#if categories.length > 0}
                {#each categories as category}
                    <label for={category.name}>
                        <input type="checkbox" value={category} id={category.name} bind:group={selected}/>
                        {category.name}
                    </label>
                {/each}
            {:else}
                <p>Aucune catégorie disponible</p>
            {/if}
        </label>
    </div>
    
    <div class="form-block">
        <label for="keyword">Mots-clés de l'article</label>
        <input type="text" id="keyword" placeholder="Mots-clés de l'article" bind:value={newArticle.keywords}>
    </div>
    
    <div class="form-block">
        <label for="status">Statut de l'article</label>
        <select id="status" bind:value={newArticle.status}>
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
        </select>
    </div>
    
    <div class="form-block">
        <label for="content-article">Contenu de l'article</label>
        <Editor on:contentChanged={onContentChange} />
    </div>

    <div class="buttons">
        <button on:click={addArticle}>Ajouter l'article</button>
        <button on:click={goToHome}>Revenir à l'accueil</button>
    </div>
</div>


<Footer />

<style>
    textarea {
        width: 100%;
        border: 1px solid var(--border-color);
        border-radius: 5px;
        margin-top: 5px;
    }

    select, input {
        margin: 5px 0;
    }

    .categories label {
        width: 100%;
        display: block;
        margin: 5px 0;
    }

    .categories label:hover {
        cursor: pointer;
    }
</style>