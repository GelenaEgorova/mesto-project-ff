import { deleteUserCard, likeCard, unlikeCard } from "./api";
export default function createCard(cardInfo, openCard, userId) {
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
        deleteButton.remove();
    } else{
        deleteButton.addEventListener('click', () => deleteCard(cardInfo._id, cardElement));
    }
    cardImage.addEventListener('click', function() {
        openCard(cardInfo.name, cardInfo.link);
    });

    cardLike.addEventListener('click', () => {
        if (cardLike.classList.contains('card__like-button_is-active')) {
        unlikeCard(cardInfo._id)
            .then(updatedLikes => {
                cardLike.classList.remove('card__like-button_is-active');
                likeCounter.textContent = updatedLikes.likes.length;
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        likeCard(cardInfo._id)
            .then(updatedLikes => {
                toggleLike(cardLike);
                likeCounter.textContent = updatedLikes.likes.length;
            })
            .catch(error => {
                console.log(error);
            });
    }});

    return cardElement;
};

// Функция удаления карточки
function deleteCard(id, cardElement) {  
    deleteUserCard(id)
    .then(() => {
        cardElement.remove();
    })
    .catch((err) => {
        console.log(err);
    })
  };

// Функция добавления лайка
function toggleLike(cardLike) { 
cardLike.classList.toggle('card__like-button_is-active'); 

}; 
