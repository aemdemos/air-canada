export default function decorate(block) {

  const cards = [];

  [...block.children].forEach((child) => {
    const picture = child.querySelector('div:nth-child(1) > picture');
    const heading = child.querySelector('div:nth-child(2)');
    const description = child.querySelector('div:nth-child(3)');
    const toggled = child.querySelector('div:nth-child(4)');

    if (!picture || !heading || !description || !toggled) return;

    child.classList.add('tile');

    const tileHeading = document.createElement('div');
    tileHeading.classList.add('tile-heading');

    const content = document.createElement('div');
    content.classList.add('tile-content');

    const toggledContent = document.createElement('div');
    toggledContent.classList.add('tile-content-toggled');

    tileHeading.append(picture, heading);
    content.append(description);
    toggledContent.append(toggled);

    const learnMore = document.createElement('a');
    learnMore.classList.add('learn-more');
    learnMore.href = '#';
    learnMore.innerHTML = 'Learn More';

    // listen for click on learn more
    learnMore.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.closest('.tile').classList.toggle('toggled');
    });

    child.innerHTML = ''; x
    child.append(tileHeading, content, toggledContent, learnMore);
    cards.push(child);
  });

  block.innerHTML = '';
  block.append(...cards);
}