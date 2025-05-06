export default function decorate(block) {

  block.querySelectorAll(':scope > div > div').forEach((div) => {
    div.classList.add('offer-banner-row');
  });
}
