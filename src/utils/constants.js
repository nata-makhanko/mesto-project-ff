const pageContent = document.querySelector('.page__content');

export const placesList = pageContent.querySelector('.places__list');

export const imgModal = pageContent.querySelector('.popup_type_image');
export const popupImage = imgModal.querySelector('.popup__image');
export const popupCaption = imgModal.querySelector('.popup__caption');

export const editProfileButton = pageContent.querySelector('.profile__edit-button');
export const editProfileModal = pageContent.querySelector('.popup_type_edit');
export const formEditProfile = document.forms['edit-profile'];
export const nameInput = formEditProfile.elements['name'];
export const jobInput = formEditProfile.elements['description'];

export const addCardButton = pageContent.querySelector('.profile__add-button');
export const addCardModal = pageContent.querySelector('.popup_type_new-card');
export const formCard = document.forms['new-place'];
export const nameNewPlace = formCard.elements['place-name'];
export const linkNewPlace = formCard.elements['link'];

export const editAvatarButton = pageContent.querySelector('.profile__image');
export const editAvatarModal = pageContent.querySelector('.popup_type_avatar');
export const formEditAvatar = document.forms['edit-avatar'];
export const linkAvatarInput = formEditAvatar.elements['link-avatar'];

export const profile = document.querySelector('.profile');
export const profileTitle = profile.querySelector('.profile__title');
export const profileDescription = profile.querySelector('.profile__description');
export const profileAvatar = profile.querySelector('.profile__image');

export const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}