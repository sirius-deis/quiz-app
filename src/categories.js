const categoryListEl = document.querySelector(".categories__list");

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
        <li class="categories__item">
            <div class="card" data-title="${categoryItem.title}">
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

createCategoryListAndInsert();

categoryListEl.addEventListener("click", (e) => {
    const el = e.target;
});
