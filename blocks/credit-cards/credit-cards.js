export default function decorate(block) {

  const h1 = block.querySelector('h1');
  // delete the first div
  block.firstElementChild.remove();

  // wrap the divs in the block in a div with class .cards-wrapper
  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('cards-wrapper');
  block.querySelectorAll(':scope > div').forEach(div => {
    cardsWrapper.append(div);

    // for the 3rd div under div, add the class .banner
    if (div.children[2]) {
      div.children[2].classList.add('banner');
      div.children[2].classList.add('active');
    }
  });

  // remove all .button classes from the a tags
  cardsWrapper.querySelectorAll('a').forEach(a => {
    a.classList.remove('button');
  });

  block.innerHTML = '';
  block.append(h1);
  block.append(cardsWrapper);
}
