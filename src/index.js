import './pages/index.css';

import { createCard, deleteCard, toggleLike} from './scripts/components/card';
import initialCards from './scripts/cards';

import { closeModal, openModal } from './scripts/components/modal';
import {clearValidation, enableValidation} from './scripts/components/validation';
import { getUserInfo, getInitialCards, editedUserInfo, addNewCard, updateAvatar} from './scripts/components/api';

// раздел общих функций
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

function renderLoading(isLoading) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (openedPopup) {
      const saveButton = openedPopup.querySelector('.popup__button');
      saveButton.textContent = isLoading?  'Сохранение...' : 'Сохранить';
  }
}

// раздел профиля пользователя
const userProfile =  document.querySelector('.profile');
const userName = userProfile.querySelector('.profile__title');
const userDescription = userProfile.querySelector('.profile__description');
const userImage = userProfile.querySelector('.profile__image');

const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
profilePopup.classList.add('popup_is-animated'); 

const editProfileBtn = document.querySelector('.profile__edit-button');
const popupEditProfile = document.forms['edit-profile'];


editProfileBtn.addEventListener('click', () => {
  nameInput.value=userName.textContent;
  jobInput.value= userDescription.textContent;
  openModal(profilePopup);
  clearValidation(popupEditProfile, validationConfig);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  editedUserInfo({
    name:nameInput.value,
    about:jobInput.value
  })
    .then((userInfo) => {
    userName.textContent = userInfo.name;
    userDescription.textContent = userInfo.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
      closeModal(profilePopup);
    }); 
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

Promise.all([getUserInfo(),getInitialCards()])
.then(([userInfo, cardAdded]) => {
  const userId=userInfo._id;
  userName.textContent = userInfo.name;
  userDescription.textContent = userInfo.about;
  userImage.style = `background-image: url('${userInfo.avatar}')`;
  cardAdded.forEach(function (cardAdded) { 
    cardList.append(createCard(cardAdded, openCard, deleteCard, toggleLike, userInfo._id)); 
}); 
})
 .catch((err) => {
  console.log(err);
});        

// раздел добавления карточек

const placePopup = document.querySelector('.popup_type_new-card');
const placeElement = placePopup.querySelector('.popup__form');
const placeName = placeElement.querySelector('.popup__input_type_card-name');
const placeImage = placeElement.querySelector('.popup__input_type_url');
const editPlaceBtn = document.querySelector('.profile__add-button');
placePopup.classList.add('popup_is-animated'); 
const popupAddPlace = document.forms['new-place'];

editPlaceBtn.addEventListener('click', () => {
  openModal(placePopup);
  clearValidation(popupAddPlace, validationConfig)
});

function handleFormSubmitPlace (evt){
  evt.preventDefault();
  renderLoading(true);
  addNewCard({
    name: placeName.value,
    link: placeImage.value
  })
  .then((cardInfo) => {
  cardList.prepend(createCard(cardInfo, openCard, deleteCard, toggleLike, cardInfo.owner._id));
  placeElement.reset();})
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
  renderLoading(false);
  closeModal(placePopup);
  })
}

placeElement.addEventListener('submit', handleFormSubmitPlace);

// включение валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

 enableValidation(validationConfig); 

// раздел изменения аватара
const popupAvatar = document.querySelector('.popup__input_type_avatar_edit');
const editAvatarBtn = document.querySelector('.avatar-button');
const popupEditAvatar = document.forms['edit-avatar'];
const avatarInput = popupEditAvatar['avatar']

editAvatarBtn.addEventListener('click', function() {
  openModal(popupAvatar);
  avatarInput.value = '';
  clearValidation(popupEditAvatar, validationConfig);
});

popupEditAvatar.addEventListener('submit', function(evt) {
  evt.preventDefault();
  renderLoading(true);
  updateAvatar(avatarInput.value)
    .then((userInfo) => {
  userImage.style = `background-image: url('${userInfo.avatar}')`;
})
  .finally(() => {
    renderLoading(false);
    closeModal(popupAvatar);
  });
});