/* global WebImporter */
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ulEls = block.querySelectorAll(':scope ul');

  ulEls.forEach((ul, index) => {
    // move the instrumentation to the ul element based on the children index of the block
    moveInstrumentation(block.children[index], ul);

    ul.addEventListener('mouseenter', () => {
      ul.classList.add('active');
    });
    ul.addEventListener('mouseleave', () => {
      ul.classList.remove('active');
    });
  });

  block.textContent = '';
  block.append(...ulEls);
}
