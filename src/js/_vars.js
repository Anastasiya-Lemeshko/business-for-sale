export default {
  windowEl: window,
  documentEl: document,
  htmlEl: document.documentElement,
  bodyEl: document.body,
}

export const TABLET_WIDTH = window.matchMedia('(min-width: 768px)');
export const DESKTOP_WIDTH = window.matchMedia('(min-width: 1366px)');

export const SLIDES_COUNT = {
  'default': {
    'mobile': 1,
    'tablet': 2,
    'desktop': 3
  },
  'team': {
    'mobile': 1,
    'tablet': 2,
    'desktop': 3
  },
  'featured': {
    'mobile': 1,
    'tablet': 3,
    'desktop': 6
  },
  'blog-preview': {
    'mobile': 1,
    'tablet': 2,
    'desktop': 3
  }
};

export const RANGE_VALUES = {
  'default': {
    'min': 0,
    'max': 100,
    'step': 1,
    'start': 0,
    'end': 100,
  },
  'min-price': {
    'min': 300000,
    'max': 450000,
    'step': 10000,
    'start': 300000,
  },
  'max-price': {
    'min': 450000,
    'max': 700000,
    'step': 10000,
    'start': 450000,
  },
};

export const COUNT_GRID_COLUMNS = {
  default: 2,
  multiform: {
    mobile: 1,
    tablet: 2,
    desktop: 3
  },
};
