import { writable, get } from 'svelte/store';
import initialData from './articles.json';

function createArticlesStore() {

    // Charger les données initiales depuis localStorage s'il y en a, sinon depuis initialData
    const initialArticles = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('articles')) : initialData;
    const { subscribe, set, update } = writable(initialArticles);

    // Sauvegarder les articles dans localStorage à chaque mise à jour
    subscribe(($articles) => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('articles', JSON.stringify($articles));
        }
    });

    return {
        subscribe,
        set,
        add: (article) => update(articles => {
            const newArticles = [...articles, article];
            return newArticles;
        }),
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