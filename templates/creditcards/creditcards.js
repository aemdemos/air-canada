export default function decorate(document) {
  document.addEventListener('card-tabs-updated', () => {
    const cardTabsContainer = document.querySelector('.card-tabs-container');

    const target = document.querySelector('.tabs-panel.active > .hero-wrapper');

    // move the card-tabs-container as a sibling of the target
    if (cardTabsContainer && target) {
      target.parentNode.insertBefore(cardTabsContainer, target.nextSibling);
    }
  });
}
