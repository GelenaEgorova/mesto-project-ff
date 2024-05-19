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

import { closeModal, openModal } from './scripts/components/modal';

const buttonCloseList = document.querySelectorAll('.popup__close'); 
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closeModal(popup)); 
  popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal(popup);
        }
    });
}) 

// раздел профиля пользователя
const userProfile =  document.querySelector('.profile');
const userName = userProfile.querySelector('.profile__title');
const userDescription = userProfile.querySelector('.profile__description');

const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
profilePopup.classList.add('popup_is-animated'); 

const editProfileBtn = document.querySelector ('.profile__edit-button');

editProfileBtn.addEventListener('click', () => {
  nameInput.value=userName.textContent;
  jobInput.value= userDescription.textContent;
  openModal(profilePopup);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  
  closeModal(profilePopup);
};
profileFormElement.addEventListener('submit', handleProfileFormSubmit);


//раздел добавленных карточек мест
const cardList = document.querySelector('.places__list');
const popupOpenImage = document.querySelector('.popup_type_image');
popupOpenImage.classList.add('popup_is-animated'); 
const popupImage = popupOpenImage.querySelector ('.popup__image');
const popupTitle = popupOpenImage.querySelector ('.popup__caption');

function openCard(name, link) {
  popupImage.src = link;
  popupTitle.textContent = name;
  popupImage.alt = name;
  openModal(popupOpenImage)
};

initialCards.forEach(function (cardAdded) { 
  cardList.append(createCard(cardAdded, openCard)); 
}); 

// раздел добавления карточек

const placePopup = document.querySelector('.popup_type_new-card');
const placeElement = placePopup.querySelector('.popup__form');
const placeName = placeElement.querySelector('.popup__input_type_card-name');
const placeImage = placeElement.querySelector('.popup__input_type_url');
const editPlaceBtn = document.querySelector('.profile__add-button');
placePopup.classList.add('popup_is-animated'); 

editPlaceBtn.addEventListener('click', () => {
  openModal(placePopup);
});

function handleFormSubmitPlace (evt){
  evt.preventDefault();
  const cardInfo = {
    name: placeName.value,
    link: placeImage.value
  }
  cardList.prepend(createCard(cardInfo, openCard));
  placeElement.reset();
  closeModal(placePopup);
}

placeElement.addEventListener('submit', handleFormSubmitPlace);
