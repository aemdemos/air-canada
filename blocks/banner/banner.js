import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const picture = block.querySelector('picture');
  const optimizedPic = createOptimizedPicture(picture.querySelector('img').src, picture.querySelector('img').alt, false, [{ width: '750' }]);
  moveInstrumentation(picture.querySelector('img'), optimizedPic.querySelector('img'));
  picture.querySelector('img').closest('picture').replaceWith(optimizedPic);

  const secondDiv = block.querySelector('div:nth-child(2)');
  secondDiv.querySelector('p').classList.remove('button-container');
  secondDiv.querySelector('p').querySelector('a').classList.remove('button');
  block.innerHTML = '';
  block.append(optimizedPic);
  block.append(secondDiv);
}
