export default async function decorate(block) {
  const picture = block.querySelector('picture');

  const anchor = block.querySelector('a');
  anchor.classList.remove('button');

  block.innerHTML = '';
  block.append(picture);
  block.append(anchor);
}

