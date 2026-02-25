import { Carousel } from '@fancyapps/ui';
import { Fancybox } from '@fancyapps/ui';
import { Lazyload } from '@fancyapps/ui/dist/carousel/carousel.lazyload.js';
// import { Arrows } from '@fancyapps/ui/dist/carousel/carousel.arrows.js';
import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.js';

const gallery = document.querySelector('.fancybox__gallery');

const setFancyboxGallery = () => {
  if (!gallery) return;
  console.log(Fancybox.version);

  Carousel(
    gallery,
    {
      Thumbs: {
        type: 'classic'
      },
    },
    {
      Lazyload,
      // Arrows,
      Thumbs,
    }
  ).init();

  Fancybox.bind("[data-fancybox]", {

  });
};

export { setFancyboxGallery };
