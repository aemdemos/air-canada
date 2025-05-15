import { loadFragment } from '../../blocks/fragment/fragment.js';

const DEFAULT_FRAGMENT = '/ca/en/aco/home/aeroplan/credit-cards/td/cards/infinite';

const fragmentCache = {};

async function getFragment(path) {
  const cachedFragment = fragmentCache[path];
  if (!cachedFragment) {
    return loadFragment(path);
  }
  return cachedFragment;
}

function activateCreditCardPage(cardEl) {
  // for all cards with data-cc-page, remove the active class
  document.querySelectorAll('.cc-page').forEach((page) => {
    page.classList.remove('active');
  });

  // remove all active classes from hero-wrapper
  document.querySelectorAll('.hero-wrapper').forEach((heroWrapper) => {
    heroWrapper.classList.remove('active');
  });

  const path = cardEl.getAttribute('data-cc-page');
  const pages = document.querySelector(`.pages .cc-page[data-cc-page="${path}"]`);
  if (pages) {
    pages.classList.add('active');
  }

  const heroWrapper = document.querySelector(`.hero-wrapper[data-cc-page="${path}"]`);
  if (heroWrapper) {
    heroWrapper.classList.add('active');
  }
}

// Add event listener for credit card selection
document.addEventListener('credit-card-selected', (event) => {
  // eslint-disable-next-line no-unused-vars
  const { cardIndex, cardElement } = event.detail;
  const cardsWrapper = document.querySelector('.cards-wrapper');

  if (cardElement.classList.contains('active')) {
    return;
  }

  // update the active card
  if (cardsWrapper) {
    cardsWrapper.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('active');
    });
    cardElement.classList.add('active');
  }

  activateCreditCardPage(event.detail.cardElement);
});

function addHeroToPage(fragment, fragmentId) {
  const heroContainer = document.querySelector('.hero-wrapper-holder');

  const heroWrapper = fragment.querySelector('.hero-container > .hero-wrapper');
  if (heroWrapper) {
    heroWrapper.setAttribute('data-cc-page', fragmentId);
    heroContainer.appendChild(heroWrapper);
  }
  return heroWrapper;
}

function createCreditCardPage(fragment, fragmentId) {
  const ccPage = document.createElement('div');
  ccPage.setAttribute('data-cc-page', fragmentId);
  ccPage.classList.add('cc-page');
  addHeroToPage(fragment, fragmentId);
  ccPage.append(...fragment.children);
  return ccPage;
}

function addNewPage(newPage) {
  const path = newPage.getAttribute('data-cc-page');
  let pages = document.querySelector(`.pages .cc-page[data-cc-page="${path}"]`);
  if (!pages) {
    pages = document.querySelector('.pages');
    pages.append(newPage);
  }
}

export default async function decorate(document) {
  document.addEventListener('cards-loaded', (event) => {
    const { cardsWrapper } = event.detail;
    const cards = Array.from(cardsWrapper.querySelectorAll('.card'));
    cards.map(async (card) => {
      const path = card.getAttribute('data-cc-page');
      const newPage = createCreditCardPage(await getFragment(path), path);
      addNewPage(newPage);
    });
  });

  fragmentCache[DEFAULT_FRAGMENT] = await loadFragment(DEFAULT_FRAGMENT);

  const heroHolder = document.createElement('div');
  heroHolder.classList.add('hero-wrapper-holder');

  const section = document.querySelector('main .section');
  section.classList.add('hero-container');

  const breadcrumbsWrapper = section.querySelector('.breadcrumbs-wrapper');
  if (breadcrumbsWrapper) {
    breadcrumbsWrapper.after(heroHolder);
  }

  const fragment = await getFragment(DEFAULT_FRAGMENT);
  const heroWrapper = addHeroToPage(fragment, DEFAULT_FRAGMENT, heroHolder);
  heroWrapper.classList.add('active');

  const pages = document.createElement('div');
  pages.classList.add('pages', 'section');

  const main = document.querySelector('main');
  main.append(pages);

  const page = createCreditCardPage(fragment, DEFAULT_FRAGMENT);
  page.classList.add('active');
  addNewPage(page);
}
