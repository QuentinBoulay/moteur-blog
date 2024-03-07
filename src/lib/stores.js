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

export const articles = createArticlesStore();

export function getArticles() {
    return get(articles);
}
 
