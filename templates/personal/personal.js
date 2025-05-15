const DEFAULT_FRAGMENT = '/ca/en/aco/home/aeroplan/credit-cards/td/cards/infinite';

function getFragment(path) {
  const cachedFragment = window.fragmentCache[path];
  if (!cachedFragment) {
    return null;
  }
  return cachedFragment;
}

// Add event listener for credit card selection
document.addEventListener('credit-card-selected', (event) => {
  const { cardIndex, cardElement } = event.detail;
  const cardsWrapper = document.querySelector('.cards-wrapper');

  if (cardElement.classList.contains('active')) {
    return;
  }

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

  let fragment;
  if (fragmentCache[new URL(ccPage).pathname]) {
    fragment = getFragment(new URL(ccPage).pathname);
  }

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


// document.addEventListener('cards-loaded', (event) => {
//   const li = document.querySelectorAll('li.card');
//   li.forEach(async li => {
//     const ccPage = li.getAttribute('data-cc-page');
//     const path = new URL(ccPage).pathname;
//     if (!fragmentCache[path]) {
//       loadFragment(path).then((fragment) => {
//         const id = new URL(ccPage).pathname;
//         console.log(`loading fragment ${id}`);
//         fragmentCache[id] = fragment;
//       })
//     } else {
//       console.log(`fragment ${path} already loaded`);
//     }
//   });
// });

export default async function decorate(document) {
  const main = document.querySelector('main');
  const section = document.querySelector('main .section');
  section.classList.add('hero-container');

  // generate a fake dom here that will be replaced
  const heroHolder = document.createElement('div');
  heroHolder.classList.add('hero-wrapper-holder');

  const fragmentHolder = document.createElement('div');
  fragmentHolder.classList.add('fragment-holder');
  main.appendChild(fragmentHolder);

  const breadcrumbsWrapper = section.querySelector('.breadcrumbs-wrapper');
  if (breadcrumbsWrapper) {
    breadcrumbsWrapper.after(heroHolder);
  }

  const fragment = getFragment(DEFAULT_FRAGMENT);
  // update heroHolder with heroContainer
  const heroContainer = fragment.querySelector('.hero-container > .hero-wrapper');
  heroHolder.replaceWith(heroContainer);

  // append after section
  section.after(...fragment.children);
}
