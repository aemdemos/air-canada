export default function benefitCards(block) {
  const [title, cta, ...cards] = block.children;

  block.textContent = '';
  block.append(title);

  // Helper to check mobile
  function isMobile() {
    return window.innerWidth < 768;
  }

  function renderCarousel() {
    // Remove any existing content except title
    while (block.children.length > 1) block.removeChild(block.lastChild);

    let currentIndex = 0;

    // Create carousel elements
    const carousel = document.createElement('div');
    carousel.className = 'benefit-carousel';

    const leftArrow = document.createElement('button');
    leftArrow.className = 'carousel-arrow left';
    leftArrow.setAttribute('aria-label', 'Previous');

    const rightArrow = document.createElement('button');
    rightArrow.className = 'carousel-arrow right';
    rightArrow.setAttribute('aria-label', 'Next');

    const track = document.createElement('div');
    track.className = 'carousel-track';

    const dots = document.createElement('div');
    dots.className = 'carousel-dots';

    // Prepare cards
    const cardElements = cards.map((card) => {
      const li = document.createElement('li');
      li.className = 'benefit-card';
      li.append(card);
      return li;
    });

    // Add cards to track
    cardElements.forEach((card) => track.appendChild(card));

    // Add dots
    cardElements.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = `carousel-dot${idx === 0 ? ' active' : ''}`;
      dot.addEventListener('click', () => {
        currentIndex = idx;
        // eslint-disable-next-line no-use-before-define
        updateCarousel();
      });
      dots.appendChild(dot);
    });

    // Show only the current card
    function updateCarousel() {
      cardElements.forEach((card, idx) => {
        card.style.display = idx === currentIndex ? 'block' : 'none';
      });
      dots.querySelectorAll('.carousel-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    leftArrow.onclick = () => {
      currentIndex = (currentIndex - 1 + cardElements.length) % cardElements.length;
      updateCarousel();
    };
    rightArrow.onclick = () => {
      currentIndex = (currentIndex + 1) % cardElements.length;
      updateCarousel();
    };

    // Initial display
    updateCarousel();

    // Assemble carousel
    carousel.appendChild(leftArrow);
    carousel.appendChild(track);
    carousel.appendChild(rightArrow);
    carousel.appendChild(dots);

    block.append(carousel);
    block.append(cta);
  }

  function renderList() {
    // Remove any existing content except title
    while (block.children.length > 1) block.removeChild(block.lastChild);

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

  function render() {
    if (isMobile()) {
      renderCarousel();
    } else {
      renderList();
    }
  }

  render();
  window.addEventListener('resize', render);
}
