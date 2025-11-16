const cardLists = document.querySelectorAll('[data-cards-clickable]');

const getLinkUrl = (card) => {
  const title = card.querySelector('[class*="title"]');
  let link = null;
  let url = null;

  if (title) {
    if (title.tagName === 'A') {
      link = title;
    }
    else {
      link = title.querySelector('a');
    }
  }

  return url = link ? link.href : '#';
};

const makeCardClickable = () => {
  if (!cardLists || !cardLists.length) return;

  cardLists.forEach((list) => {
    const cards = Array.from(list.children);

    cards.forEach((card) => {
      const otherLinks = card.querySelectorAll(`a:not([class*="title"]), button:not([class*="title"])`);
      const linkUrl = getLinkUrl(card);

      card.addEventListener('click', (evt) => {
        if (!Array.from(otherLinks).includes(evt.target)) {
          window.location.href = linkUrl;
        }
      });
    });
  });
};

export { makeCardClickable };
