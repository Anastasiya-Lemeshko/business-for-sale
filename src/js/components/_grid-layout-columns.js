import { COUNT_GRID_COLUMNS } from './../_vars.js';
import { DESKTOP_WIDTH, TABLET_WIDTH } from './../_vars.js';

const gridArray = document.querySelectorAll('[data-layout="grid-column"]');

const setGridColumnLayout = () => {
  if (!gridArray || !gridArray.length) return;

  const getContainerType = (grid) => {
    return grid.dataset.gridType || 'default';
  };

  const getColumnCount = (containerType) => {
    if (COUNT_GRID_COLUMNS[containerType]) {
      if (typeof COUNT_GRID_COLUMNS[containerType] === 'object') {
        if (DESKTOP_WIDTH.matches) {
          return COUNT_GRID_COLUMNS[containerType].desktop;
        } else if (TABLET_WIDTH.matches) {
          return COUNT_GRID_COLUMNS[containerType].tablet;
        } else {
          return COUNT_GRID_COLUMNS[containerType].mobile;
        }
      }
      return COUNT_GRID_COLUMNS[containerType];
    }
    return COUNT_GRID_COLUMNS.default;
  };

  gridArray.forEach((grid) => {
    const childElements = grid.children;
    const containerType = getContainerType(grid);
    const columnCount = getColumnCount(containerType);

    if (columnCount <= 1) return;

    const elementsPerColumn = Math.ceil(childElements.length / columnCount);

    for (let i = 0; i < childElements.length; i++) {
      const columnIndex = Math.floor(i / elementsPerColumn) + 1;
      childElements[i].style.gridColumn = `${columnIndex} / ${columnIndex + 1}`;
    }
  });

  TABLET_WIDTH.addEventListener('change', setGridColumnLayout);
  DESKTOP_WIDTH.addEventListener('change', setGridColumnLayout);
};

export { setGridColumnLayout };
