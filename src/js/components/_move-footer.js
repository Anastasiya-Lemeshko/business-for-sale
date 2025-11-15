import { TABLET_WIDTH } from "./../_vars.js";

const footer = document.querySelector('.footer');
const footerInfo = footer ? footer.querySelector('.footer__info') : null;
const footerBottom = footer ? footer.querySelector('.footer__bottom') : null;
const socials = footer ? footer.querySelector('.footer__socials') : null;

let isFooterMoved = false;

const moveFooter = () => {
  if (footer && TABLET_WIDTH.matches && !isFooterMoved) {
    footerBottom.appendChild(socials);

    isFooterMoved = true;
  }

  if (footer && !TABLET_WIDTH.matches && isFooterMoved) {
    footerInfo.appendChild(socials);

    isFooterMoved = false;
  }
};

TABLET_WIDTH.addEventListener('change', moveFooter);

export { moveFooter };
