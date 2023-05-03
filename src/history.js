import { putNameToStorage, retrieveNameFromStorage } from './model';

const startSection = document.querySelector('.start'),
    starterBtnEl = startSection.querySelector('.btn');
const infoSection = document.querySelector('.info'),
    infoInputEl = infoSection.querySelector('.info__input'),
    infoBtnEl = infoSection.querySelector('.btn');
const categorySection = document.querySelector('.category');
const questionSection = document.querySelector('.question');

const url = new URL(location);
let currentPath = '';
let currentSection;

const map = {
    category: categorySection,
    info: infoSection,
    questions: questionSection,
};

export const bindHistory = (
    formCategoriesCb,
    isQuestionsEmpty,
    historyChangeCb
) => {
    const name = retrieveNameFromStorage();

    const changeHistory = path => {
        historyChangeCb(path);
        move(path, true);
    };

    if (url.pathname !== '/' && !name) {
        currentSection = startSection;
        moveToStartSection();
    } else if (url.pathname === '/questions') {
        if (!isQuestionsEmpty) {
            changeHistory('questions');
        } else {
            if (!name) {
                moveToStartSection();
            } else {
                changeHistory('category');
                formCategoriesCb();
            }
        }
    } else if (url.pathname === '/category') {
        changeHistory('category');
        formCategoriesCb();
    } else {
        currentSection = document.querySelector(
            `.${url.pathname.slice(1) || 'start'}`
        );
        showSection(currentSection);
    }
    starterBtnEl &&
        starterBtnEl.addEventListener('click', () => {
            changeHistory('info');
        });

    infoBtnEl &&
        infoBtnEl.addEventListener('click', () => {
            putNameToStorage(infoInputEl.value);
            changeHistory('category');
            formCategoriesCb();
        });

    window.addEventListener('popstate', e => {
        const sectionPath = new URL(e.target.location).pathname.slice(1);
        if (sectionPath === currentPath) {
            return;
        }
        const path = sectionPath || 'start';
        historyChangeCb(path);
        move(path);
    });
};

const moveToStartSection = (path = '') => {
    history.replaceState(null, '', `${url.origin}/${path}`);
};

export const move = (path, push = false) => {
    currentPath = path;
    push && history.pushState(null, '', `${url.origin}/${currentPath}`);
    showSection(map[path]);
    currentSection && hideSection(currentSection);
    currentSection = map[path];
};

const showSection = section => {
    section.classList.remove('hidden');
    setTimeout(() => {
        section.classList.add(`visible`);
    }, 10);
};

const hideSection = section => {
    section.classList.remove('visible');
    setTimeout(() => {
        section.classList.add('hidden');
    }, 300);
};
