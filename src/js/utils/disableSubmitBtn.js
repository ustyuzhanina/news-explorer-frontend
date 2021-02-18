export default function disableSubmitBtn(form) {
  const button = form.querySelector('.popup__button');
  button.setAttribute('disabled', true);
}