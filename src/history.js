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

export const bindHistory = (formCategoriesCb, isQuestionsEmpty) => {
    const name = retrieveNameFromStorage();
    if (url.pathname !== '/' && !name) {
        currentSection = startSection;
        moveToStartSection();
    } else if (url.pathname === '/questions') {
        if (!isQuestionsEmpty) {
            move('questions');
        } else {
            if (!name) {
                moveToStartSection();
            } else {
                move('category');
                formCategoriesCb();
            }
        }
    } else if (url.pathname === '/category') {
        move('category');
        formCategoriesCb();
    } else {
        currentSection = document.querySelector(
            `.${url.pathname.slice(1) || 'start'}`
        );
        showSection(currentSection);
    }
    starterBtnEl &&
        starterBtnEl.addEventListener('click', () => {
            move('info');
        });

    infoBtnEl &&
        infoBtnEl.addEventListener('click', () => {
            putNameToStorage(infoInputEl.value);
            move('category');
            currentSection = categorySection;
            formCategoriesCb();
        });
};

const moveToStartSection = (path = '') => {
    history.replaceState(null, '', `${url.origin}/${path}`);
};

export const move = path => {
    currentPath = path;
    history.pushState(null, '', `${url.origin}/${currentPath}`);
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

window.addEventListener('popstate', e => {
    const sectionPath = new URL(e.target.location).pathname.slice(1);
    if (sectionPath === currentPath) {
        return;
    }
    const sectionToReplace = document.querySelector(
        `.${sectionPath || 'start'}`
    );
    showSection(sectionToReplace);
    hideSection(currentSection);
    currentPath = sectionPath;
    currentSection = sectionToReplace;
});
