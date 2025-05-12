import { loadFragment } from '../../blocks/fragment/fragment.js';

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
});


async function loadCreditCardPage(cardEl) {
  // find the active li and load the fragment 
  const ccPage = cardEl.getAttribute('data-cc-page');
  const fragmentPath = new URL(ccPage);
  const fragment = await loadFragment(fragmentPath.pathname);
  const main = document.querySelector('main');
  // remove all children of main after the first child

  while (main.children.length > 2) {
    main.children[2].remove();
  }
  // append the fragment to the main  

  // find the hero-container and add it to the first section under main
  const heroContainer = fragment.querySelector('.hero-container > .hero-wrapper');
  if (heroContainer) {
    const section = main.querySelector('.section');
    if (section.querySelector('.hero-wrapper')) {
      section.replaceChild(heroContainer, main.querySelector('.hero-wrapper'));
    } else {
      const firstSection = main.querySelector('.section');
      if (firstSection) {
        // append the hero-container after the .breadcrumbs-wrapper ini the first section
        const breadcrumbsWrapper = firstSection.querySelector('.breadcrumbs-wrapper');
        if (breadcrumbsWrapper) {
          breadcrumbsWrapper.after(heroContainer);
        }
        firstSection.classList.add('hero-container');
      }
    }
  }

  main.append(...fragment.children);
}

document.addEventListener('cards-loaded', (event) => {
  const { cardsWrapper } = event.detail;
  if (!window.location.hash) {
    const secondLi = cardsWrapper.querySelector('.card:nth-child(2)');
    if (secondLi) {
      secondLi.classList.add('active');
      loadCreditCardPage(secondLi);
    }
  }
});