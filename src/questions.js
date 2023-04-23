const prepareEl = document.querySelector(".prepare"),
    prepareBtn = prepareEl.querySelector(".btn");

const questionContainer = document.querySelector(".question__container"),
    timeEl = questionContainer.querySelector(".question__time"),
    progressEl = questionContainer.querySelector(".question__progress"),
    lineOuter = questionContainer.querySelector(".question__outer"),
    questionContent = questionContainer.querySelector(".question__content"),
    forwardArrow = questionContainer.querySelector(".question__forward");

let questionsArr;
let intervalId;
let remainingTime = 20;
let currentQuestion = 0;
let activeCart;
let nextCart;
let answers = [];

export const createQuestionField = (arr) => {
    questionsArr = arr;
};

const createCart = (question) => {
    const answers = [question.correctAnswer, ...question.incorrectAnswers];
    const item = document.createElement("div");
    item.className = "question__item";
    item.innerHTML = `
        <div class="question__task">${question.question}</div>
        <div class="question__options">
            ${answers.map((answer, i) => `<div class="question__option">${i + 1}. ${answer}</div>`).join("")}
        </div>
    `;
    return item;
};

const start = () => {
    if (currentQuestion === 0) {
        activeCart = createCart(questionsArr[currentQuestion]);
    }
    if (currentQuestion < questionsArr.length - 1) {
        nextCart = createCart(questionsArr[currentQuestion + 1]);
        nextCart.classList.add("right-layout");
    }
    questionContent.append(activeCart, nextCart);
    progressEl.textContent = `${currentQuestion}/${questionsArr.length}`;
    intervalId = setInterval(tick, 1000);
};

const tick = () => {
    timeEl.textContent = `Time Left: ${(remainingTime -= 1)}`;
    lineOuter.style.width = `${(remainingTime / 20) * 100}%`;
    if (remainingTime === 0) {
        stopTimer();
    }
};

const stopTimer = () => {
    clearInterval(intervalId);
};

prepareBtn.addEventListener("click", () => {
    prepareEl.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    start();
});

forwardArrow.addEventListener("click", () => {
    if (currentQuestion >= questionsArr.length) {
        return;
    }
    currentQuestion++;
    activeCart.classList.add("left-layout");
    const temp = activeCart;
    setTimeout(() => temp.remove(), 500);
    setTimeout(() => nextCart.classList.remove("right-layout"), 10);
    activeCart = nextCart;

    stopTimer();
    remainingTime = 20;
    lineOuter.style.width = `100%`;
    setTimeout(start, 500);
});

questionContainer.addEventListener("click", (e) => {
    const el = e.target.closest(".question__option");
    if (!el) {
        return;
    }
    answers.push(el.textContent.split(".")[1].trim());
});
