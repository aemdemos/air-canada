export default function decorate(document) {
  document.addEventListener('card-tabs-updated', (event) => {
    const { tabIndex } = event.detail;
    const hero = document.querySelector(`.hero[data-tab-index="${tabIndex}"]`);
    if (hero) {
      hero.classList.add('active');
    }
  });
}
