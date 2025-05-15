import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {

  const cards = [];

  [...block.children].forEach((child) => {
    const picture = child.querySelector('div:nth-child(1) > picture');
    const heading = child.querySelector('div:nth-child(2)');
    const description = child.querySelector('div:nth-child(3)');
    const toggled = child.querySelector('div:nth-child(4)');

    if (!picture || !heading || !description || !toggled) return;

    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '110' }]);
      moveInstrumentation(picture, optimizedPic.querySelector('img'));
      picture.replaceWith(optimizedPic);
    }

    child.classList.add('tile');

    const tileHeading = document.createElement('div');
    tileHeading.classList.add('tile-heading');

    const content = document.createElement('div');
    content.classList.add('tile-content');

    const toggledContent = document.createElement('div');
    toggledContent.classList.add('tile-content-toggled');

    tileHeading.append(picture, heading);
    content.append(description);
    toggledContent.append(toggled);

    const learnMore = document.createElement('a');
    learnMore.classList.add('learn-more');
    learnMore.innerHTML = 'Learn More';

    // listen for click on learn more
    child.addEventListener('click', (e) => {
      e.target.closest('.tile').classList.toggle('toggled');
    });

    child.innerHTML = '';
    child.append(tileHeading, content, toggledContent, learnMore);
    cards.push(child);
  });

  block.append(...cards);
}

