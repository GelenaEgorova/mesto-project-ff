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
import { buildCards } from './scripts/components/cards';

// эти три строки нужно переместить в раздел импорта в начале файла.
import initialCards from './scripts/constants';
import createUserProfile from './scripts/components/UserProfile';
import createCard from './scripts/components/card';

import { createPopup, createPopupWithImage, createPopupWithConfirmation, createPopupWithForm } from './scripts/components/Popup';


const projectImages = [
  { name: 'add-icon', link: addicon},
  { name: 'logo', link: logo},
  { name: 'close', link: close},
  { name: 'delete-icon', link: deleteicon},
  { name: 'like-active', link: likeactive},
  { name: 'like-inactive', link: likeinactive},
  { name: 'edit-icon', link: editicon},
  { name: 'avatar', link: avatar},
  { name: 'card_1', link: card_1},
  { name: 'card_2', link: card_2},
  { name: 'card_3', link: card_3}
];


/**
const profile = document.querySelector('.profile');

profile.querySelector('.profile__image').style.backgroundImage = `url(${card_1})`;
profile.querySelector('.profile__title').textContent = 'Жак-Ив Кусто';
profile.querySelector('.profile__description').textContent = 'Исследователь океана';

buildCards();

*/
/** новое обновление */

// раздел профиля пользователя 

const popupProfileEditor = createPopupWithForm({selector:'.popup_type_edit', 
                           handleFormSubmit: (formData) => {
                            console.log(formData);

                           }
                          });

popupProfileEditor.setEventListeners();

const user = createUserProfile('.profile');
user.setUserInfo({title:'Жак-Ив Кусто',description:'Исследователь океана'});
user.setProfileImage(avatar);

user.setUserInfo({title:'асин',description:'Сумасшедший человек'});


// Раздел Карточки

const popUPCard = createPopupWithImage('.popup_type_image');
const cardList = document.querySelector('.places__list');
initialCards.forEach(function (item) {
  cardList.append(createCard(item,'#card-template',popUPCard.open));
});
