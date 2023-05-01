const categoryListEl = document.querySelector('.category__list');

function createCategoryListAndInsert(categoryList) {
    const imgDimension = 120;
    const listForAppending = categoryList
        .map(categoryItem => {
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
        .join('');
    categoryListEl.innerHTML = listForAppending;
}

const fetchQuestions = async categoryName => {
    const response = await fetch(
        ` https://the-trivia-api.com/api/questions?categories=${categoryName}&limit=12`
    );
    if (!response.ok) {
        //TODO:
        throw new Error(response.statusText);
    }
    const data = await response.json();

    return data;
};

export const createCategoryList = (categoryList, setQuestions) => {
    createCategoryListAndInsert(categoryList);

    categoryListEl.addEventListener('click', async e => {
        const el = e.target.closest('.category__item');
        if (!el) {
            return;
        }
        const categoryName = el.dataset.title.replace(' ', '-');
        const data = await fetchQuestions(categoryName);

        setQuestions(data);
    });
};
