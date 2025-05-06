
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