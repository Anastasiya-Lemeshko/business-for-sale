import { isEscapeKey, getScrollWidth, setTabIndex, removeTabIndex } from './../_utils.js';
import { DESKTOP_WIDTH } from "./../_vars.js";

const header = document.querySelector('.header');
const headerTop = document.querySelector('.header__top');
const menu = header ? header.querySelector('.header__menu') : null;
const burgerMenu = header ? header.querySelector('.header__burger') : null;
const headerLinks = menu ? menu.querySelectorAll('a, button') : null;

let scrollSize = 0;

const updateHeight = () => {
  const height = window.innerHeight - headerTop.scrollHeight;
  header.style.setProperty('--window-height', `${height}px`);
};

const openMobileMenu = () => {
  menu.classList.add('is-open');
  burgerMenu.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  header.addEventListener('focusout', onMenuFocusOut);
  setTabIndex(headerLinks);
  updateHeight();

  scrollSize = getScrollWidth();
  document.body.style.paddingRight = `${scrollSize}px`;
};

const closeMobileMenu = () => {
  menu.classList.remove('is-open');
  burgerMenu.classList.remove('active');
  document.body.style.overflow = 'visible';
  document.body.style.paddingRight = 0;
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  header.removeEventListener('focusout', onMenuFocusOut);
  removeTabIndex(headerLinks);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMobileMenu();
  }
}

function onMenuFocusOut(evt) {
  if (evt.relatedTarget === null || !header.contains(evt.relatedTarget)) {
    closeMobileMenu();
  }
}

function onDocumentClick(evt) {
  if (!header.contains(evt.target)) {
    closeMobileMenu();
  }
}

const toggleBurgerMenu = () => {
  if (!burgerMenu) return;

  burgerMenu.addEventListener('click', () => {
    if (menu.classList.contains('is-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
};

if (!DESKTOP_WIDTH.matches && headerLinks && headerLinks.length) {
  removeTabIndex(headerLinks);
}

DESKTOP_WIDTH.addEventListener('change', () => {
  if (!headerLinks || !headerLinks.length) return;

  if (DESKTOP_WIDTH.matches) {
    setTabIndex(headerLinks);
  } else {
    removeTabIndex(headerLinks);
  }
});

export { toggleBurgerMenu };
