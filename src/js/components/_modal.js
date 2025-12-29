import {
  isEscapeKey,
  isTabKey,
  getScrollWidth
} from '../_utils.js';

let scrollSize = 0;

class ModalWindow {
  constructor(buttons) {
    this.html = document.querySelector('html');
    this.buttons = buttons || [];
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;
  }

  handleOpen() {
    if (this.buttons.length === 0) return;

    this.buttons.forEach(button => {

      button.addEventListener('click', () => {
        const modalName = button.getAttribute('data-modal-button');
        if (!modalName) return;

        this.modal = document.querySelector(`[data-modal="${modalName}"]`);
        if (!this.modal) return;

        this.modalWindow = this.modal.querySelector('.modal__container');
        this.closeBtn = this.modal.querySelector('.modal__close-button');

        const focusableElements = Array.from(this.modal.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'));
        this.firstFocusableElement = focusableElements[0];
        this.lastFocusableElement = focusableElements[focusableElements.length - 1];

        this.addEventListeners();
        this.openModal(this.modal);
      });
    });
  }

  addEventListeners() {
    if (!this.modal || !this.modalWindow || !this.closeBtn) return;

    // Закрытие по кнопке
    this.closeBtn.addEventListener('click', this.handleClose);

    // Закрытие по Escape
    this.escapeHandler = evt => {
      if (isEscapeKey(evt)) this.closeModal(this.modal);
    };

    window.addEventListener('keydown', this.escapeHandler);

    // Закрытие по клику вне модального окна
    this.modalWindow.addEventListener('click', evt => {
      evt.stopPropagation();
    });

    this.modal.addEventListener('click', this.handleOverlayClick);

    // Зацикливание фокуса
    this.modal.addEventListener('keydown', this.loopFocus);
  }

  removeEventListeners() {
    if (this.closeBtn) {
      this.closeBtn.removeEventListener('click', this.handleClose);
    }

    window.removeEventListener('keydown', this.escapeHandler);

    if (this.modal) {
      this.modal.removeEventListener('click', this.handleOverlayClick);
      this.modal.removeEventListener('keydown', this.loopFocus);
    }
  }

  handleClose = () => {
    this.closeModal(this.modal);
  };

  handleOverlayClick = evt => {
    if (evt.target === this.modal) {
      this.closeModal(this.modal);
    }
  };

  loopFocus = evt => {
    if (!isTabKey(evt)) {
      return;
    }

    if (isTabKey(evt) && evt.shiftKey && document.activeElement === this.firstFocusableElement) {
      evt.preventDefault();
      this.lastFocusableElement.focus();
    } else if (isTabKey(evt) && !evt.shiftKey && document.activeElement === this.lastFocusableElement) {
      evt.preventDefault();
      this.firstFocusableElement.focus();
    }
  }

  openModal(modal) {
    if (!modal) return;

    // нивелирует скачок из-за полосы прокрутки
    scrollSize = getScrollWidth();
    this.html.style.paddingRight = `${scrollSize}px`;

    this.html.classList.add('dis-scroll');
    modal.classList.add('open');
    this.closeBtn.focus();
  }

  openModalSuccess(modalSuccess) {
    if (!modalSuccess) return;

    this.closeAllModal();

    this.modal = modalSuccess;

    this.modalWindow = this.modal.querySelector('.modal__container');
    this.closeBtn = this.modal.querySelector('.modal__close-button');

    const focusableElements = Array.from(this.modal.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    this.firstFocusableElement = focusableElements[0];
    this.lastFocusableElement = focusableElements[focusableElements.length - 1];

    this.addEventListeners();
    this.openModal(this.modal);
  }

  closeModal(modal) {
    if (!modal) return;

    this.html.classList.remove('dis-scroll');
    modal.classList.remove('open');
    this.removeEventListeners();
    this.html.style.paddingRight = 0;
  }

  closeAllModal() {
    const allModal = document.querySelectorAll('.modal');

    if (!allModal) return;

    allModal.forEach(el => {
      if (el.classList.contains('open')) {
        el.classList.remove('open');
      }
      if (this.html.classList.contains('dis-scroll')) {
        this.html.classList.remove('dis-scroll');
      }
    });

    this.removeEventListeners();
    this.html.style.paddingRight = 0;
  }

  init() {
    this.handleOpen();
  }
}

const setModals = () => {
  const openButtons = document.querySelectorAll('[data-modal-button]');
  const modalWindow = new ModalWindow(openButtons);
  const modalSuccess = document.querySelector('[modal-success]');
  modalWindow.init();

  // Проверка наличия jQuery
  if (typeof jQuery === 'undefined' && typeof $ === 'undefined') {
    console.warn('jQuery is not loaded.');
    return;
  }

  $(document).on('af_complete', (evt, res) => {
    if (modalSuccess) if (res.success) modalWindow.openModalSuccess(modalSuccess);
  });
};

export { setModals };
