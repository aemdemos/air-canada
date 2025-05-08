// find the heros element then make the second div active
document.querySelector('.heros>div:nth-child(2)').classList.add('active');

// Add event listener for credit card selection
document.addEventListener('credit-card-selected', (event) => {
  const { cardIndex, cardElement } = event.detail;
  const cardsWrapper = document.querySelector('.cards-wrapper');

  // update the active card
  if (cardsWrapper) {
    cardsWrapper.querySelectorAll('.card').forEach(card => {
      card.classList.remove('active');
    });
    cardElement.classList.add('active');
  }

  // update the hero class by finding the heros element then select the hero by cardIndex
  const heros = document.querySelector('.heros');
  const hero = heros.querySelector(`.hero:nth-child(${cardIndex + 1})`);
  if (hero) {
    document.querySelectorAll('.hero').forEach(hero => {
      hero.classList.remove('active');
    });
    hero.classList.add('active');
  }
});

