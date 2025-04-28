/* global WebImporter */

const createHero = (main, document, params) => {
  const hero = main.querySelector('.ae-header.header-infinite');

  if (hero) {
    const picImg = hero.querySelector('picture > img');
    picImg.alt = picImg.alt || 'Hero image';

    const headerEl = hero.querySelector('.header-text');
    const pillEl = headerEl.querySelector('.red-pill');

    const textEl = document.createElement('div')
    textEl.append(headerEl.querySelector('h1'));
    textEl.append(headerEl.querySelector('h2'));

    const cells = [
      ['Hero'],
      [picImg],
      [pillEl],
      [textEl],
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);
    hero.append(block);
  }
};
export default createHero;