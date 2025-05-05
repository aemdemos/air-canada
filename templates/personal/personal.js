// Add event listener for credit card selection
document.addEventListener('credit-card-selected', (event) => {
  const { cardIndex, cardElement } = event.detail;
  const cardsWrapper = document.querySelector('.cards-wrapper');

  if (cardsWrapper) {
    // Remove active class from all cards
    cardsWrapper.querySelectorAll('.card').forEach(card => {
      card.classList.remove('active');
      card.classList.add('x');
    });

    // Add active class to selected card
    cardElement.classList.remove('x');
    cardElement.classList.add('active');

    // Update banner active state
    const banner = cardElement.querySelector('.banner');
    if (banner) {
      cardsWrapper.querySelectorAll('.banner').forEach(b => {
        b.classList.remove('active');
        b.classList.add('x');
      });
      banner.classList.remove('x');
      banner.classList.add('active');
    }
  }
});
