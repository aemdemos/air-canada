export default async function decorate(block) {
  const picture = block.querySelector('picture');

  const anchor = block.querySelector('p');
  // anchor.classList.remove('button-container');
  // anchor.querySelector('a').classList.remove('button');

  block.innerHTML = '';
  block.append(picture);
  block.append(anchor);
}

