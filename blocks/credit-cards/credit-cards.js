export default function decorate(block) {

  const h1 = block.querySelector('h1');
  // delete the first div
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

  /* End Mobile Container */

  const cardsWrapper = document.createElement('ul');
  cardsWrapper.classList.add('cards-wrapper');

  // for each div replace it with a li
  block.querySelectorAll(':scope > div').forEach(div => {
    const li = document.createElement('li');
    li.classList.add('card');
    li.append(...div.children);
    div.remove();
    cardsWrapper.append(li);
  });


  cardsWrapper.querySelectorAll(':scope > li').forEach((div, index) => {
    div.classList.add('card', index == 1 ? 'active' : 'x');
    cardsWrapper.append(div);

    if (div.children[0]) {
      div.children[0].classList.add('title');
    }

    if (div.children[1]) {
      div.children[1].classList.add('image');
    }

    if (div.children[2]) {
      div.children[2].classList.add('banner', index == 1 ? 'active' : 'x');
    }

    if (div.children[3]) {
      div.children[3].classList.add('mobile', 'title');
    }
  });


  // remove all .button classes from the a tags
  cardsWrapper.querySelectorAll('a').forEach(a => {
    a.classList.remove('button');
  });

  block.innerHTML = '';

  // add the class 'mobile' to the block if the screen is less than 1024px
  if (window.innerWidth < 1024) {
    block.classList.add('mobile');
  }

  // listen for resize events and if the screen is less than 1024px, add the class 'mobile' to the cardsWrapper
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024) {
      block.classList.add('mobile');
    } else {
      block.classList.remove('mobile');
    }
  });

  block.append(h1);
  block.append(mobileContainer);
  block.append(cardsWrapper);
}
