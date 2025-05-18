export default function decorate(block) {
  const [title, ...cards] = block.children;

  const container = document.createElement('div');
  container.classList.add('two-columns-container');

  cards.forEach((card) => {
    card.classList.add('two-columns-item');
    // if the first child div contains a picture then we have no title OR
    // if the first child is a div, with no text content then we don't have a title
    if (card.querySelector('div:first-child > picture') === null && card.querySelector('div:first-child').textContent !== '') {
      card.classList.add('two-columns-title');
      const h2 = document.createElement('h2');
      h2.textContent = card.querySelector('div:first-child').textContent;
      card.innerHTML = '';
      card.querySelector('div:first-child').appendChild(h2);
    }

    container.append(card);
  });

  block.innerHTML = '';
  block.append(title, container);
}
