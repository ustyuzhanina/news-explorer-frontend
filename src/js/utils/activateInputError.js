export default function activateInputError(input) {
  input.parentElement.querySelector(`.error_${input.name}`).textContent = input.validationMessage;
  input.parentElement.classList.add('popup__fieldset_invalid');
}
