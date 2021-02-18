export default function resetError(input) {
  input.parentElement.querySelector(`.error_${input.name}`).textContent = '';
  input.parentElement.classList.remove('popup__fieldset_invalid');

  const serverError = input.form.querySelector('.error_general');
  serverError.textContent = '';
  serverError.classList.remove('error_general_visible');
}
