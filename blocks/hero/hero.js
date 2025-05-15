import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // update the image with an optimized image
  const picture = block.querySelector('picture');
  const image = picture.querySelector('img');
  if (image) {
    const optimizedImage = createOptimizedPicture(image.src, image.alt, true);
    picture.replaceWith(optimizedImage);
  }
}
