// find the heros element then make the second div active
document.querySelector('.heros>div:nth-child(2)').classList.add('active');

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

// add an event listener for the event aue:ui-select  
document.addEventListener('aue:ui-select', (event) => {


  // update the hero class
  if (event.target.classList.contains('hero') || event.target.closest('.hero')) {
    // get ther hero 
    const hero = event.target.closest('.hero');

    // remove active class from all heros
    document.querySelectorAll('.hero').forEach(hero => {
      hero.classList.remove('active');
    });

    // add active class to the hero that was selected
    hero.classList.add('active');
  }
});
