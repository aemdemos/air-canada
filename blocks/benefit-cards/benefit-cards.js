export default function benefitCards(block) {
  const [title, cta, ...cards] = block.children;

  block.textContent = '';
  block.append(title);

  const ul = document.createElement('ul');
  ul.className = 'benefit-cards';

  cards.forEach((card) => {
    const li = document.createElement('li');
    li.className = 'benefit-card';
    li.append(card);
    ul.append(li);
  });

  block.append(ul);

  block.append(cta);

} 