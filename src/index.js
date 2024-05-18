import addicon from './images/add-icon.svg';
import logo from './images/logo.svg';
import close from './images/close.svg';
import deleteicon from './images/delete-icon.svg';
import likeactive from './images/like-active.svg';
import likeinactive from './images/like-inactive.svg';
import editicon from './images/edit-icon.svg';
import avatar from './images/avatar.jpg';
import card_1 from './images/card_1.jpg';
import card_2 from './images/card_2.jpg';
import card_3 from './images/card_3.jpg';
import './pages/index.css';

import createCard from './scripts/components/card';
import initialCards from './scripts/cards';

import { setEventListeners, closeModal, openModal } from './scripts/components/modal';

// раздел профиля пользователя
const userProfile =  document.querySelector('.profile');
const userName = userProfile.querySelector('.profile__title');
const userDescription = userProfile.querySelector('.profile__description');

const profilePopup = document.querySelector('.popup_type_edit');
const formElement = profilePopup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
profilePopup.classList.add('popup_is-animated'); 
setEventListeners(profilePopup);

const editProfileBtn = document.querySelector ('.profile__edit-button');
const profileCloseButton = profilePopup.querySelector('.popup__close');

editProfileBtn.addEventListener('click', () => {
  nameInput.value=userName.textContent;
  jobInput.value= userDescription.textContent;
  openModal(profilePopup);
});

profileCloseButton.addEventListener('click', () => {
  closeModal(profilePopup);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  userName.textContent = nameValue;
  userDescription.textContent = jobValue;
  
  closeModal(profilePopup);
};
formElement.addEventListener('submit', handleFormSubmit);


//раздел добавленных карточек мест
const cardList = document.querySelector('.places__list');
const popup = document.querySelector('.popup_type_image');
const imageCloseButton = popup.querySelector('.popup__close');
popup.classList.add('popup_is-animated'); 
  setEventListeners(popup);

imageCloseButton.addEventListener('click', () => {
  closeModal(popup);
});

function openCard(name, link) {
  const popupImage = popup.querySelector ('.popup__image');
  const popupTitle = popup.querySelector ('.popup__caption');
  popupImage.src = link;
  popupTitle.textContent = name;

  openModal(popup)
};

initialCards.forEach(function (item) { 
  cardList.append(createCard(item.name, item.link, openCard)); 
}); 

// раздел добавления карточек


const placePopup = document.querySelector('.popup_type_new-card');
const placeElement = placePopup.querySelector('.popup__form');
const placeName = placeElement.querySelector('.popup__input_type_card-name');
const placeImage = placeElement.querySelector('.popup__input_type_url');
const placeCloseButton = placePopup.querySelector('.popup__close');
const editPlaceBtn = document.querySelector('.profile__add-button');
placePopup.classList.add('popup_is-animated'); 
setEventListeners(placePopup);

editPlaceBtn.addEventListener('click', () => {
  openModal(placePopup);
});
placeCloseButton.addEventListener('click', () => {
  closeModal(placePopup);
});

function handleFormSubmitPlace (evt){
  evt.preventDefault();
  cardList.prepend(createCard(placeName.value, placeImage.value, openCard));
  placeElement.reset();
  closeModal(placePopup);
}

placeElement.addEventListener('submit', handleFormSubmitPlace);
