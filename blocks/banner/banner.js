import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const picture = block.querySelector('picture');
  const optimizedPic = createOptimizedPicture(picture.querySelector('img').src, picture.querySelector('img').alt, false, [{ width: '750' }]);
  // moveInstrumentation(picture.querySelector('img'), optimizedPic.querySelector('img'));
  picture.querySelector('img').closest('picture').replaceWith(optimizedPic);

  const anchor = block.querySelector('p');
  anchor.classList.remove('button-container');
  anchor.querySelector('a').classList.remove('button');
  moveInstrumentation(anchor.querySelector('a'), anchor);

  block.innerHTML = '';
  block.append(picture);
  block.append(anchor);
}

