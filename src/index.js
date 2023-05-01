import { bindHistory, move } from './history';
import { getCategoryList, getQuestions, fetchQuestions } from './model';
import { createCategoryList } from './categories';
import { bindQuestions } from './questions';

window.addEventListener('DOMContentLoaded', () => {
    const formCategories = () => {
        const categoryList = getCategoryList();
        createCategoryList(categoryList, async chosenCategory => {
            await fetchQuestions(chosenCategory);
            move('questions');
            bindQuestions(getQuestions());
        });
    };

    bindHistory(formCategories, getQuestions().length === 0);
});
