import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';


function createFooterBrand(footerBrand) {
  const footerBrandContainer = document.createElement('div');
  footerBrandContainer.classList.add('footer-brand-container');

  const brand = document.createElement('div');
  brand.classList.add('footer-brand');

  const sections = footerBrand.querySelectorAll('.section');

  const left = document.createElement('div');
  left.classList.add('left');

  const logo = sections[0].querySelector('picture');
  const text = sections[0].querySelector('p:nth-of-type(2)');

  left.append(logo);
  left.append(text);

  const center = document.createElement('div');
  center.classList.add('center');

  const logo2 = sections[1].querySelector('picture');
  center.append(logo2);

  const right = document.createElement('div');
  right.classList.add('right');

  const star = sections[2].querySelector('picture');
  right.append(star);

  brand.append(left);
  brand.append(center);
  brand.append(right);

  const terms = document.createElement('div');
  terms.classList.add('terms');
  terms.append(...sections[3].querySelectorAll('a'));

  const copyright = document.createElement('div');
  copyright.classList.add('copyright');

  const copyrightLeft = document.createElement('div');
  copyrightLeft.classList.add('terms-right');
  copyrightLeft.append(sections[4].querySelector('p'));

  const copyrightRight = document.createElement('div');
  copyrightRight.classList.add('terms-left');
  copyrightRight.append(sections[4].querySelector('p:last-of-type'));

  copyright.append(copyrightLeft);
  copyright.append(copyrightRight);

  footerBrandContainer.append(brand);
  footerBrandContainer.append(terms);
  footerBrandContainer.append(copyright);
  return footerBrandContainer;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const footerBrandPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer-brand';
  const fragment = await loadFragment(footerPath);
  const footerBrandFragment = await loadFragment(footerBrandPath);

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

  // get the last nav-col
  const lastNavCol = footer.querySelector('.nav-col:last-child');
  const socials = document.createElement('div');
  socials.classList.add('socials');
  lastNavCol.append(socials);

  ['facebook', 'twitter', 'youtube', 'newfeed'].forEach(social => {
    const socialButton = document.createElement('a');
    socialButton.classList.add('social-button');
    socialButton.classList.add(social);
    socialButton.href = `https://www.${social}.com`;
    socialButton.target = '_blank';
    socialButton.title = social;
    socialButton.innerHTML = `<span class="icon icon-${social}"></span>`;
    socials.append(socialButton);
  });

  // create footer-brand
  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand');

  const brand = createFooterBrand(footerBrandFragment);

  block.textContent = '';
  block.append(footer);
  block.append(brand);
}
