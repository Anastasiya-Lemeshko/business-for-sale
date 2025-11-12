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
        slidesPerView: SLIDES_COUNT[sectionName].mobile,
        spaceBetween: 10,
        loop: true,
        autoHeight: SLIDES_COUNT[sectionName].mobile === 1,

        // autoplay: {
        //   delay: autoplayDelay,
        //   stopOnLastSlide: false,
        //   reverseDirection: false,
        //   waitForTransition: true,
        // },

        breakpoints: {
          768: {
            slidesPerView: SLIDES_COUNT[sectionName].tablet,
            autoHeight: SLIDES_COUNT[sectionName].tablet === 1,
          },

          1366: {
            slidesPerView: SLIDES_COUNT[sectionName].desktop,
            autoHeight: SLIDES_COUNT[sectionName].desktop === 1,
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
      const isNeedMobile = !TABLET_WIDTH.matches && (getSlidesCount(section) > SLIDES_COUNT[sectionName].mobile);
      const isNeedTablet = TABLET_WIDTH.matches && !DESKTOP_WIDTH.matches && (getSlidesCount(section) > SLIDES_COUNT[sectionName].tablet);
      const isNeedDesktop = DESKTOP_WIDTH.matches && (getSlidesCount(section) > SLIDES_COUNT[sectionName].desktop);

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
