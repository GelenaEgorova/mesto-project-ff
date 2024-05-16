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
import initialCards from './scripts/constants';

import { createPopupWithImage, createPopupWithForm } from './scripts/components/Popup';
import {createUserProfile, getUserInfo, setUserInfo, setProfileImage} from './scripts/components/UserProfile';

// раздел кнопок
const editProfileBtn = document.querySelector ('.profile__edit-button');
const editPlaceBtn   = document.querySelector ('.profile__add-button');

// раздел профиля пользователя 
const user = createUserProfile('.profile');
setUserInfo(user, {names:'Жак-Ив Кусто',description:'Исследователь океана'});
setProfileImage(user, avatar);



// Раздел Карточки

const cardList = document.querySelector('.places__list');
initialCards.forEach(function (item) {
  imageToCards(item)
});

function popUPCard(name,link){
  createPopupWithImage('.popup_type_image',name,link);
}

function imageToCards(image){
  cardList.prepend(createCard(image,'#card-template',popUPCard));
}

// раздел hедактирования профиля пользователя
function openPopupEditProfile() {
  createPopupWithForm({
    selector: '.popup_type_edit',
    handleFormSubmit: (formData) => setUserInfo(user,formData),
    info: getUserInfo(user)
  });
}
editProfileBtn.addEventListener('click', openPopupEditProfile);

// добавить новый раздел карточки

function openPopupPlaceEditor() {
  createPopupWithForm({
    selector: '.popup_type_new-card',
    handleFormSubmit: (formData) => imageToCards(formData)
  });
}
editPlaceBtn.addEventListener('click', openPopupPlaceEditor);
