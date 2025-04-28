export default function decorate(block) {
  const ulEls = block.querySelectorAll(':scope ul');

  ulEls.forEach((ul) => {
    ul.classList.add('nav-drop');
  });

  block.textContent = '';
  block.append(...ulEls);
}
