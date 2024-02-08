let closePopupByEscHandler; 

const closePopupByClick = (event) => {
  const target = event.target;
  if (target.classList.contains('popup__close') || target.classList.contains('popup')) {
    const popup = target.closest('.popup');
    if (popup) {
      closeModal(popup);
    }
  }
}

const closePopupByEsc = (event, popup) => {
  if (popup && event.key === 'Escape') {
    closeModal(popup);
  }
}

export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');

  modal.addEventListener('click', closePopupByClick);
  closePopupByEscHandler = (event) => closePopupByEsc(event, modal);
  document.addEventListener('keydown', closePopupByEscHandler);
  
}

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');

  modal.removeEventListener('click', closePopupByClick);
  document.removeEventListener('keydown', closePopupByEscHandler);

}
