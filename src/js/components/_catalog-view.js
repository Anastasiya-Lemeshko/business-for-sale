const catalog = document.querySelector('.catalog');
const catalogView = catalog ? catalog.querySelector('.catalog__view') : null;
const catalogList = catalog ? catalog.querySelector('.catalog__list') : null;

const setViewToggles = () => {
  if (!catalogView || !catalogList) return;

  catalogView.addEventListener('click', (evt) => {
    const button = evt.target.closest('button');

    catalogView.querySelector('.catalog__view-toggle--active').classList.remove('catalog__view-toggle--active');
    button.classList.add('catalog__view-toggle--active');

    catalogList.classList.remove('catalog__list--animated');
    catalogList.classList.add('catalog__list--hidden');

    setTimeout(() => {
      if (button.classList.contains('catalog__view-toggle--list')) {
        catalogList.classList.add('catalog__list--list');
        catalogList.classList.remove('catalog__list--grid');
      } else {
        catalogList.classList.remove('catalog__list--list');
        catalogList.classList.add('catalog__list--grid');
      }

      catalogList.classList.add('catalog__list--animated');
      catalogList.classList.remove('catalog__list--hidden');
    }, 50);
  });
};

export { setViewToggles };
