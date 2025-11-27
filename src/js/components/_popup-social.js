import { TABLET_WIDTH } from "../_vars.js";
import { isEscapeKey } from './../_utils.js';

const socialLinks = document.querySelectorAll('[class*="socials-link"]');
let itemWithpopup = null;
let popup = null;
let closeButton = null;
let isSocialPopup = false;

// функция закрытия попапа

const closePopup = () => {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  popup.removeEventListener('focusout', onPopupFocusOut);

  if (closeButton) {
    closeButton.removeEventListener('click', closePopup);
  }
};

// функция открытия попапа

const openPopup = (evt) => {
  evt.preventDefault();

  const isOpenPopup = popup ? !popup.classList.contains('hidden') : false;

  if (isOpenPopup) {
    closePopup();
  }

  itemWithpopup = evt.target.closest('[data-popup]');
  const popupName = itemWithpopup ? itemWithpopup.dataset.popup : null;
  popup = document.querySelector(`[data-popup-content="${popupName}"]`);
  closeButton = popup ? popup.querySelector('[class*="__close"]') : null;

  if (itemWithpopup && popup) {
    itemWithpopup.appendChild(popup);
    popup.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
    popup.addEventListener('focusout', onPopupFocusOut);

    if (closeButton) {
      closeButton.addEventListener('click', closePopup);
    }
  }
};

// функции закрытия попапа по действию

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}

function onPopupFocusOut(evt) {
  if (evt.relatedTarget === null || !itemWithpopup.contains(evt.relatedTarget)) {
    closePopup();
  }
}

function onDocumentClick(evt) {
  if (!itemWithpopup.contains(evt.target)) {
    closePopup();
  }
}

// вешает обработчик на элементы с попапами

const setSocialPopup = () => {
  if (!socialLinks || !socialLinks.length || !TABLET_WIDTH.matches) return;

  socialLinks.forEach((link) => {
    link.addEventListener('click', openPopup);
  });

  isSocialPopup = true;
};

// удаляет обработчики с элементов с попапами

const removeSocialPopup = () => {
  if (!socialLinks || !socialLinks.length) return;

  socialLinks.forEach((link) => {
    link.removeEventListener('click', openPopup);
  });

  isSocialPopup = false;
};

// проверяет, нужны ли обработчики для элементов с попапами

TABLET_WIDTH.addEventListener('change', () => {
  if (TABLET_WIDTH.matches && !isSocialPopup) {
    setSocialPopup();
  } else if (!TABLET_WIDTH.matches && isSocialPopup) {
    removeSocialPopup();
  }
});

export { setSocialPopup };
