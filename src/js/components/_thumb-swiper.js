import Swiper from 'swiper';
import { Thumbs, EffectFade } from 'swiper/modules';
import { getSwiperClass } from '../_utils.js';

const sections = document.querySelectorAll('[data-swiper="thumb"]');

const setThumbSwiper = () => {
  if (!sections || !sections.length) return;

  sections.forEach((section) => {
    const mainSwiper = section.querySelector('.main-swiper');
    const thumbSwiper = section.querySelector('.thumb-swiper');
    let mainSwiperContainer = null;

    const thumbSwiperContainer = new Swiper(thumbSwiper, {
      slidesPerView: 4,
      spaceBetween: 10,
      watchSlidesProgress: true,
      centeredSlidesBounds: true,

      breakpoints: {
        1366: {
          spaceBetween: 18,
        },
      },
    });

    const initMainSwiper = () => {
      if (!mainSwiper) return;

      mainSwiperContainer = new Swiper(mainSwiper, {
        modules: [Thumbs, EffectFade],
        direction: 'horizontal',
        speed: 500,
        allowTouchMove: true,
        slidesPerView: 1,
        spaceBetween: 10,

        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },

        thumbs: {
          swiper: thumbSwiperContainer,
          slideThumbActiveClass: 'project__thumb-slide--active'
        },
      });
    };

    initMainSwiper();
  });
};

export { setThumbSwiper };
