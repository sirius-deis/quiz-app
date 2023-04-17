const categoryListEl = document.querySelector(".categories__list");

const categoryList = [
    {
        name: "music",
        title: "music",
    },
    {
        name: "sport",
        title: "sport",
    },
    {
        name: "movie",
        title: "film & tv",
    },
    {
        name: "art",
        title: "arts & literature",
    },
    {
        name: "art",
        title: "arts & literature",
    },
    {
        name: "history",
        title: "history",
    },
    {
        name: "society",
        title: "society & culture",
    },
    {
        name: "geography",
        title: "geography",
    },
    {
        name: "food",
        title: "food & drink",
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
            <div class="card">
                <div class="card__front">
                    <img src="public/icons/${categoryItem.name}.png" width="${imgDimension}" height="${imgDimension}" alt="${categoryItem.name}" />
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
