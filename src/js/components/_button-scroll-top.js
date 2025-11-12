import { debounce } from './../_utils.js';

const scrollButton = document.querySelector('.button-scroll-top');

const onWindowScroll = () => {
  if (window.pageYOffset > 350) {
    scrollButton.classList.add('button-scroll-top--visible');
  } else {
    scrollButton.classList.remove('button-scroll-top--visible');
  }
};

const debouncedOnScrollWindow = debounce(onWindowScroll, 30);

const onScrollButtonClick = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const addScrollButton = () => {
  if (!scrollButton) return;

  window.addEventListener('scroll', debouncedOnScrollWindow);
  scrollButton.addEventListener('click', onScrollButtonClick);
};

export { addScrollButton };
