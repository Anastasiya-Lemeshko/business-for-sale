import { toggleBurgerMenu } from './components/_open-mobile-menu.js';
import { moveHeader } from './components/_move-nav.js';
import { renderCustomSelect } from './components/_custom-select.js';
import { setRanges } from './components/_range.js';
import { setNavigationSwiper } from './components/_navigation-swiper.js';
import { setMultiform } from './components/_multistep-form.js';
import { setGridColumnLayout } from './components/_grid-layout-columns.js';
import { openVisibleFontCardContent, setAccordeonToggles } from './components/_accordion.js';

document.addEventListener('DOMContentLoaded', () => {
  toggleBurgerMenu();
  moveHeader();
  renderCustomSelect();
  setRanges();
  setNavigationSwiper();
  setMultiform();
  setGridColumnLayout();
  openVisibleFontCardContent();
  setAccordeonToggles();
});
