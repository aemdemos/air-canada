export default function decorate(document) {
  const main = document.querySelector('main');
  const heroContainer = document.createElement('div');
  heroContainer.className = 'section hero-container';

  const heros = document.querySelectorAll('.hero-wrapper');
  heros.forEach((hero, i) => {
    hero.dataset.tabIndex = i;
    // add the hero to the main element at the top but after the other heros
    heroContainer.append(hero);
  });

  main.insertBefore(heroContainer, main.children[0]);

  // move all .card-tabs-container to the .card-tabs-container
  const container = document.querySelector('.card-tabs-container');
  const panels = document.querySelectorAll('.tabs-panel');
  container.append(...panels);

  document.addEventListener('card-tabs-updated', (event) => {
    // const { tabIndex } = event.detail;
    // const hero = document.querySelector(`.hero-wrapper[data-tab-index="${tabIndex}"]`);
    // hero.classList.add('active');

    // const cardTabsContainer = document.querySelector('.card-tabs-container');
    // const target = document.querySelector('.tabs-panel.active > .hero-wrapper');

    // move the card-tabs-container as a sibling of the target
    // if (cardTabsContainer && target) {
    //   //target.parentNode.insertBefore(cardTabsContainer, target.nextSibling);
    // }

    // const mainContainer = document.createElement('div');
    // mainContainer.className = 'sectionxxxxx';
    // mainContainer.appendChild(document.querySelector('.card-tabs-container'));
    // document.querySelector('main').prepend(mainContainer);
  });
}
