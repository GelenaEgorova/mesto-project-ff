// @todo: Темплейт карточки
const card = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard (name, link, deleteCard) {
    const cardCopy = card.querySelector('.card').cloneNode(true);
    cardCopy.querySelector('.card__title').textContent = name;
    cardCopy.querySelector('.card__image').src = link;
    cardCopy.querySelector('.card__image').alt = name;
    cardCopy.querySelector('.card__delete-button').addEventListener('click', (event) => deleteCard(event));
    return cardCopy;
}


// @todo: Функция удаления карточки
function deleteCard() {
  const placesItem = event.target.closest('p;l>>>>');
  placesItem.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  cardList.append(createCard(item.name, item.link, deleteCard));
});