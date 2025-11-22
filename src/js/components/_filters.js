import { SMALL_DESKTOP_WIDTH } from './../_vars.js';

const catalog = document.querySelector('.catalog');
const controls = catalog ? catalog.querySelector('.catalog__controls') : null;
const filterWrapper = catalog ? catalog.querySelector('.catalog__filters') : null;
const results = catalog ? catalog.querySelector('.catalog__results') : null;
const filterButton = catalog ? catalog.querySelector('.catalog__filter-button') : null;
const filterItems = filterWrapper ? filterWrapper.querySelectorAll('.filters__item') : null;
const showButton = filterWrapper ? filterWrapper.querySelector('.filters__show') : null;

let isResultsMoved = false;

const openFilters = () => {
  filterWrapper.classList.add('catalog__filters--opened');
  document.addEventListener('click', onDocumentClick);
};

const closeFilters = () => {
  if (!SMALL_DESKTOP_WIDTH.matches) {
    filterWrapper.classList.remove('catalog__filters--opened');
  }

  document.removeEventListener('click', onDocumentClick);
};

const moveFilters = () => {
  if (!controls || !filterWrapper) return;

  if (!SMALL_DESKTOP_WIDTH.matches) {
    filterWrapper.classList.remove('catalog__filters--opened');
  } else {
    filterWrapper.classList.add('catalog__filters--opened');
  }

  if (SMALL_DESKTOP_WIDTH.matches && !isResultsMoved) {
    controls.appendChild(results);
  }

  if (!SMALL_DESKTOP_WIDTH.matches && isResultsMoved) {
    filterWrapper.prepend(results);
  }

  if (filterButton) {
    filterButton.addEventListener('click', () => {
      if (filterWrapper.classList.contains('catalog__filters--opened')) {
        closeFilters();
      } else {
        openFilters();
      }
    });
  }
};

const addShowButton = (item, button) => {
  if (!item.contains(button)) {
    button.classList.add('filters__show--hidden');
    button.classList.remove('filters__show--animated');
    item.appendChild(button);

    setTimeout(() => {
      button.classList.add('filters__show--animated');
      button.classList.remove('filters__show--hidden');
    }, 50);
  }
};

const moveShowButton = () => {
  if (!filterItems || !filterItems.length || !showButton) return;

  showButton.classList.remove('filters__show--animated');
  showButton.classList.add('filters__show--hidden');

  filterItems.forEach((item) => {
    item.addEventListener('change', (evt) => {
      if (evt.target.matches('input, select, textarea')) {
        addShowButton(item, showButton);
      }
    });

    const rangeSlider = item.querySelector('.noUi-target');
    if (rangeSlider && rangeSlider.noUiSlider) {
      rangeSlider.noUiSlider.on('slide', () => {
        addShowButton(item, showButton);
      });
    }
  });
};

function onDocumentClick(evt) {
  if (!filterWrapper.contains(evt.target) && evt.target !== filterButton) {
    closeFilters();
  }
}

SMALL_DESKTOP_WIDTH.addEventListener('change', moveFilters);

export { moveFilters, moveShowButton };
