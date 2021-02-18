export default function enableSubmitBtn(form) {
  const button = form.querySelector('.popup__button');
  button.removeAttribute('disabled');
}
