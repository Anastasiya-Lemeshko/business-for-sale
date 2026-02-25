import { isArrowDownKey, isArrowUpKey, isEnterKey, isEscapeKey, removeTabIndex, setTabIndex } from '../_utils.js';

const selects = document.querySelectorAll('.select');

const renderCustomSelect = () => {
  if (!selects.length) return;

  selects.forEach(select => {
    const selectButton = select.querySelector('.select__button');
    const originalSelect = select.querySelector('.select__original');
    const customSelect = document.createElement('div');

    const createCustomSelect = () => {
      customSelect.classList.add('select__list');

      const currentValue = originalSelect.value;

      Array.from(originalSelect.options).forEach(option => {
        const optionItem = document.createElement('button');
        optionItem.classList.add('select__item');
        optionItem.type = 'button';
        optionItem.setAttribute('tabindex', '-1');
        optionItem.textContent = option.textContent;
        optionItem.dataset.value = option.value;

        // если значение уже пришло из URL → подсветка и текст кнопки
        if (option.value === currentValue) {
          optionItem.classList.add('select__item--active');
          selectButton.textContent = option.textContent;
        }

        customSelect.appendChild(optionItem);
      });

      // если value пустой — берём selected option
      if (!currentValue) {
        const selectedOption = originalSelect.options[originalSelect.selectedIndex];
        if (selectedOption) {
          selectButton.textContent = selectedOption.textContent;
        }
      }

      select.appendChild(customSelect);

      originalSelect.classList.add('visually-hidden');
      originalSelect.setAttribute('tabindex', '-1');
      customSelect.setAttribute('tabindex', '-1');
    };

    const checkTabIndex = () => {
      const options = customSelect.querySelectorAll('.select__item');

      if (select.classList.contains('select--open')) {
        setTabIndex(options);
        customSelect.addEventListener('focusout', onSelectFocusOut);
      } else {
        removeTabIndex(options);
        customSelect.removeEventListener('focusout', onSelectFocusOut);
      }
    };

    const openSelect = () => {
      select.classList.add('select--open');
      checkTabIndex();
      customSelect.addEventListener('click', onSelectOptionClick);
      document.addEventListener('keydown', onSelectKeydown);
      document.addEventListener('click', onDocumentClick);
    };

    const closeSelect = () => {
      select.classList.remove('select--open');
      checkTabIndex();
      selectButton.focus();
      customSelect.removeEventListener('click', onSelectOptionClick);
      document.removeEventListener('keydown', onSelectKeydown);
      document.removeEventListener('click', onDocumentClick);
    };

    const chooseOption = option => {
      const selectedValue = option.dataset.value;
      const selectedText = option.textContent;

      // кнопка
      selectButton.textContent = selectedText;

      // оригинальный select
      originalSelect.value = selectedValue;

      // active state
      customSelect.querySelectorAll('.select__item').forEach(item => item.classList.remove('select__item--active'));

      option.classList.add('select__item--active');

      // msFilter2
      if (window.jQuery) {
        window.jQuery(originalSelect).trigger('change');
      } else {
        originalSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }

      closeSelect();
    };

    const toggleSelect = () => {
      selectButton.addEventListener('click', () => {
        select.classList.contains('select--open') ? closeSelect() : openSelect();
      });
    };

    function onSelectKeydown(evt) {
      const open = select.classList.contains('select--open');
      const options = Array.from(customSelect.querySelectorAll('.select__item'));
      const currentIndex = options.indexOf(document.activeElement);

      if (!open) return;

      if (isArrowDownKey(evt)) {
        evt.preventDefault();
        options[(currentIndex + 1) % options.length].focus();
      }

      if (isArrowUpKey(evt)) {
        evt.preventDefault();
        options[(currentIndex - 1 + options.length) % options.length].focus();
      }

      if (isEnterKey(evt)) {
        evt.preventDefault();
        if (currentIndex >= 0) {
          chooseOption(options[currentIndex]);
        }
      }

      if (isEscapeKey(evt)) {
        closeSelect();
      }
    }

    function onSelectOptionClick(evt) {
      if (evt.target.classList.contains('select__item')) {
        chooseOption(evt.target);
      }
    }

    function onDocumentClick(evt) {
      if (!select.contains(evt.target)) {
        closeSelect();
      }
    }

    function onSelectFocusOut(evt) {
      if (!evt.relatedTarget || !select.contains(evt.relatedTarget)) {
        closeSelect();
      }
    }

    createCustomSelect();
    toggleSelect();
  });
};

export { renderCustomSelect };
