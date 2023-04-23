const categoryListEl = document.querySelector(".category__list");

const categoryList = [
    {
        name: "music",
        title: "music",
    },
    {
        name: "sport",
        title: "sport and leisure",
    },
    {
        name: "movie",
        title: "film and tv",
    },
    {
        name: "art",
        title: "arts and literature",
    },
    {
        name: "history",
        title: "history",
    },
    {
        name: "society",
        title: "society and culture",
    },
    {
        name: "science",
        title: "science",
    },
    {
        name: "geography",
        title: "geography",
    },
    {
        name: "food",
        title: "food and drink",
    },
    {
        name: "general",
        title: "general knowledge",
    },
];

function createCategoryListAndInsert() {
    const imgDimension = 120;
    const listForAppending = categoryList
        .map((categoryItem) => {
            return `
        <li class="category__item" data-title="${categoryItem.title}">
            <div class="card">
                <div class="card__front">
                    <img src="public/images/${categoryItem.name}.png" width="${imgDimension}" height="${imgDimension}" alt="${categoryItem.name}" />
                </div>
                <div class="cart__back">${categoryItem.title}</div>
            </div>
        </li>
        `;
        })
        .join("");
    categoryListEl.innerHTML = listForAppending;
}

export const createCategoryList = (setQuestions) => {
    createCategoryListAndInsert();

    categoryListEl.addEventListener("click", (e) => {
        const el = e.target.closest(".category__item");
        if (!el) {
            return;
        }
        const categoryName = el.dataset.title.replace(" ", "-");
        fetchQuestions(categoryName);
    });

    const fetchQuestions = async (categoryName) => {
        const response = await fetch(` https://the-trivia-api.com/api/questions?categories=${categoryName}&limit=12`);
        const data = await response.json();

        setQuestions(data);
    };
};
