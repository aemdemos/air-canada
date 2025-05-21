export default function decorate(document) {
  const pageHeader = document.createElement('div');
  pageHeader.classList.add('page-header');
  const pageHeaderWrapper = document.createElement('div');
  pageHeaderWrapper.classList.add('page-header-wrapper');
  pageHeaderWrapper.appendChild(pageHeader);

  const flag = document.createElement('div');
  flag.classList.add('cnd-flag');

  const accessibilityLink = document.createElement('a');
  accessibilityLink.classList.add('accessibility-link');
  accessibilityLink.href = 'https://www.aircanada.com/ca/en/aco/home/plan/accessibility.html';
  accessibilityLink.appendChild(flag);
  accessibilityLink.innerHTML = 'Accessibility';

  const language = document.createElement('a');
  language.href = '#';
  language.innerHTML = 'English';
  language.classList.add('language-link');
  const search = document.createElement('form');
  search.classList.add('search-form', 'input-groupd');
  search.action = 'https://www.aircanada.com/ca/en/aco/home/search-results.html';
  search.method = 'get';
  search.innerHTML = `<div class="search-form-container">
      <label class="search-holder label" for="searchbox_011"></label>
      <input type="text" class="txt-box txt-search-box" id="searchbox_011" placeholder="FIND" value="" role="textbox">
        <span type="submit" class="icon find btn-ghost" role="button" aria-label="Submit"></span>
    </div>`;

  pageHeader.appendChild(accessibilityLink);
  pageHeader.appendChild(flag);
  pageHeader.appendChild(language);
  pageHeader.appendChild(search);

  const header = document.querySelector('header');
  header.appendChild(pageHeaderWrapper);

  document.addEventListener('card-tabs-updated', (event) => {
    const { tabIndex } = event.detail;
    const hero = document.querySelector(`.hero[data-tab-index="${tabIndex}"]`);
    if (hero) {
      hero.classList.add('active');
    }
  });
}
