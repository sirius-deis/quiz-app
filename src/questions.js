const prepareEl = document.querySelector('.prepare'),
    prepareBtn = prepareEl.querySelector('.btn');

const questionContainer = document.querySelector('.question__container'),
    timeEl = questionContainer.querySelector('.question__time'),
    progressEl = questionContainer.querySelector('.question__progress'),
    lineOuter = questionContainer.querySelector('.question__outer'),
    questionContent = questionContainer.querySelector('.question__content'),
    forwardArrow = questionContainer.querySelector('.question__forward');

export let intervalId;
let remainingTime = 20;
let currentQuestion = 0;
let activeCart;
let nextCart;
let chosenAnswer = '';

const createCart = question => {
    const answersArr = [
        question.correctAnswer,
        ...question.incorrectAnswers,
    ].sort((_1, _2) => Math.random() - 0.5);
    const item = document.createElement('div');
    item.className = 'question__item';
    item.innerHTML = `
        <div class="question__task">${question.question}</div>
        <div class="question__options">
            ${answersArr
                .map(
                    (answer, i) =>
                        `<div class="question__option ${
                            answer === question.correctAnswer ? 'correct' : ''
                        }">${i + 1}. ${answer}</div>`
                )
                .join('')}
        </div>
    `;
    return item;
};

const stopTimer = () => {
    clearInterval(intervalId);
};

const shiftCards = () => {
    activeCart.classList.add('left-layout');
    const temp = activeCart;
    setTimeout(() => temp.remove(), 500);
    setTimeout(() => nextCart.classList.remove('right-layout'), 10);
    activeCart = nextCart;
};

const resetOptionElements = parent => {
    Array.prototype.forEach.call(parent.children, el =>
        el.classList.remove('chosen')
    );
};

export const resetPrepare = () => {
    questionContent.innerHTML = '';
    prepareEl.classList.remove('hidden');
    questionContainer.classList.add('hidden');
};

export const bindQuestions = (questionsArr, addAnswer, allQuestionsDoneCb) => {
    const start = () => {
        if (currentQuestion === 0) {
            activeCart = createCart(questionsArr[currentQuestion]);
        }
        if (currentQuestion < questionsArr.length - 1) {
            nextCart = createCart(questionsArr[currentQuestion + 1]);
            nextCart.classList.add('right-layout');
        }
        questionContent.append(activeCart, nextCart);
        progressEl.textContent = `${currentQuestion + 1}/${
            questionsArr.length
        }`;
        intervalId = setInterval(tick, 100);
        tick();
    };

    const tick = () => {
        if (remainingTime < 6) {
            timeEl.classList.add('expiring');
        }
        timeEl.textContent = `Time Left: ${Math.abs(
            (remainingTime -= 0.1)
        ).toFixed(0)}`;
        lineOuter.style.width = `${(remainingTime / 20) * 100}%`;
        if (remainingTime <= 0) {
            chooseAnswer(null);
            clearInterval(intervalId);
            nextMove();
        }
    };

    const chooseAnswer = answer => {
        if (answer !== null && answer.length < 1) {
            return;
        }
        addAnswer(answer);
    };

    const nextMove = () => {
        if (intervalId) {
            stopTimer();
        }
        if (currentQuestion === questionsArr.length - 1) {
            return allQuestionsDoneCb();
        }
        currentQuestion++;
        shiftCards();

        remainingTime = 20;
        timeEl.classList.remove('expiring');
        lineOuter.style.width = `100%`;
        setTimeout(start.bind(null, questionsArr), 500);
    };
    prepareBtn.addEventListener('click', () => {
        prepareEl.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        start(questionsArr);
    });

    forwardArrow.addEventListener('click', () => {
        if (!chosenAnswer) {
            return;
        }
        chooseAnswer(chosenAnswer);
        nextMove();
    });
};

questionContainer.addEventListener('click', e => {
    const el = e.target.closest('.question__option');
    if (!el) {
        return;
    }
    resetOptionElements(el.parentElement);
    el.classList.add('chosen');
    chosenAnswer = el.textContent.split('.')[1].trim();
});
