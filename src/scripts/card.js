const deleteCard = (event) => {
  const button = event.target; 
  const card = button.closest(".places__item");

  card.remove();
};

export const createCard = (card, openImageModal) => {
  console.log('Сработало', card);
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  cardElement.addEventListener('click', function(event) {
    const target = event.target;
    if(target.classList.contains('card__image')) {
      openImageModal(card.link, card.name);
    }
    
  })

  return cardElement;

};