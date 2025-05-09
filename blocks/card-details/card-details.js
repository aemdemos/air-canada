import { safeAppend } from '../../scripts/block-helper.js';
export default function decorate(block) {
  let [title, ...rest] = block.children;
  const container = document.createElement('div');
  container.classList.add('card-details-container');

  // filter out rest of the children where the children length is 2 and remove them from the rest array
  let cards = rest.filter((child) => child.children.length === 2);
  rest = rest.filter((child) => child.children.length !== 2);

  cards.forEach((card) => {
    card.classList.add('card-detail');
    container.append(card);
  });

  let eligibility;
  if (rest.length > 0) {
    eligibility = document.createElement('div');
    eligibility.classList.add('card-eligibility');
    eligibility.append(...rest[0].children);
  }

  block.innerHTML = '';
  safeAppend(block, title, container, eligibility);
}
