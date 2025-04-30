/* global WebImporter */


const createCreditcards = (main, document, params) => {
  const creditcards = main.querySelector('div.ae-content.top.afterHero');

  if (creditcards) {
    const cells = [
      ['Credit Cards']
    ];

    // add the title of the creditcards block
    const title = creditcards.querySelector('h1');
    cells.push([title]);

    // now build the individual creditcard items
    const ccnav = creditcards.querySelector('.cc-nav')
    const cards = ccnav.querySelectorAll('li');

    cards.forEach(card => {
      const title = card.querySelector('.responsive-cc-title');

      const link = card.querySelector('.sub-nav-tabs');
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.innerHTML = link.querySelector('span').innerHTML.trim()

      const banner = card.querySelector('.banner > p');
      const image = card.querySelector('img');

      if (image) {
        const imageAlt = image.getAttribute('alt') || title.textContent || '';
        image.setAttribute('alt', imageAlt);
      }

      cells.push([newLink, image, banner.innerHTML, title]);
      card.remove();
    });

    const block = WebImporter.DOMUtils.createTable(cells, document);
    creditcards.append(block);
  }
};
export default createCreditcards;