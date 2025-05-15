import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, true, [{ width: '180' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  const h1 = block.querySelector('h1');
  block.firstElementChild.remove();

  const ccNav = document.createElement('div');
  ccNav.classList.add('cc-nav');

  /* Mobile Container */
  const mobileContainer = document.createElement('div');
  ccNav.append(mobileContainer);

  mobileContainer.classList.add('mobile-cc-container');
  mobileContainer.innerHTML = `
    <span class="dropdown-label">Select a card</span>
    <span class="mobile-content">TD® Aeroplan® Visa Infinite* Card</span>
    <span class="dropdown-arrow closed"></span>
  `;

  mobileContainer.addEventListener('click', () => {
    mobileContainer.querySelector('.dropdown-arrow').classList.toggle('closed');
  });

  const cardsWrapper = document.createElement('ul');
  ccNav.append(cardsWrapper);
  cardsWrapper.classList.add('cards-wrapper');

  // Convert divs to list items and add appropriate classes
  block.querySelectorAll(':scope > div').forEach((div, index) => {
    const li = document.createElement('li');
    li.classList.add('card');
    if (index === 1) {
      li.classList.add('active');
    }

    // Add click handler to dispatch custom event
    li.addEventListener('click', () => {
      const event = new CustomEvent('credit-card-selected', {
        detail: {
          cardIndex: index,
          cardElement: li,
          // Add more details as needed
        },
        bubbles: true
      });
      li.dispatchEvent(event);

      // close the dropdown
      mobileContainer.querySelector('.dropdown-arrow').classList.add('closed');
    });

    // Add classes to children
    [...div.children].forEach((child, childIndex) => {
      const classes = [
        ['title'],
        ['image'],
        ['banner'],
        ['mobile', 'title']
      ][childIndex] || [];
      child.classList.add(...classes);
    });

    const fragment = div.querySelector(':scope>div:last-of-type')
    const a = fragment.querySelector('a');
    li.setAttribute('data-cc-page', a.href);
    fragment.remove();

    li.append(...div.children);
    cardsWrapper.append(li);
    moveInstrumentation(div, li);
  });

  cardsWrapper.querySelectorAll('a').forEach(a => a.classList.remove('button'));

  // Handle mobile/desktop view
  const updateView = () => {
    block.classList.toggle('mobile', window.innerWidth < 1024);
  };
  updateView();
  window.addEventListener('resize', updateView);

  block.innerHTML = '';
  block.append(h1, ccNav);

  // trigger cards loaded event
  const event = new CustomEvent('cards-loaded', {
    detail: {
      cardsWrapper
    }
  });
  document.dispatchEvent(event);
}
