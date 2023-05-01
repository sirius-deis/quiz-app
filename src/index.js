import { bindHistory, move } from './history';
import { getCategoryList, getQuestions, fetchQuestions } from './model';
import { createCategoryList } from './categories';

window.addEventListener('DOMContentLoaded', () => {
    const formCategories = () => {
        const categoryList = getCategoryList();
        console.log(categoryList);
        createCategoryList(categoryList, chosenCategory => {
            fetchQuestions(chosenCategory);
            move('questions');
        });
    };
    // const formQuestions = () => {};

    bindHistory(formCategories, getQuestions().length === 0);
});
