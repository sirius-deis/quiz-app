import { bindHistory, move } from './history';
import {
    getCategoryList,
    getQuestions,
    fetchQuestions,
    addAnswer,
    getAnswers,
    putNameToStorage,
    retrieveNameFromStorage,
    setResult,
} from './model';
import { createCategoryList } from './categories';
import { bindQuestions, intervalId, resetPrepare } from './questions';

window.addEventListener('DOMContentLoaded', () => {
    const allQuestionsDoneCb = () => {
        const answers = getAnswers();
        const questions = getQuestions();
        let result = [];
        for (let i = 0; i < answers.length; i++) {
            result.push(answers[i] === questions[i].correctAnswer);
        }
        setResult(result);
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
