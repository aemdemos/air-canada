const isDesktop = window.matchMedia('(min-width: 900px)');

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(locator, expanded = false) {
  locator.querySelectorAll(':scope > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.classList.add('nav-sections');

  const ulEl = block.querySelector(':scope ul');
  const liEls = ulEl.querySelectorAll(':scope > li');

  liEls.forEach((li) => {
    li.classList.add('nav-drop');
    const a = li.querySelector('.button-container a');
    a.classList.remove('button');
    li.insertBefore(a, li.firstChild);
    li.querySelector('.button-container').remove();

    li.addEventListener('mouseover', () => {
      if (isDesktop.matches) {
        toggleAllNavSections(nav);
        li.setAttribute('aria-expanded', 'true');
      }
    });

    li.addEventListener('mouseenter', () => {
      if (isDesktop.matches) {
        toggleAllNavSections(nav);
        li.setAttribute('aria-expanded', 'true');
      }
    });

    li.addEventListener('mouseleave', (event) => {
      if (event.target.closest('ul')) return;
      if (isDesktop.matches) {
        toggleAllNavSections(nav);
        li.setAttribute('aria-expanded', 'false');
      }
    });
  });

  nav.append(...liEls);
  block.textContent = '';
  block.append(nav);
}
