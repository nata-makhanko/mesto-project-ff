export const deleteCard = (card) => {
  card.remove();
};

export const likeCard = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
}

export const createCard = (card, openImageModal, deleteCard, likeCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.addEventListener('click', function(event) {
    const target = event.target;
    if(target.classList.contains('card__image')) {
      openImageModal(card.link, card.name);
    }

    if(target.classList.contains('card__like-button')) {
      likeCard(likeButton);
    }

    if(target.classList.contains('card__delete-button')) {
      deleteCard(cardElement);
    }
    
  })

  return cardElement;

};