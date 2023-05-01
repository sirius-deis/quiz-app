import { bindHistory } from './history';
import { getCategoryList } from './model';
import { createCategoryList } from './categories';

window.addEventListener('DOMContentLoaded', () => {
    // const formQuestions = () => {

    // }

    bindHistory(createCategoryList, getCategoryList);
});
