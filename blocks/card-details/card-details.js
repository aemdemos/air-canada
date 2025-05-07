export default function decorate(block) {
  const [title, ...cards] = block.children;

  const container = document.createElement('div');
  container.classList.add('card-details-container');

  cards.forEach((card) => {
    card.classList.add('card-detail');
    container.append(card);
  });

  block.innerHTML = '';
  block.append(title, container);
}
