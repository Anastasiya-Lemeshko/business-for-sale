const multiForm = document.querySelector('.multiform');
const steps = multiForm ? multiForm.querySelectorAll('.multiform-step') : null;
const prevButton = multiForm ? multiForm.querySelector('.multiform-prev') : null;
const nextButton = multiForm ? multiForm.querySelector('.multiform-next') : null;
const submitButton = multiForm ? multiForm.querySelector('.multiform-submit') : null;
const stepCount = multiForm ? multiForm.querySelector('.multiform-step-count') : null;

let currentStep = 0;

const showStep = (currentStep) => {
  steps.forEach((step, index) => step.classList.toggle('active', index === currentStep));

  stepCount.textContent = `${currentStep + 1}/${steps.length} step`;

  prevButton.classList.toggle('hidden', currentStep === 0);
  nextButton.classList.toggle('hidden', currentStep === steps.length - 1);
  submitButton.classList.toggle('hidden', currentStep !== steps.length - 1);
}

const setMultiform = () => {
  if (!multiForm) return;

  prevButton.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });
};

export { setMultiform };
