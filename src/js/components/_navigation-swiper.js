import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import {
  getSlidesCount,
  addSwiperClass,
  removeSwiperClass,
  setSlidesTabIndex,
  checkVisibleSlides,
  getSwiperClass,
  getBlockClass
} from '../_utils.js';
import {
  TABLET_WIDTH,
  DESKTOP_WIDTH,
  SLIDES_COUNT
} from "../_vars.js";

const sections = document.querySelectorAll('[data-swiper="navigation"]');

const setNavigationSwiper = () => {
  if (!sections || !sections.length) return;

  sections.forEach((section, index) => {
    const sectionClass = getSwiperClass(section);
    const sectionName = getBlockClass(section);
    const swiperButtons = section.querySelector(`.${sectionClass}swiper-button-container`);
    const slidesCount = SLIDES_COUNT[sectionName] || SLIDES_COUNT.default;
    let swiperContainer = null;
    let autoplayDelay = 7000 + index * 1000;

    const destroyNavigationSwiper = (swiper, el) => {
      if (swiperContainer) {
        swiperContainer.destroy();
        swiperContainer = null;
        removeSwiperClass(swiper, el);
        swiperButtons.classList.add('hidden');
      }
    };

    const initNavigationSwiper = () => {
      addSwiperClass(section, sectionClass);
      swiperButtons.classList.remove('hidden');

      swiperContainer = new Swiper(section, {
        modules: [Navigation, Autoplay],
        direction: 'horizontal',
        speed: 500,
        allowTouchMove: true,
        slidesPerView: slidesCount.mobile,
        spaceBetween: 10,
        loop: true,
        autoHeight: slidesCount.mobile === 1,

        // autoplay: {
        //   delay: autoplayDelay,
        //   stopOnLastSlide: false,
        //   reverseDirection: false,
        //   waitForTransition: true,
        // },

        breakpoints: {
          768: {
            slidesPerView: slidesCount.tablet,
            autoHeight: slidesCount.tablet === 1,
          },

          1366: {
            slidesPerView: slidesCount.desktop,
            autoHeight: slidesCount.desktop === 1,
          },
        },

        navigation: {
          nextEl: `.${sectionClass}swiper-button-container .button-swiper--next`,
          prevEl: `.${sectionClass}swiper-button-container .button-swiper--prev`,
        },

        on: {
          init: function () {
            const numberOfVisibleSlides = checkVisibleSlides(sectionName);
            setSlidesTabIndex(this, numberOfVisibleSlides);
          },
          slideChange: function () {
            const numberOfVisibleSlides = checkVisibleSlides(sectionName);
            setSlidesTabIndex(this, numberOfVisibleSlides);
          }
        },
      });
    };

    const checkNavigationSwiper = () => {
      const isNeedMobile = !TABLET_WIDTH.matches && (getSlidesCount(section) > slidesCount.mobile);
      const isNeedTablet = TABLET_WIDTH.matches && !DESKTOP_WIDTH.matches && (getSlidesCount(section) > slidesCount.tablet);
      const isNeedDesktop = DESKTOP_WIDTH.matches && (getSlidesCount(section) > slidesCount.desktop);

      if (!swiperContainer && (isNeedMobile || isNeedTablet || isNeedDesktop)) {
        initNavigationSwiper();
      } else if (swiperContainer && (!isNeedMobile && !isNeedTablet && !isNeedDesktop)) {
        destroyNavigationSwiper(section, sectionClass);
      } else if (swiperContainer && (isNeedMobile || isNeedTablet || isNeedDesktop)) {
        destroyNavigationSwiper(section, sectionClass);
        initNavigationSwiper();
      }
    };

    checkNavigationSwiper();
    TABLET_WIDTH.addEventListener('change', checkNavigationSwiper);
    DESKTOP_WIDTH.addEventListener('change', checkNavigationSwiper);
  });
};

export { setNavigationSwiper };
