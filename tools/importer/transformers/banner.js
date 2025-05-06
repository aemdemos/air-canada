/* global WebImporter */


const banner = (main, document, params) => {
  const banner = main.querySelector('.compare-banner');

  if (banner) {
    const cells = [
      ['Banner']
    ];

    // get the div .compare-banner background image and create an image tag
    const backgroundImage = banner.querySelector('.card-imagery');
    const image = document.createElement('img');
    image.src = backgroundImage.style.backgroundImage.split('url(')[1].split(')')[0].replace(/\"/g, '')
    image.alt = 'Banner';
    cells.push([image]);

    // get the anchor tag from the banner and create a link tag
    const link = banner.querySelector('a');
    const linkTag = document.createElement('a');
    linkTag.href = link.href;
    linkTag.textContent = link.textContent;
    cells.push([linkTag]);

    const block = WebImporter.DOMUtils.createTable(cells, document);
    banner.innerHTML = '';
    banner.append(block);
  }
};
export default banner;