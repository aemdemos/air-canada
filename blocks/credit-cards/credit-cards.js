import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const h1 = block.querySelector('h1');
  block.firstElementChild.remove();

  /* Mobile Container */
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('mobile-cc-container');
  mobileContainer.innerHTML = `
    <span class="dropdown-label">Select a card</span>
    <span class="mobile-content">TD® Aeroplan® Visa Infinite* Card</span>
    <span class="dropdown-arrow"></span>
  `;

  mobileContainer.addEventListener('click', () => {
    mobileContainer.querySelector('.dropdown-arrow').classList.toggle('rotate');
  });

  const cardsWrapper = document.createElement('ul');
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
  block.append(h1, mobileContainer, cardsWrapper);
}
