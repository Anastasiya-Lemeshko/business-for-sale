const tabs = document.querySelectorAll('.tabs');

const setTabs = () => {
  if (!tabs || !tabs.length) return;

  tabs.forEach((tab) => {
    const tabLinks = tab.querySelectorAll('.tabs__tablink');
    const tabContents = tab.querySelectorAll('.tabs__tabcontent');

    const openTabs = (evt) => {
      const btnTarget = evt.currentTarget;
      const section = btnTarget.dataset.tab;

      tabLinks.forEach((link) => {
        link.classList.remove('tabs__tablink--active');
      });

      tabContents.forEach((item) => {
        item.classList.remove('tabs__tabcontent--active');
      });

      tab.querySelector(`[data-tab-content="${section}"]`).classList.add('tabs__tabcontent--active');
      btnTarget.classList.add('tabs__tablink--active');
    };

    tabLinks.forEach((tablink) => {
      tablink.addEventListener('click', openTabs);
    });
  });
};

export { setTabs };
