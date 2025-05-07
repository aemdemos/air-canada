import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');

  const [blockTitle, blockImage, footerTitle, footerDetails, ...cards] = block.children;

  cards.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    while (row.firstElementChild) {
      li.append(row.firstElementChild);
    }

    [...li.children].forEach((div, index) => {
      if (index === 0) div.className = 'cards-card-image';
      else if (index === 1) div.className = 'cards-card-title';
      else if (index === 2) div.className = 'cards-card-body';
      else if (index === 3) div.className = 'cards-card-points';
      else div.className = '';
    });

    const container = document.createElement('div');
    container.className = 'cards-card-content';
    container.append(li.querySelector('.cards-card-title'));
    container.append(li.querySelector('.cards-card-body'));
    li.append(container);

    ul.append(li);
  });

  // optimize images
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  const footer = document.createElement('div');
  footer.className = 'cards-card-footer';
  footer.append(blockImage);

  const footerContainer = document.createElement('div');
  footerContainer.className = 'cards-card-footer-container';
  footerContainer.append(footerTitle);
  footerContainer.append(footerDetails);
  footer.append(footerContainer);

  block.textContent = '';
  block.append(blockTitle);
  block.append(ul);
  block.append(footer);
}
