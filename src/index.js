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


const profileImg = document.querySelector('.profile__image');

profileImg.style.backgroundImage = `url(${card_1})`;

buildCards();