import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [title, ...cards] = block.children;

  const container = document.createElement('div');
  container.classList.add('two-columns-container');

  cards.forEach((card) => {
    card.classList.add('two-columns-item');
    container.append(card);
  });

  block.innerHTML = '';
  block.append(title, container);
}
