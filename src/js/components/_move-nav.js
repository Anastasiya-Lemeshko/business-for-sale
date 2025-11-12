import { TABLET_WIDTH } from "./../_vars.js";

const header = document.querySelector('.header');
const menu = header ? header.querySelector('.header__menu-wrapper') : null;
const user = header ? header.querySelector('.header__user') : null;
const socials = header ? header.querySelector('.header__socials') : null;

let isUserHeaderMoved = false;

const moveHeader = () => {
  if (header && TABLET_WIDTH.matches && !isUserHeaderMoved) {
    user.prepend(socials);

    isUserHeaderMoved = true;
  }

  if (header && !TABLET_WIDTH.matches && isUserHeaderMoved) {
    menu.appendChild(socials);

    isUserHeaderMoved = false;
  }
};

TABLET_WIDTH.addEventListener('change', moveHeader);

export { moveHeader };
