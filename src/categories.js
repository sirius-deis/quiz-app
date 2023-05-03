const categoryListEl = document.querySelector('.category__list');

function createCategoryListAndInsert(categoryList) {
    const imgDimension = 120;
    const listForAppending = categoryList.map(categoryItem => {
        const liEl = document.createElement('li');
        liEl.classList.add('category__item');
        liEl.dataset.title = categoryItem.title;
        const card = document.createElement('div');
        card.classList.add('card');
        liEl.appendChild(card);
        const loader = document.createElement('div');
        loader.classList.add('lds-roller');
        loader.innerHTML =
            '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>';
        card.appendChild(loader);
        const front = document.createElement('div');
        front.classList.add('card__front');

        const img = new Image();
        img.src = `public/images/${categoryItem.name}.png`;
        img.width = imgDimension;
        img.height = imgDimension;
        img.onload = () => {
            loader.replaceWith(front, back);
        };
        front.appendChild(img);
        const back = document.createElement('div');
        back.classList.add('cart__back');
        back.textContent = categoryItem.title;
        return liEl;
    });
    categoryListEl.append(...listForAppending);
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
