import { writable } from 'svelte/store';

function createArticlesStore() {
    const { subscribe, update, set } = writable([]);

    return {
        subscribe,
        set,
        add: (article) => update(articles => [...articles, article]),
        delete: (id) =>  { 
            update(articles => articles.filter(article => article.id !== id));
        },
        update: (updatedArticle) => update(articles => {
            return articles.map(article => {
                if (article.id === updatedArticle.id) {
                    return { ...article, ...updatedArticle };
                }
                return article;
            });
        })
    };
}

function createCategoryStore() {
    const { subscribe, update } = writable([]);

    return {
        subscribe,
        set: (categories) => update(() => categories),
        add: (category) => update(categories => [...categories, category]),
    };
}

export const articles = createArticlesStore();
export const categories = createCategoryStore();
 
