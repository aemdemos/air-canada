/* global WebImporter */
const createBreadcrumbs = (main, document, params) => {
  const breadcrumb = main.querySelector('.breadcrumb');

  // get all ul elements that have the style display: block;
  const allBreadcrumbUls = breadcrumb.querySelectorAll('ul');
  // remove all ul elements that do not have [style="display: block;"]
  const rows = [];
  allBreadcrumbUls.forEach((ul) => {
    if (!ul.style.display || ul.style.display !== 'block') {
      ul.remove();
    } else {
      rows.push([ul]);
    }
  });

  const cells = [['Breadcrumbs'], rows];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  breadcrumb.append(block);
};

export default createBreadcrumbs;