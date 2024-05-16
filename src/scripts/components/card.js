export default function createCard(cardInfo, cardTemplate, openCard) {
    const name = cardInfo.name || cardInfo['place-name'];
    const link = cardInfo.link;
    const cardElement = document.querySelector(cardTemplate).content.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLike = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    cardImage.addEventListener('click', function() {
        openCard(name, link);
    });
    cardLike.addEventListener('click',toggleLike);
    deleteButton.addEventListener('click', deleteCard);
    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    return cardElement;
};

// Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
};

// Функция добавления лайка
function toggleLike(evt) {
    const likе = evt.target.classList;
    if (likе.contains('card__like-button')) { 
    likе.toggle('card__like-button_is-active');
    }
};