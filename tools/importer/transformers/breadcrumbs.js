/* global WebImporter */
const createBreadcrumbs = (main, document) => {
  const breadcrumb = main.querySelector('.breadcrumb');

  if (breadcrumb) {
    // get all ul elements that have the style display: block;
    const allBreadcrumbUls = breadcrumb.querySelectorAll('ul');
    // remove all ul elements that do not have [style="display: block;"]
    const cells = [['Breadcrumbs']];
    allBreadcrumbUls.forEach((ul) => {
      if (!ul.style.display || ul.style.display !== 'block') {
        ul.remove();
      } else {
        cells.push([ul]);
      }
    });

    const block = WebImporter.DOMUtils.createTable(cells, document);
    breadcrumb.append(block);
  }
};

export default createBreadcrumbs;
