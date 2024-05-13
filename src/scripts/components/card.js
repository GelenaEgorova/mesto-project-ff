export default function createCard(cardInfo, cardTemplate, openCard, putLike, userId) {
    const name = cardInfo.name || cardInfo['place-name'];
    const link = cardInfo.link;
    const cardElement = document.querySelector(cardTemplate).content.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLike = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    function setEventListeners() {
        cardImage.addEventListener('click', function() {
            openCard(name, link);
        });
        cardLike.addEventListener('click',toggleLike);
        deleteButton.addEventListener('click', deleteCard);
    }

    // Функция удаления карточки
    function deleteCard(evt) {
        cardElement.closest('.card').remove();
    }
    
    function toggleLike(evt) {
        const lik = evt.target.classList;
        lik.contains('card__like-button') ? 
        lik.toggle('card__like-button_is-active'): 
        lik.toggle('card__like-button_is-active')
    }

    function generateCard() {
        cardTitle.textContent = name;
        cardImage.src = link;
        cardImage.alt = name;
        setEventListeners();
        return cardElement;
    }

    return generateCard();
}


