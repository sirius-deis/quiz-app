import { bindHistory, move } from './history';
import {
    getCategoryList,
    getQuestions,
    fetchQuestions,
    addAnswer,
    getAnswers,
    putNameToStorage,
    retrieveNameFromStorage,
} from './model';
import { createCategoryList } from './categories';
import { bindQuestions, intervalId, resetPrepare } from './questions';
import { createChart } from './result';

window.addEventListener('DOMContentLoaded', () => {
    const resetCb = () => {
        move('category', true);
    };
    const allQuestionsDoneCb = () => {
        const answers = getAnswers();
        const questions = getQuestions();
        let result = [];
        for (let i = 0; i < answers.length; i++) {
            if (answers[i] === null) {
                result.push(null);
                continue;
            }
            result.push(answers[i] === questions[i].correctAnswer);
        }
        move('result', true);
        createChart(
            result.filter(item => item).length,
            result.filter(item => item === false).length,
            result.filter(item => item === null).length,
            retrieveNameFromStorage(),
            resetCb
        );
    };

    const formCategories = () => {
        const categoryList = getCategoryList();
        createCategoryList(categoryList, async chosenCategory => {
            await fetchQuestions(chosenCategory);
            move('questions', true);
            changeHistoryCb('questions');
            bindQuestions(getQuestions(), addAnswer, allQuestionsDoneCb);
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

    bindHistory(
        formCategories,
        getQuestions().length === 0,
        changeHistoryCb,
        putNameToStorage,
        retrieveNameFromStorage
    );
});
