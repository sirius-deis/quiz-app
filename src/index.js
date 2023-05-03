import { bindHistory, move } from './history';
import {
    getCategoryList,
    getQuestions,
    fetchQuestions,
    addAnswer,
} from './model';
import { createCategoryList } from './categories';
import { bindQuestions, intervalId, resetPrepare } from './questions';

window.addEventListener('DOMContentLoaded', () => {
    const formCategories = () => {
        const categoryList = getCategoryList();
        createCategoryList(categoryList, async chosenCategory => {
            await fetchQuestions(chosenCategory);
            move('questions', true);
            changeHistoryCb('questions');
            bindQuestions(getQuestions(), addAnswer);
        });
    };

    const changeHistoryCb = path => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        if (path === 'questions') {
            resetPrepare();
        }
    };

    bindHistory(formCategories, getQuestions().length === 0, changeHistoryCb);
});
