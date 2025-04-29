export default function decorate(block) {
  const ulEls = block.querySelectorAll(':scope ul');

  ulEls.forEach((ul) => {
    ul.addEventListener('mouseenter', () => {
      ul.classList.add('active');
    });
    ul.addEventListener('mouseleave', () => {
      ul.classList.remove('active');
    });
  });

  block.textContent = '';
  block.append(...ulEls);
}
