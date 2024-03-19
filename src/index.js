import './pages/index.css';
import {createCard, toggleLikeCard, deleteCard} from './scripts/card';
import {openModal, closeModal} from './scripts/modal';
import {enableValidation, clearValidation} from './scripts/validation';
import * as api from './scripts/api';
const pageContent = document.querySelector('.page__content');

const placesList = pageContent.querySelector('.places__list');

const imgModal = pageContent.querySelector('.popup_type_image');

const editProfileButton = pageContent.querySelector('.profile__edit-button');
const editProfileModal = pageContent.querySelector('.popup_type_edit');
const formEditProfile = editProfileModal.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

const addCardButton = pageContent.querySelector('.profile__add-button');
const addCardModal = pageContent.querySelector('.popup_type_new-card');
const formCard = addCardModal.querySelector('.popup__form');
const inputsListNewPlace = formCard.querySelectorAll('.popup__input');
const nameNewPlace = formCard.querySelector('.popup__input_type_card-name');
const linkNewPlace = formCard.querySelector('.popup__input_type_url');

const editAvatarButton = pageContent.querySelector('.profile__image');
const editAvatarModal = pageContent.querySelector('.popup_type_avatar');
const formEditAvatar = editAvatarModal.querySelector('.popup__form');
const linkAvatarInput = editAvatarModal.querySelector('.popup__input_type_url_avatar');

const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileAvatar = profile.querySelector('.profile__image');

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

async function fetchData() {
  try {
    const [profileUserData, cardsData] = await Promise.all([api.getProfileUser(), api.getCards()]);
    profileTitle.textContent = profileUserData.name;
    profileDescription.textContent = profileUserData.about;
    profileAvatar.style.backgroundImage = `url(${profileUserData.avatar})`;
    profile.id = profileUserData._id;

    cardsData.forEach(card => addCardsToPage({card, position: 'append', myId: profile.id}));

  } catch (error) {
    console.log(`Текст ошибки: "${error.message}"`);
  }
}

function addCardsToPage ({card, position, myId}) {
  switch (position) {
    case 'prepend': 
      return placesList.prepend(createCard({card, openImageModal, deleteCard, likeCard: toggleLikeCard, myId}));
    case 'append': 
      return placesList.append(createCard({card, openImageModal, deleteCard, likeCard: toggleLikeCard, myId}));
    default:
      return null;
  }
}

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(editProfileModal);
});

addCardButton.addEventListener('click', () => {
  [...inputsListNewPlace].forEach(input => input.value = '');
  clearValidation(formCard, validationConfig);
  openModal(addCardModal);
});

editAvatarButton.addEventListener('click', () => {
  clearValidation(formEditAvatar, validationConfig);
  openModal(editAvatarModal);
})

function openImageModal (imgSrc, caption) {
  const popupImageNode = imgModal.querySelector('.popup__image');
  const popupCaptionNode = imgModal.querySelector('.popup__caption');
  popupImageNode.src = imgSrc;
  popupImageNode.alt = caption;
  popupCaptionNode.textContent = caption;
  openModal(imgModal);
}

async function handleFormEditProfileSubmit(event) {
  event.preventDefault();

  try {
    const editProfileUser = await api.editProfileUser({
      name: nameInput.value,
      about: jobInput.value,
    });

    profileTitle.textContent = editProfileUser.name;
    profileDescription.textContent = editProfileUser.about;
    profileAvatar.style.backgroundImage = `url(${editProfileUser.avatar})`;

  } catch (error) {
    console.log(`Текст ошибки: "${error.message}"`);
  }

  closeModal(editProfileModal);
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

async function handleFormEditAvatarSubmit(event) {
  event.preventDefault();

  try {
    const editAvatarData = await api.editProfileAvatar({
      avatar: linkAvatarInput.value
    });
    
    profileAvatar.style.backgroundImage = `url(${editAvatarData.avatar})`;

  } catch (error) {
    console.log(`Текст ошибки: "${error.message}"`);
  }

  closeModal(editAvatarModal);
}

formEditAvatar.addEventListener('submit', handleFormEditAvatarSubmit);

async function handleFormAddCardSubmit (event) {
  event.preventDefault();
  
  try {
    const addCardData = await api.addCard({
      name: nameNewPlace.value, 
      link:  linkNewPlace.value
    });

    addCardsToPage({
      card: {
        ...addCardData,
      }, 
      position: "prepend",
      myId: profile.id
    });

  } catch (error) {
    console.log(`Текст ошибки: "${error.message}"`);
  }

  closeModal(addCardModal);
 
}

formCard.addEventListener('submit', (event) => {
  handleFormAddCardSubmit(event);
  formCard.reset();
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

fetchData();

