import { TABLET_WIDTH } from "./../_vars.js";

const header = document.querySelector('.header');
const menu = header ? header.querySelector('.header__menu-wrapper') : null;
const headerTop = header ? header.querySelector('.header__top') : null;
const socials = header ? header.querySelector('.header__socials') : null;

let isUserHeaderMoved = false;

const moveHeader = () => {
  if (header && TABLET_WIDTH.matches && !isUserHeaderMoved) {
    headerTop.appendChild(socials);

    isUserHeaderMoved = true;
  }

  if (header && !TABLET_WIDTH.matches && isUserHeaderMoved) {
    menu.appendChild(socials);

    isUserHeaderMoved = false;
  }
};

TABLET_WIDTH.addEventListener('change', moveHeader);

export { moveHeader };
