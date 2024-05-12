import initialCards from '../constants'

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

// @todo: Поставить лайк карточке
function likeCard(event) {
  if (event.target.classList.contains('card__like-button')) {
    event.target.classList.toggle('card__like-button_is-active');
    };
};

// @todo: открыть изображение на всю страницу
function openImage(event) {
  const popup= document.querySelector(".popup_type_image");
  const imageItem = popup.querySelector('.popup__image');
  imageItem.src = event.target.src
  imageItem.alt = event.target.name
  openPopup(popup);
}


function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener("keydown", buttonEscape);
}

function buttonEscape(evt) {
  if (evt.key === 'Escape') {
      closePopup();
  };
};

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', buttonEscape);
}

const closePopupButton= document.querySelector('.popup__close');
closePopupButton.addEventListener('click', closePopup);

function setEventListeners() {
  closePopupButton.addEventListener("mousedown", () => closePopup());
  popup.addEventListener("mousedown", evt => {
    if (evt.target.classList.contains(".popup__is-opened")) {
      closePopup();
    }
  });
}

// @todo: открыть форму редактирования профиля

//overlay.addEventListener('click', closePopup);

const popup_edit = document.querySelector('.popup_type_edit')

const editProfileBtn = document.querySelector ('.profile__edit-button');
editProfileBtn.addEventListener('click', function () {
  openPopup(popup_edit);
});

const formElement = document.querySelector('.popup__form');
const saveButton = document.querySelector('.popup__button');
const inputItem = document.querySelector('.popup__input');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const showName = document.querySelector('.profile__title');
    const showJob = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    showName.textContent = nameValue;
    showJob.textContent = jobValue;
}


formElement.addEventListener('submit', handleFormSubmit); 

function savedInputValues() {
  const formValues = {};
  inputItem.forEach(input => formValues[input.name] = input.value);
  return formValues;
}

/**function setEventListeners(){
  setEventListeners();
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const promise = function(savedInputValues());
    if(!promise) {
      closePopup();
      return;
    }
  });
}
*/
// Форма добавления карточки

const popup_addCard = document.querySelector ('.popup_type_new-card');
const addPlaceBtn = document.querySelector ('.profile__add-button');
addPlaceBtn.addEventListener('click', function () {
  openPopup(popup_addCard);
});

export {deleteCard, buildCards};