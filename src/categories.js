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

export const createCategoryList = (categoryList, returnChosenCb) => {
    createCategoryListAndInsert(categoryList);

    categoryListEl.addEventListener('click', async e => {
        const el = e.target.closest('.category__item');
        if (!el) {
            return;
        }
        const categoryName = el.dataset.title.replace(' ', '-');

        returnChosenCb(categoryName);
    });
};
