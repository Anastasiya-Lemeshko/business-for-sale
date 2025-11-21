import { SMALL_DESKTOP_WIDTH } from './../_vars.js';

const catalog = document.querySelector('.catalog');
const controls = catalog ? catalog.querySelector('.catalog__controls') : null;
const filterWrapper = catalog ? catalog.querySelector('.catalog__filters') : null;
const results = catalog ? catalog.querySelector('.catalog__results') : null;
const filterButton = catalog ? catalog.querySelector('.catalog__filter-button') : null;

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
};

if (filterButton) {
  filterButton.addEventListener('click', () => {
    if (filterWrapper.classList.contains('catalog__filters--opened')) {
      closeFilters();
    } else {
      openFilters();
    }
  });
}

function onDocumentClick(evt) {
  if (!filterWrapper.contains(evt.target) && evt.target !== filterButton) {
    closeFilters();
  }
}

SMALL_DESKTOP_WIDTH.addEventListener('change', moveFilters);

export { moveFilters };
