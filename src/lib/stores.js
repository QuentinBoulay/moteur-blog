import { writable } from 'svelte/store';
import initialData from './articles.json';

function createArticlesStore() {
    const { subscribe, update } = writable(initialData);

    return {
        subscribe,
        add: (article) => update(articles => [...articles, article]),
        delete: (id) => update(articles => articles.filter(article => article.id !== id))
    };
}

export const articles = createArticlesStore();
