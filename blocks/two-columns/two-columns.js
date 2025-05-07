import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [title, ...cards] = block.children;

  const container = document.createElement('ul');
  container.classList.add('two-columns-container');
  container.style.setProperty('column-count', cards.length > 1 ? '2' : '1');
  cards.forEach((card) => {
    const li = document.createElement('li');
    moveInstrumentation(card, li);

    li.classList.add('two-columns-item');
    li.append(...card.children);
    container.append(li);
  });

  block.innerHTML = '';
  block.append(title, container);
}
