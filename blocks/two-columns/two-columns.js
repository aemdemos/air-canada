export default function decorate(block) {
  const [title, ...cards] = block.children;

  const container = document.createElement('ul');
  container.classList.add('two-columns-container');

  cards.forEach((card) => {
    const li = document.createElement('li');
    li.classList.add('two-columns-item');
    li.append(...card.children);
    container.append(li);
  });

  block.innerHTML = '';
  block.append(title, container);
}
