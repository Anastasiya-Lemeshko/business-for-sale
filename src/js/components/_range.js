const forms = document.querySelectorAll('form');

const setRanges = () => {
  if (!forms || !forms.length) return;

  forms.forEach((form) => {
    const ranges = form.querySelectorAll('.range');

    if (!ranges || !ranges.length) return;

    const resetButtons = form.querySelectorAll('button[type="reset"]');
    const showButton = form.querySelector('.filters__show');

    // функция для сброса формы (удаление пописей ползунков и скрытие кнопки show)

    const resetAllSliders = () => {
      const rangeHandles = form.querySelectorAll('.ui-slider-handle');

      rangeHandles.forEach((handle) => {
        handle.style.setProperty('--label-display', 'none');
      });

      if (showButton) {
        showButton.classList.remove('filters__show--animated');
        showButton.classList.add('filters__show--hidden');
      }
    };

    // обработка кнопки сброса

    if (resetButtons && resetButtons.length) {
      resetButtons.forEach((button) => {
        button.addEventListener('click', resetAllSliders);
      });
    }

    // функция позиционирования подписи относительно ползунка

    const labelPosition = (handle, handlePosition) => {
      handlePosition = parseFloat(handlePosition);

      if (handlePosition > 93) {
        handle.style.setProperty('--label-position', 'translateX(-85%)');
      } else if (handlePosition < 7) {
        handle.style.setProperty('--label-position', 'translateX(-15%)');
      } else {
        handle.style.setProperty('--label-position', 'translateX(-50%)');
      }
    };

    // функция показа подписи

    const showRangeLabel = (handle) => {
      handle.style.setProperty('--label-display', 'block');
    };

    // наблюдение за изменением позиции ползунка

    ranges.forEach((range) => {
      const handlers = range.querySelectorAll('.ui-slider-handle');

      if (!handlers || !handlers.length) return;

      handlers.forEach((handle) => {

        // добавление подписи в ползунок
        const label = document.createElement('span');
        label.classList.add('range-label');
        handle.appendChild(label);

        const observer = new MutationObserver((mutations) => {
          const isResetButtonFocused = document.activeElement && document.activeElement.matches('button[type="reset"]');
          if (isResetButtonFocused) return;

          // если была нажата кнопка сброса формы, дальнейший код не выполнится

          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
              const leftPosition = handle.style.left;
              labelPosition(handle, leftPosition);
              showRangeLabel(handle);
              range.dispatchEvent(new CustomEvent('sliderChanged')); // генерация события для перемещения кнопки found objects
            }
          });
        });

        observer.observe(handle, {
          attributes: true,
          attributeFilter: ['style']
        });
      });
    });
  });
};

export { setRanges };
