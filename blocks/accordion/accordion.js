export default function decorate(block) {
  [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    // decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-item-body';
    // decorate accordion item
    const details = document.createElement('details');

    body.querySelectorAll('a').forEach((a) => {
      if (a.href.indexOf('aircanada.com') === -1) {
        a.classList.add('external-link');
      }
    });

    details.className = 'accordion-item';
    details.append(summary, body);

    // moveInstrumentation(row, details);
    row.replaceWith(details);
  });
}