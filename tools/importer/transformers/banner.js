/* global WebImporter */

const banner = (main, document) => {
  const compareBanner = main.querySelector('.compare-banner');

  if (compareBanner) {
    const cells = [
      ['Banner'],
    ];

    // get the div .compare-banner background image and create an image tag
    const backgroundImage = compareBanner.querySelector('.card-imagery');
    const image = document.createElement('img');
    image.src = backgroundImage.style.backgroundImage.split('url(')[1].split(')')[0].replace(/"/g, '');
    image.alt = 'Banner';
    cells.push([image]);

    // get the anchor tag from the banner and create a link tag
    const link = compareBanner.querySelector('a');
    cells.push([link]);

    const block = WebImporter.DOMUtils.createTable(cells, document);
    compareBanner.innerHTML = '';
    compareBanner.append(block);
  }
};
export default banner;
