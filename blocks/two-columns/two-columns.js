export default function decorate(block) {
  const [title, ...cards] = block.children;

  const container = document.createElement('div');
  container.classList.add('two-columns-container');

  cards.forEach((card) => {
    card.classList.add('two-columns-item');
    // if the immediate child div does not contain a picture then add a class called title
    if (!card.querySelector('div:first-child > picture')) {
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
