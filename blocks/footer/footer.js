import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';

  const footer = document.createElement('div');
  footer.classList.add('footer-container');

  // go through the children of the footer and find the '.default-content-wrapper'
  const defaultContentWrapper = fragment.querySelector('.default-content-wrapper');

  if (defaultContentWrapper) {
    const pElements = defaultContentWrapper.querySelectorAll(':scope>p');
    pElements.forEach(pElement => {
      const navRowDiv = document.createElement('div');
      navRowDiv.classList.add('nav-col');

      let current = pElement.nextElementSibling;
      const pChildren = [];
      while (current && current.tagName !== 'P') {
        pChildren.push(current);
        current = current.nextElementSibling;
      }

      navRowDiv.append(pElement);
      navRowDiv.append(...pChildren);
      footer.append(navRowDiv);
    });
  }

  block.textContent = '';
  block.append(footer);
}
