export default function createCard(cardInfo, cardTemplate, openCard, openPopupWithConfirmation, putLike, userId) {
    const name = cardInfo.name;
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

    function openCard(name, link){
        const popUpCard= document.querySelector(".popup_type_image");
        const imageItem = popUpCard.querySelector('.popup__image');
        imageItem.src = link;
        popUpCard.classList.add('popup_is-opened');
        //document.addEventListener('mousedown', closePopUpCard);
        popUpCard.querySelector('.popup__close').addEventListener('click', closePopUpCard);
        document.addEventListener('keydown', buttonEscape);
    }

    function buttonEscape(evt) {
        console.log(evt.key);
        if (evt.key === 'Escape') {
            closePopUpCard();
        };
      }

    function closePopUpCard() {
        document.querySelector(".popup_type_image").classList.remove('popup_is-opened');
        //document.removeEventListener('mousedown', closePopUpCard);
        document.querySelector(".popup_type_image").querySelector('.popup__close').removeEventListener('click', closePopUpCard);
        document.removeEventListener('keydown', buttonEscape);
      };

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


