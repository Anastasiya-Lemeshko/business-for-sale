import {
  isEscapeKey,
  isTabKey,
  getScrollWidth
} from './../_utils.js';

const modalButtons = document.querySelectorAll('[data-modal-button]');

const setModals = () => {
  if (!modalButtons.length) return;

  modalButtons.forEach((button) => {
    const modalName = button.dataset.modalButton;
    const modal = document.querySelector(`[data-modal="${modalName}"]`);

    if (!modal) return;

    const modalContainer = modal.querySelector('.modal__container');
    const modalCloseButton = modal.querySelector('.modal__close-button');

    const focusableElements = Array.from(modal.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    let scrollSize = 0;

    const openModal = () => {
      modal.classList.remove('modal--close');
      modalCloseButton.addEventListener('click', onModalCloseButtonClick);
      document.addEventListener('click', onDocumentClick);
      document.addEventListener('keydown', onDocumentKeydown);
      document.body.style.overflow = 'hidden';
      modalCloseButton.focus();
      modal.addEventListener('keydown', loopFocus);

      scrollSize = getScrollWidth();
      document.body.style.paddingRight = `${scrollSize}px`;

    };

    const closeModal = () => {
      modal.classList.add('modal--close');
      document.body.style.overflow = 'visible';
      document.body.style.paddingRight = 0;
      modalCloseButton.removeEventListener('click', onModalCloseButtonClick);
      modal.removeEventListener('keydown', loopFocus);
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeydown);
      button.focus();
    };

    const toggleModal = () => {
      if (button) {
        button.addEventListener('click', (evt) => {
          evt.preventDefault();
          openModal();
        });
      }
    };

    function onDocumentKeydown(evt) {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        closeModal();
      }
    }

    function onModalCloseButtonClick() {
      closeModal();
    }

    function onDocumentClick(evt) {
      if ((document.activeElement !== button) && (document.activeElement !== modalCloseButton) && !modalContainer.contains(evt.target)) {
        closeModal();
      }
    }

    function loopFocus(evt) {
      if (!isTabKey(evt)) {
        return;
      }

      if (isTabKey(evt) && evt.shiftKey && document.activeElement === firstFocusableElement) {
        evt.preventDefault();
        lastFocusableElement.focus();
      } else if (isTabKey(evt) && !evt.shiftKey && document.activeElement === lastFocusableElement) {
        evt.preventDefault();
        firstFocusableElement.focus();
      }
    }

    toggleModal();
  });
};

export { setModals };
