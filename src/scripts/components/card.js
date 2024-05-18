export default function createCard(name, link, openCard) {
    const cardTamplate = document.querySelector('#card-template').content;
    const cardElement = cardTamplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    const cardLike = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardImage.addEventListener('click', function() {
        openCard(name, link);
    });
    cardLike.addEventListener('click',toggleLike);
    deleteButton.addEventListener('click', deleteCard);
    return cardElement;
};

// Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
};

// Функция добавления лайка
function toggleLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};
