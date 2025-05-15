/* global WebImporter */

// eslint-disable-next-line no-unused-vars
const createCreditcards = (main, document, params) => {
  const creditcards = main.querySelector('div.ae-content.top.afterHero');

  if (creditcards) {
    const cells = [
      ['Credit Cards'],
    ];

    // add the title of the creditcards block
    const h1 = creditcards.querySelector('h1');
    cells.push([h1]);

    // now build the individual creditcard items
    const ccnav = creditcards.querySelector('.cc-nav');
    const cards = ccnav.querySelectorAll('li');

    cards.forEach((card) => {
      const title = card.querySelector('.responsive-cc-title');
      const link = card.querySelector('.sub-nav-tabs');
      const banner = card.querySelector('.banner > p');
      const image = card.querySelector('img');

      if (image) {
        const imageAlt = image.getAttribute('alt') || title.textContent || '';
        image.setAttribute('alt', imageAlt);
      }

      const cleanedLink = document.createElement('a');
      cleanedLink.href = link.getAttribute('href');
      cleanedLink.innerHTML = link.querySelector('.title').innerHTML;

      cells.push([cleanedLink, image, banner, title]);
      card.remove();
    });

    const block = WebImporter.DOMUtils.createTable(cells, document);
    creditcards.append(block);
  }
};
export default createCreditcards;
