/* Try to force a refresh in code */
export default function decorate(document) {
  const main = document.querySelector('main');
  const heroContainer = document.createElement('div');
  heroContainer.className = 'section hero-container';

  const heros = document.querySelectorAll('.hero-wrapper');
  heros.forEach((hero, i) => {
    hero.dataset.tabIndex = i;
    heroContainer.append(hero);
  });

  main.insertBefore(heroContainer, main.children[0]);

  const container = document.querySelector('.card-tabs-container');
  const panels = document.querySelectorAll('.tabs-panel');
  container.append(...panels);
}
