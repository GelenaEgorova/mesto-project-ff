export default function createCard(cardInfo, openCard) {
    const cardTamplate = document.querySelector('#card-template').content;
    const cardElement = cardTamplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    cardTitle.textContent = cardInfo.name;
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    const cardLike = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardImage.addEventListener('click', function() {
        openCard(cardInfo.name, cardInfo.link);
    });
    cardLike.addEventListener('click', () => toggleLike(cardLike));
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    return cardElement;
};

// Функция удаления карточки
function deleteCard(cardElement) {  
    cardElement.remove(); 
  };  

// Функция добавления лайка
function toggleLike(cardLike) { 
cardLike.classList.toggle('card__like-button_is-active'); 

}; 
