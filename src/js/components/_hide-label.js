const textInputs = document.querySelectorAll(`
    input[type="text"],
    input[type="tel"],
    input[type="email"],
    input[type="password"],
    input[type="url"],
    input[type="search"],
    textarea
`);

const hideLabel = () => {
  if (!textInputs || !textInputs.length) return;

  textInputs.forEach((input) => {
    const field = input.parentElement;
    const label = field.querySelector('span');

    if (label && label.classList.contains('visually-hidden')) return;

    if (input.value.trim() !== '') {
      field.style.setProperty('--transform', 'scaleY(0) translateY(-5px)');
      field.style.setProperty('--opacity', '0');
    }

    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        field.style.setProperty('--transform', 'scaleY(0) translateY(-5px)');
        field.style.setProperty('--opacity', '0');
      } else {
        field.style.setProperty('--transform', 'scaleY(1) translateY(0)');
        field.style.setProperty('--opacity', '1');
      }
    });
  });
};


export { hideLabel };
