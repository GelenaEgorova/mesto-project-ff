import { initialCards } from "../constants";

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
    cardCopy.querySelector('.card__like-button').addEventListener('click', (event) => likeCard(event));
    cardCopy.querySelector('.card__image').addEventListener('click', (event) => openImage(event));
    return cardCopy;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const placesItem = event.target.closest('.card');
  placesItem.remove();
};

// @todo: Вывести карточки на страницу
function buildCards() {
  initialCards.forEach(function (item) {
    cardList.append(createCard(item.name, item.link, deleteCard));
  });
}

function likeCard(event) {
  if (event.target.classList.contains('card__like-button')) {
    event.target.classList.toggle('card__like-button_is-active');
    };
};

function openImage(event) {
  const popup= document.querySelector(".popup_type_image");
  const imageItem = popup.querySelector('.popup__image');
  imageItem.src = event.target.src
  openPopup(event, popup);
}

function openPopup(evt, popup) {
  evt.preventDefault();
  popup.classList.add('popup_is-opened');
  popup.addEventListener('mousedown', buttonEscape);
  document.addEventListener('keydown', buttonEscape);
}

function buttonEscape(evt) {
  if (evt.key === 'Escape') {
      closePopup(evt);
  };
};

function closePopup() {
  evt.target.classList.remove('popup_is-opened');
  document.removeEventListener('mousedown', buttonEscape);
  document.removeEventListener('keydown', buttonEscape);
}

/**
overlay.addEventListener('click', function() {
  document.querySelector('popup_is-opened').classList.remove('popup_is-opened');
  this.classList.remove('active');
});
*/

export {deleteCard, buildCards};