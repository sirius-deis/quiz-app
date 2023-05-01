const categoryList = [
    {
        name: 'music',
        title: 'music',
    },
    {
        name: 'sport',
        title: 'sport and leisure',
    },
    {
        name: 'movie',
        title: 'film and tv',
    },
    {
        name: 'art',
        title: 'arts and literature',
    },
    {
        name: 'history',
        title: 'history',
    },
    {
        name: 'society',
        title: 'society and culture',
    },
    {
        name: 'science',
        title: 'science',
    },
    {
        name: 'geography',
        title: 'geography',
    },
    {
        name: 'food',
        title: 'food and drink',
    },
    {
        name: 'general',
        title: 'general knowledge',
    },
];

export const getCategoryList = () => categoryList;

export const retrieveNameFromStorage = () => {
    return localStorage.getItem('name');
};

export const putNameToStorage = name => {
    localStorage.setItem('name', name);
};

let questions = [];

export const setQuestions = arr => {
    questions = arr;
};

export const getQuestions = () => questions;

export const fetchQuestions = async categoryName => {
    const response = await fetch(
        ` https://the-trivia-api.com/api/questions?categories=${categoryName}&limit=12`
    );
    if (!response.ok) {
        //TODO:
        throw new Error(response.statusText);
    }
    const data = await response.json();

    setQuestions(data);
};
