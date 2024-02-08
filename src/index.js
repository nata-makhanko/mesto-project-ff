import './pages/index.css';
import {initialCards} from './scripts/cards';
import {createCard, deleteCard, likeCard} from './scripts/card';
import {openModal, closeModal} from './scripts/modal';

const pageContent = document.querySelector('.page__content');

const placesList = pageContent.querySelector('.places__list');

const editButton = pageContent.querySelector('.profile__edit-button');
const editModal = pageContent.querySelector('.popup_type_edit');
const addButton = pageContent.querySelector('.profile__add-button');
const addModal = pageContent.querySelector('.popup_type_new-card');
const imgModal = pageContent.querySelector('.popup_type_image');

const formEditPersonInfo = editModal.querySelector('.popup__form');
const nameInput = formEditPersonInfo.querySelector('.popup__input_type_name');
const jobInput = formEditPersonInfo.querySelector('.popup__input_type_description');
const profileTitle = pageContent.querySelector('.profile__title');
const profileDescription = pageContent.querySelector('.profile__description');

const formNewPlace = addModal.querySelector('.popup__form');
const nameNewPlace = formNewPlace.querySelector('.popup__input_type_card-name');
const linkNewPlace = formNewPlace.querySelector('.popup__input_type_url');

const addCardsToPage = (card, position) => {
  switch (position) {
    case 'prepend': 
      return placesList.prepend(createCard(card, openImageModal, deleteCard, likeCard));
    case 'append': 
      return placesList.append(createCard(card, openImageModal, deleteCard, likeCard));
    default:
      return null;
  }
}

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editModal);
});

addButton.addEventListener('click', () => openModal(addModal));

const openImageModal = (imgSrc, caption) => {
  const popupImageNode = imgModal.querySelector('.popup__image');
  const popupCaptionNode = imgModal.querySelector('.popup__caption');
  popupImageNode.src = imgSrc;
  popupImageNode.alt = caption;
  popupCaptionNode.textContent = caption;
  openModal(imgModal);
}


const handleFormEditPersonInfoSubmit = (event) => {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
 
  closeModal(editModal);
}

formEditPersonInfo.addEventListener('submit', handleFormEditPersonInfoSubmit);

const handleFormNewPlaceSubmit = (event) => {
  event.preventDefault();
  
  closeModal(addModal);
  addCardsToPage({
    name: nameNewPlace.value,
    link: linkNewPlace.value,
  }, "prepend");
}

formNewPlace.addEventListener('submit', (event) => {
  handleFormNewPlaceSubmit(event);
  formNewPlace.reset();
});

initialCards.map(card => addCardsToPage(card, 'append'));




