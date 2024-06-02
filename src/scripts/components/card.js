import { deleteUserCard, likeCard, unlikeCard } from "./api";
export function createCard(cardInfo, openCard, deleteCard, toggleLike, userId) {
    const cardTamplate = document.querySelector('#card-template').content;
    const cardElement = cardTamplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLike = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.like-counter');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardTitle.textContent = cardInfo.name;
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    likeCounter.textContent = cardInfo.likes.length;
    if (userId !== cardInfo.owner._id) {
        deleteButton.disabled = true;
        deleteButton.classList.add('visually-hidden');
    } else{
        deleteButton.addEventListener('click', () => deleteCard(cardInfo._id, cardElement));
    }
    cardImage.addEventListener('click', function() {
        openCard(cardInfo.name, cardInfo.link);
    });

    cardLike.addEventListener('click', () => {
        const likeMethod = cardLike.classList.contains('card__like-button_is-active') ? unlikeCard : likeCard;
        likeMethod(cardInfo._id) 
                .then((res) => {
                   toggleLike(cardLike); 
                   likeCounter.textContent = res.likes.length;
                })
        .catch(err => console.log(err)); 
    });

    return cardElement;
};

// Функция удаления карточки
export function deleteCard(id, cardElement) {  
    deleteUserCard(id)
    .then(() => {
        cardElement.remove();
    })
    .catch((err) => {
        console.log(err);
    })
  };

// Функция добавления лайка
export function toggleLike(cardLike) { 
cardLike.classList.toggle('card__like-button_is-active'); 

}; 
