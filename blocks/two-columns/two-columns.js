export default function decorate(block) {
  const [title, ...cards] = block.children;

  const container = document.createElement('div');
  container.classList.add('two-columns-container');

  cards.forEach((card) => {
    card.classList.add('two-columns-item');
    const firstDiv = card.querySelector('div:first-child');
    const hasPicture = firstDiv.querySelector(':scope > picture') !== null;
    const hasText = firstDiv.textContent.trim() !== '';

    if (!hasPicture && hasText) {
      card.classList.add('two-columns-title');
      const h2 = document.createElement('h2');
      h2.innerHTML = firstDiv.innerHTML;
      firstDiv.innerHTML = '';
      firstDiv.append(h2);
    }
    container.append(card);
  });

  block.innerHTML = '';
  block.append(title, container);
}
