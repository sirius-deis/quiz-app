import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const btnEl = document.querySelector('.result .btn');
const nameEl = document.querySelector('.result .result__name');
const ctx = document.getElementById('chart');

export const createChart = (
    rightAnswers,
    wrongAnswers,
    noAnswers,
    name,
    resetCb
) => {
    nameEl.textContent = name;
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Right', 'Wrong', 'No answer'],
            datasets: [
                {
                    label: 'Number of answers',
                    data: [rightAnswers, wrongAnswers, noAnswers],
                    borderWidth: 1,
                    backgroundColor: ['#4ade80', '#ef4444', '#fef3c7'],
                    hoverOffset: 4,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    btnEl.addEventListener('click', resetCb);
};
