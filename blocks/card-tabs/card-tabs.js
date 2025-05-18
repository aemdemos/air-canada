/**
 * @typedef TabInfo
 * @property {string} name
 * @property {HTMLElement} $tab
 * @property {HTMLElement} $content
 */

/**
 * @param {HTMLElement} block
 */
export function createTabs(block) {
  const $ul = block.querySelector('ul');
  if (!$ul) {
    return;
  }

  const t = block.querySelectorAll('li');
  t.forEach((ti, index) => {
    ti.classList.add('tab-item');
    ti.dataset.tabIndex = index;
    let title = '';
    let image = '';
    let banner = '';
    let cardType = '';
    [title, image, banner, cardType] = Array.from(ti.querySelectorAll('div>div:nth-child(2)')).map((div) => div.innerHTML);

    ti.innerHTML = `
      <div class="tab-item-title">${title}</div>
      <div class="tab-item-image">${image}</div>
      <div class="tab-item-banner">${banner}</div>
      <div class="tab-item-card-type">${cardType}</div>
    `;
  });

  const tablist = block.querySelector('ul');
  const tabs = tablist.querySelectorAll('li');
  if (tabs.length === 3) {
    tabs[1].classList.add('active');
  } else {
    tabs[0].classList.add('active');
  }
}

/**
 * @param {HTMLElement} $block
 */
export default function decorate($block) {
  const tabNavContainer = document.createElement('div');
  tabNavContainer.classList.add('tab-nav-container');

  const container = document.createElement('div');
  container.classList.add('tab-nav');

  tabNavContainer.append(container);

  const title = document.createElement('h2');
  title.textContent = 'TD® Aeroplan® Personal Credit Cards';
  tabNavContainer.prepend(title);

  $block.prepend(tabNavContainer);
  createTabs($block);

  /* Mobile Container */
  const mobileContainer = document.createElement('div');

  mobileContainer.classList.add('mobile-cc-container');
  mobileContainer.innerHTML = `
    <span class="dropdown-label">Select a card</span>
    <span class="mobile-content">TD® Aeroplan® Visa Infinite* Card</span>
    <span class="dropdown-arrow closed"></span>
  `;

  mobileContainer.addEventListener('click', () => {
    mobileContainer.querySelector('.dropdown-arrow').classList.toggle('closed');
  });

  const tabNav = $block.querySelector('ul');
  container.append(mobileContainer);
  container.append(tabNav);

  // remove the next sibling of tab-nav-container
  const { nextSibling } = tabNavContainer;
  if (nextSibling) {
    nextSibling.remove();
  }

  // // find the active tab and set the section that matches the active tab to visible
  const activeTab = $block.querySelector('li.active');
  let activeTabIndex = activeTab.dataset.tabIndex;

  const activeItems = document.querySelectorAll(`[data-tab-index="${activeTabIndex}"]`);
  activeItems.forEach((i) => {
    i.classList.add('active');
  });

  const tabs = $block.querySelectorAll('li');
  tabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      const newIndex = event.currentTarget.dataset.tabIndex;
      let items = document.querySelectorAll(`[data-tab-index="${activeTabIndex}"]`);
      items.forEach((i) => {
        i.classList.remove('active');
      });

      items = document.querySelectorAll(`[data-tab-index="${newIndex}"]`);
      items.forEach((i) => {
        i.classList.add('active');
      });

      activeTabIndex = newIndex;

      mobileContainer.querySelector('.dropdown-arrow').classList.add('closed');
      document.dispatchEvent(new Event('card-tabs-updated', { detail: { tabIndex: newIndex } }));
    });
  });

  document.dispatchEvent(new Event('card-tabs-updated'));
}
