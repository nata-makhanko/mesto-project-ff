import './pages/index.css';
import {initialCards} from './scripts/cards';
import {createCard} from './scripts/card';
import {openModal, closeModal} from './scripts/modal';

const pageContent = document.querySelector('.page__content');

const placesList = pageContent.querySelector('.places__list');

const editButton = pageContent.querySelector('.profile__edit-button');
const editModal = pageContent.querySelector('.popup_type_edit');
const addButton = pageContent.querySelector('.profile__add-button');
const addModal = pageContent.querySelector('.popup_type_new-card');
const imgModal = pageContent.querySelector('.popup_type_image');

const formElement = editModal.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = pageContent.querySelector('.profile__title');
const profileDescription = pageContent.querySelector('.profile__description');

const formNewPlace = addModal.querySelector('.popup__form');
const nameNewPlace = formNewPlace.querySelector('.popup__input_type_card-name');
const linkNewPlace = formNewPlace.querySelector('.popup__input_type_url');

const addCardsToPage = () => {
  placesList.textContent = '';
  initialCards.map(card => {
    return placesList.append(createCard(card, openImageModal));
  });
}

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editModal);
});

addButton.addEventListener('click', () => openModal(addModal));

pageContent.addEventListener('click', function(event) {
  console.log('fffff', event);
  const target = event.target;
  if (target.classList.contains('popup__close') || target.classList.contains('popup')) {
    const popup = target.closest('.popup');
    if (popup) {
      closeModal(popup);
    }
  }
});

pageContent.addEventListener('keydown', (event) => {
  const popup = pageContent.querySelector('.popup_is-opened');
  if (popup && event.key === 'Escape') {
    closeModal(popup);
  }
});

const openImageModal = (imgSrc, caption) => {
  const popupImageNode = imgModal.querySelector('.popup__image');
  const popupCaptionNode = imgModal.querySelector('.popup__caption');
  popupImageNode.src = imgSrc;
  popupImageNode.alt = caption;
  popupCaptionNode.textContent = caption;
  openModal(imgModal);
}


const handleFormSubmit = (event) => {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
 
  closeModal(editModal);
}

formElement.addEventListener('submit', handleFormSubmit);

const handleFormNewPlaceSubmit = (event) => {
  event.preventDefault();
  
  initialCards.unshift({
    name: nameNewPlace.value,
    link: linkNewPlace.value,
  });

  closeModal(addModal);
  addCardsToPage();
}

formNewPlace.addEventListener('submit', (event) => {
  handleFormNewPlaceSubmit(event);
  formNewPlace.reset();
});

addCardsToPage();


