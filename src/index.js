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

import createUserProfile from './scripts/components/UserProfile';
import createCard from './scripts/components/card';
import initialCards from './scripts/constants';

import { createPopupWithImage, createPopupWithForm } from './scripts/components/Popup';

// раздел кнопок веб-приложения
const editProfileBtn = document.querySelector ('.profile__edit-button');
const editPlaceBtn   = document.querySelector ('.profile__add-button');

// раздел профиля пользователя 
const user = createUserProfile('.profile');
user.setUserInfo({names:'Жак-Ив Кусто',description:'Исследователь океана'});
user.setProfileImage(avatar);



// Раздел Карточки
const popUPCard = createPopupWithImage('.popup_type_image');
const cardList = document.querySelector('.places__list');
initialCards.forEach(function (item) {
  imageToCards(item)
});

function imageToCards(image){
  cardList.prepend(createCard(image,'#card-template',popUPCard.open));
}
popUPCard.setEventListeners();

// раздел редактора профиля пользователя
const popupProfileEditor = createPopupWithForm({
  selector: '.popup_type_edit',
  handleFormSubmit: (formData) => user.setUserInfo(formData)
});

function openPopupEditProfile() {
  popupProfileEditor.open(user.getUserInfo());
}
editProfileBtn.addEventListener('click', openPopupEditProfile);
popupProfileEditor.setEventListeners();

// добавить новый раздел карты

const popupPlaceEditor = createPopupWithForm({
  selector: '.popup_type_new-card',
  handleFormSubmit: (formData) => imageToCards(formData)
});

function openPopupPlaceEditor() {
  popupPlaceEditor.open();
}
editPlaceBtn.addEventListener('click', openPopupPlaceEditor);
popupPlaceEditor.setEventListeners();