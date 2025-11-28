import { TABLET_WIDTH } from "./../_vars.js";

const blogNav = document.querySelector('.blog__nav');
const search = blogNav ? blogNav.querySelector('.blog__search') : null;
const select = blogNav ? blogNav.querySelector('.blog__select') : null;

let isBlogMoved = false;

const moveBlog = () => {
  if (blogNav && TABLET_WIDTH.matches && !isBlogMoved) {
    blogNav.appendChild(search);

    isBlogMoved = true;
  }

  if (blogNav && !TABLET_WIDTH.matches && isBlogMoved) {
    blogNav.appendChild(select);

    isBlogMoved = false;
  }
};

TABLET_WIDTH.addEventListener('change', moveBlog);

export { moveBlog };
