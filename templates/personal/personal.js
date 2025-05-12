import { loadFragment } from '../../blocks/fragment/fragment.js';

// document.querySelector('.heros>div:nth-child(2)').classList.add('active');

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
    loadCreditCardPage(cardElement);
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


async function loadCreditCardPage(cardEl) {
  // find the active li and load the fragment 
  const ccPage = cardEl.getAttribute('data-cc-page');
  const fragmentPath = new URL(ccPage);
  const fragment = await loadFragment(fragmentPath.pathname);
  const main = document.querySelector('main');
  // remove all children of main after the first child
  while (main.children.length > 1) {
    main.children[1].remove();
  }
  // append the fragment to the main  
  main.append(...fragment.children);
}

