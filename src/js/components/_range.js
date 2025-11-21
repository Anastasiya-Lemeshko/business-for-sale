import noUiSlider from 'nouislider';
import { RANGE_VALUES } from './../_vars.js';
import { setRangeCurrentElement } from './../_utils.js';

const forms = document.querySelectorAll('form');

const setRanges = () => {
  if (!forms || !forms.length) return;

  forms.forEach((form) => {
    const ranges = form.querySelectorAll('.range');
    const singleRanges = form.querySelectorAll('.range--single');

    if (!ranges || !ranges.length) return;

    const resetButtons = form.querySelectorAll('button[type="reset"]');

    const resetAllSliders = () => {
      ranges.forEach((range) => {
        const sliderElement = range.querySelector('.range__container');
        const rangeLabels = form.querySelectorAll('.range__current');

        if (sliderElement.noUiSlider) {
          sliderElement.noUiSlider.reset();
          rangeLabels.forEach(label => label.style.display = 'none');
        }
      });
    };

    if (resetButtons && resetButtons.length) {
      resetButtons.forEach((button) => {
        button.addEventListener('click', resetAllSliders);
      });
    }

    singleRanges.forEach((range) => {
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

    ranges.forEach((range) => {
      if (range.classList.contains('range--single')) return;

      const sliderElement = range.querySelector('.range__container');
      const valueElement = range.querySelectorAll('.range__input');
      const valueMinElement = range.querySelector('.range__input--min');
      const valueMaxElement = range.querySelector('.range__input--max');

      const currentElements = range.querySelectorAll('.range__current');
      const currentValueMin = range.querySelector('.range__current-value--min');
      const currentValueMax = range.querySelector('.range__current-value--max');

      const filterType = range.dataset.range;
      let filterConfig = RANGE_VALUES[filterType];

      if (!filterConfig) {
        filterConfig = RANGE_VALUES['default'];
      }

      valueMinElement.setAttribute('value', filterConfig.start);
      valueMaxElement.setAttribute('value', filterConfig.end);

      const onSliderUpdate = () => {
        const valueArray = sliderElement.noUiSlider.get();
        valueMinElement.value = valueArray[0];
        valueMaxElement.value = valueArray[1];

        currentValueMin.textContent = new Intl.NumberFormat('ru-RU').format(valueMinElement.value);
        currentValueMax.textContent = new Intl.NumberFormat('ru-RU').format(valueMaxElement.value);
        setRangeCurrentElement(range, currentElements);
      };

      const createRange = (min, max, step, start, end) => {
        noUiSlider.create(sliderElement, {
          range: { min, max },
          start: [start, end],
          step,
          connect: [false, true, false],
          format: {
            to: (value) => Number(Math.round(value)),
            from: (value) => Number(Math.round(value)),
          },
        });

        sliderElement.noUiSlider.on('update', onSliderUpdate);

        sliderElement.noUiSlider.on('slide', () => {
          currentElements.forEach(element => element.style.display = 'block');
        }, { once: true });
      };

      valueElement.forEach((element) => {
        element.addEventListener('change', () => {
          sliderElement.noUiSlider.set([valueMinElement.value, valueMaxElement.value]);
        });
      });

      createRange(
        filterConfig.min,
        filterConfig.max,
        filterConfig.step,
        filterConfig.start,
        filterConfig.end
      );
    });
  });
};

export { setRanges };
