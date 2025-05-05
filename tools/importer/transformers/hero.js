/* global WebImporter */

const createHero = (main, document, params) => {
  const page = main.querySelector('#credits-cards-overview-td-personal');
  const heros = page.querySelectorAll('.ae-header');

  if (!heros) {
    return;
  }

  const cells = [['Heros']];

  for (const hero of heros) {
    if (hero) {
      const picImg = hero.querySelector('picture > img');
      picImg.alt = picImg.alt || 'Hero image';

      const headerEl = hero.querySelector('.header-text');
      const pillEl = headerEl.querySelector('.red-pill');

      const richText = document.createElement('div');
      richText.append(headerEl.querySelector('h1'));
      richText.append(headerEl.querySelector('h2'));

      const row = [
        [picImg],
        [pillEl],
        [richText],
      ];

      cells.push(row);
      hero.remove();
    }
  }

  const block = WebImporter.DOMUtils.createTable(cells, document);
  page.insertBefore(block, page.firstChild);
};
export default createHero;