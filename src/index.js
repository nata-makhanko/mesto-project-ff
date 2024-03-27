import './pages/index.css';
import {createCard, toggleLikeCard, deleteCard} from './scripts/card';
import {openModal, closeModal} from './scripts/modal';
import {enableValidation, clearValidation} from './scripts/validation';
import {handleSubmit} from './utils/use-form';
import * as api from './scripts/api';
import * as constants from './utils/constants';

function renderCard(item,  method = "prepend") {
  const callbacks = {
    openImageModal,
    deleteCard,
    likeCard: toggleLikeCard,
  }

  const cardElement = createCard(item, callbacks);

  constants.placesList[method](cardElement);
}

async function fetchData() {
  try {
    const [profileUserData, cardsData] = await Promise.all([api.getProfileUser(), api.getCards()]);
    constants.profileTitle.textContent = profileUserData.name;
    constants.profileDescription.textContent = profileUserData.about;
    constants.profileAvatar.style.backgroundImage = `url(${profileUserData.avatar})`;
    constants.profile.id = profileUserData._id;

    cardsData.forEach(card => renderCard(card, 'append'));

  } catch (error) {
    console.log(`Текст ошибки: "${error.message}"`);
  }
}

constants.editProfileButton.addEventListener('click', () => {
  constants.nameInput.value = constants.profileTitle.textContent;
  constants.jobInput.value = constants.profileDescription.textContent;
  clearValidation(constants.formEditProfile, constants.validationConfig);
  openModal(constants.editProfileModal);
});

constants.addCardButton.addEventListener('click', () => {
  constants.formCard.reset();
  clearValidation(constants.formCard, constants.validationConfig);
  openModal(constants.addCardModal);
});

constants.editAvatarButton.addEventListener('click', () => {
  clearValidation(constants.formEditAvatar, constants.validationConfig);
  openModal(constants.editAvatarModal);
})

function openImageModal (imgSrc, caption) {
  constants.popupImage.src = imgSrc;
  constants.popupImage.alt = caption;
  constants.popupCaption.textContent = caption;
  openModal(constants.imgModal);
}

function handleFormEditProfileSubmit(event) {
  function makeRequest() {
    return api.editProfileUser({
        name: constants.nameInput.value,
        about: constants.jobInput.value,
      }).then((dataProfileUser) => {
          constants.profileTitle.textContent = dataProfileUser.name;
          constants.profileDescription.textContent = dataProfileUser.about;
          constants.profileAvatar.style.backgroundImage = `url(${dataProfileUser.avatar})`;
          closeModal(constants.editProfileModal);
      })
  }

  handleSubmit(makeRequest, event);

}

constants.formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);


function handleFormEditAvatarSubmit(event) {
  function makeRequest() {
    return api.editProfileAvatar({
        avatar: constants.linkAvatarInput.value
      }).then((dataProfileAvatar) => {
        constants.profileAvatar.style.backgroundImage = `url(${dataProfileAvatar.avatar})`;
        closeModal(constants.editAvatarModal);
      });
  }

  handleSubmit(makeRequest, event);

}

constants.formEditAvatar.addEventListener('submit', handleFormEditAvatarSubmit);


function handleFormAddCardSubmit (event) {
  function makeRequest() {
    return api.addCard({
        name: constants.nameNewPlace.value, 
        link: constants.linkNewPlace.value
      }).then((dataCard) => {
        renderCard(dataCard, 'prepend');
        closeModal(constants.addCardModal);
      })
  }

  handleSubmit(makeRequest, event);

}

constants.formCard.addEventListener('submit', handleFormAddCardSubmit);

enableValidation({
  formSelector: '.popup__form',
  ...constants.validationConfig,
});

fetchData();

