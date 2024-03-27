import * as api from './api';
import {profile} from '../utils/constants';

export async function deleteCard(id) {
  try {
    const deleteCardData = await api.deleteCard(id);
    const cardElement = document.querySelector(`[data-id="${id}"]`);
    cardElement.remove(); 

  } catch (error) {
    console.log(`Текст ошибки: "${error.message}"`);
  }
}

export async function toggleLikeCard({buttonElem, countElem, isCardHasMyLike, cardId, openImageModal, deleteCard}) {
  let card;

  try {
    if(isCardHasMyLike) {
      card = await api.deleteLike(cardId);
    } else {
      card= await api.addLike(cardId);
    }

    if(card) {
      changeStateLikeButton({buttonElem, countElem, isCardHasMyLike: !isCardHasMyLike, count: card.likes.length});
      updateCard({card, openImageModal, deleteCard, likeCard: toggleLikeCard});
    }

  } catch (error) {
    console.log(`Текст ошибки: "${error.message}"`);
  }
}


export function changeStateLikeButton ({buttonElem, countElem, isCardHasMyLike, count}) {
  if(isCardHasMyLike) {
    buttonElem.classList.add('card__like-button_is-active');
  } else {
    buttonElem.classList.remove('card__like-button_is-active');
  }

  countElem.textContent = count;
 
}

export function updateCard ({card, openImageModal, deleteCard, likeCard}) {
  const updatedCardElement = createCard(card, {
    openImageModal,
    deleteCard,
    likeCard
  });
  
  // Находим старую карточку и заменяем ее на обновленную
  const oldCardElement = document.querySelector(`[data-id="${card._id}"]`);
  oldCardElement.replaceWith(updatedCardElement);

}

export const createCard = (card, {openImageModal, deleteCard, likeCard}) => {
  const myId = profile.id;
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.setAttribute('data-id', card._id);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardElement.querySelector('.card__title').textContent = card.name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');

  const buttonLikeElem = cardElement.querySelector('.card__like-button');
  const countLikeElem = cardElement.querySelector('.card__like-count');
  const isCardHasMyLike = card.likes.some(like => like._id === myId);

  changeStateLikeButton({buttonElem: buttonLikeElem, countElem: countLikeElem, isCardHasMyLike, count: card.likes.length});

  const isShowDeleteButton = myId === card.owner._id;

  if(!isShowDeleteButton) {
    deleteButton.style.display = 'none';
  }

  cardElement.addEventListener('click', function(event) {
    const target = event.target;
    if(target.classList.contains('card__image')) {
      openImageModal(card.link, card.name);
      return;
    }

    if(target.classList.contains('card__like-button')) {
      likeCard({buttonElem: buttonLikeElem, countElem: countLikeElem, isCardHasMyLike, cardId: card._id, deleteCard, openImageModal});
      return;
    }

    if(target.classList.contains('card__delete-button') && isShowDeleteButton) {
      deleteCard(card._id);
      return;
    }
     
  })

  return cardElement;

};