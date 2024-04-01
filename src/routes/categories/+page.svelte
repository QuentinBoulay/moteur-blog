<script>
    import { goto } from '$app/navigation';
    import { categories, articles } from '../../lib/stores';
    import Header from '../../lib/templates/Header.svelte';
    import Footer from '../../lib/templates/Footer.svelte';

    function addCategory() {
        goto(`/category/new`);
    }

    function goToHome() {
        goto(`/`);
    }

    function deleteCategory(id, name) {
        categories.delete(id);
        
        $articles.forEach(article => {
            const index = $articles.findIndex(a => a.id === article.id);
            if (index !== -1) {
                let newCategories = $articles[index].categories.filter(categoryId => categoryId != name);
                let newArticle = $articles[index]
                newArticle.categories = newCategories

                articles.update(articles => {
                    articles[index] = newArticle;
                    return articles;
                });
            }
        });
    }




</script>

<Header />

<div class="container">
    <h1>Liste des catégories</h1>
    
    {#if ($categories.length > 0)}
        <table>
            <colgroup>
                <col span="1" style="width: 85%;">
                <col span="1" style="width: 15%;">
             </colgroup>

            <tr>
                <th scope="column">Nom</th>
                <th scope="column">Actions</th>
            </tr>
            {#each $categories as category}
                <tr>
                    <td>{category.name}</td>
                    <td class="actions"><button class="btn btn-danger" on:click={() => deleteCategory(category.id, category.name)}>Supprimer</button></td>
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

    .actions button {
        margin-left: 0;
    }
</style>
