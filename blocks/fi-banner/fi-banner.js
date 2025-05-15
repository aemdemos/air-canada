export default function decorate(block) {
  const bannerContent = document.createElement('div');
  bannerContent.classList.add('fi-banner-content');

  // take everything but the image (the first div)
  bannerContent.append(...block.querySelectorAll(':scope > div:not(:first-child)'));

  // move the second and third divs in banner content into a new div
  const bannerRow = document.createElement('div');
  bannerRow.classList.add('fi-banner-row');

  // take everything but the text which is the first div
  bannerRow.append(...bannerContent.querySelectorAll(':scope > div:not(:first-child)'));

  bannerRow.children[0].classList.add('fi-conditions');
  bannerRow.children[1].classList.add('fi-cta');

  bannerContent.children[0].classList.add('fi-title');

  bannerContent.append(bannerRow);
  block.append(bannerContent);
}
