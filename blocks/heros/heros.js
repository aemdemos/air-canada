import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const heros = block.querySelectorAll(':scope > div');
  heros.forEach((hero, i) => {
    hero.dataset.tabIndex = i;
    hero.classList.add('hero-item');

    // update the image with an optimized image
    const picture = hero.querySelector('picture');
    const image = picture.querySelector('img');
    if (image) {
      const optimizedImage = createOptimizedPicture(image.src, image.alt, true);
      picture.replaceWith(optimizedImage);
    }
  });
}
