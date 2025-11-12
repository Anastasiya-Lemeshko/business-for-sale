import noUiSlider from 'nouislider';
import { RANGE_VALUES } from './../_vars.js';
import { setRangeCurrentElement } from './../_utils.js';

const forms = document.querySelectorAll('form');

const setRanges = () => {
  if (!forms || !forms.length) return;

  forms.forEach((form) => {
    const ranges = form.querySelectorAll('.range');

    if (!ranges || !ranges.length) return;

    const resetButton = form.querySelector('button[type="reset"]');

    const resetAllSliders = () => {
      ranges.forEach((range) => {
        const sliderElement = range.querySelector('.range__container');

        if (sliderElement.noUiSlider) {
          sliderElement.noUiSlider.reset();
        }
      });
    };

    if (resetButton) {
      resetButton.addEventListener('click', resetAllSliders);
    }

    ranges.forEach((range) => {
      const sliderElement = range.querySelector('.range__container');
      const valueElement = range.querySelector('.range__input--min');
      const currentElement = range.querySelector('.range__current');
      const currentValue = range.querySelector('.range__current-value');

      const filterType = range.dataset.range;
      let filterConfig = RANGE_VALUES[filterType];

      if (!filterConfig) {
        filterConfig = RANGE_VALUES['default'];
      }

      valueElement.setAttribute('value', filterConfig.start);

      const onSliderUpdate = () => {
        const value = sliderElement.noUiSlider.get();
        valueElement.value = value;
        currentValue.textContent = new Intl.NumberFormat('ru-RU').format(valueElement.value);
        setRangeCurrentElement(range, currentElement);
      };

      const createRange = (min, max, step, start) => {
        noUiSlider.create(sliderElement, {
          range: { min, max },
          start: [start],
          step,
          connect: [true, false],
          format: {
            to: (value) => Number(Math.round(value)),
            from: (value) => Number(Math.round(value)),
          },
        });

        sliderElement.noUiSlider.on('update', onSliderUpdate);

        sliderElement.noUiSlider.on('slide', () => {
          currentElement.style.display = 'block';
        }, { once: true });
      };

      valueElement.addEventListener('change', () => {
        sliderElement.noUiSlider.set([valueElement.value]);
      });

      createRange(
        filterConfig.min,
        filterConfig.max,
        filterConfig.step,
        filterConfig.start
      );
    });
  });
};

export { setRanges };
