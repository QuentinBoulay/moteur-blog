import { writable, get } from 'svelte/store';
import initialData from './articles.json';

function createArticlesStore() {
    const { subscribe, update } = writable(initialData);

    return {
        subscribe,
        add: (article) => update(articles => [...articles, article]),
        delete: (id) => update(articles => articles.filter(article => article.id !== id)),
        update: (id, updatedArticle) => update(articles => {
            return articles.map(article => {
                if (article.id === id) {
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

export function getArticles() {
    return get(articles);
}

export function getCategories() {
    return get(categories);
}

 
