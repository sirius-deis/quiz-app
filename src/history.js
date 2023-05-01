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

export const bindHistory = (createCategoryList, getCategoryList) => {
    const name = retrieveNameFromStorage();

    if (url.pathname !== '/' && !name) {
        currentSection = startSection;
        moveToStartSection();
    } else if (url.pathname === 'questions' && !questions) {
        if (!name) {
            moveToStartSection();
        } else {
            move('category');
            showSection(categorySection);
            hideSection(currentSection);
            currentSection = categorySection;
        }
    } else {
        currentSection = document.querySelector(
            `.${url.pathname.slice(1) || 'start'}`
        );
        showSection(currentSection);
    }
    starterBtnEl &&
        starterBtnEl.addEventListener('click', () => {
            move('info');
            showSection(infoSection);
            hideSection(currentSection);
            currentSection = infoSection;
        });

    infoBtnEl &&
        infoBtnEl.addEventListener('click', () => {
            putNameToStorage(infoInputEl.value);
            move('category');
            showSection(categorySection);
            hideSection(currentSection);
            currentSection = categorySection;
            const categoryList = getCategoryList();

            createCategoryList(categoryList, questionsArr => {
                setQuestions(questionsArr);
                move('category');
                showSection(questionSection);
                hideSection(currentSection);
                currentSection = questionSection;
                createQuestionField(questionsArr);
            });
        });
};

const moveToStartSection = (path = '') => {
    history.replaceState(null, '', `${url.origin}/${path}`);
};

const move = path => {
    currentPath = path;
    history.pushState(null, '', `${url.origin}/${currentPath}`);
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
