export default (function () {
  const searchBtn = document.querySelector('.search__button');
  const preloader = document.querySelector('.preloader');
  const notFoundSection = document.querySelector('.not-found');

  const popupEnter = document.querySelector('.popup_enter');
  const popupEnterCloseButton = popupEnter.querySelector('.popup__close');
  const popupEnterButton = document.querySelector('.navbar__btn_auth');
  const buttonPopupEnter = popupEnter.querySelector('.button_popup_enter');
  const popupEnterGoToRegister = popupEnter.querySelector('span.popup__input-link');

  const popupRegister = document.querySelector('.popup_register');
  const popupRegisterCloseButton = popupRegister.querySelector('.popup__close');
  const popupRegisterGoToEnter = popupRegister.querySelector('span.popup__input-link');
  const buttonPopupRegister = popupRegister.querySelector('.button_popup_register');

  const popupSuccessReg = document.querySelector('.popup_success-reg');
  const popupSuccessRegCloseButton = popupSuccessReg.querySelector('.popup__close');
  const popupSuccessRegGoToEnter = popupSuccessReg.querySelector('span.popup__input-link');


  popupEnterButton.addEventListener('click', () => {
    popupEnter.classList.toggle('popup_is-opened');
  });

  function closePopup() {
    const openPopup = event.target.closest('.popup');
    openPopup.classList.toggle('popup_is-opened');
  }

  popupEnterCloseButton.addEventListener('click', closePopup);
  popupRegisterCloseButton.addEventListener('click', closePopup);
  popupSuccessRegCloseButton.addEventListener('click', closePopup);

  buttonPopupEnter.addEventListener('click', () => {
    event.preventDefault();
    alert('Вход выполнен!');
  });

  buttonPopupRegister.addEventListener('click', () => {
    event.preventDefault();
    function toggleSuccessPopup() {
      popupSuccessReg.classList.toggle('popup_is-opened');
    }
    popupRegister.classList.toggle('popup_is-opened');
    toggleSuccessPopup();
    setTimeout(toggleSuccessPopup, 3000);
  });

  popupEnterGoToRegister.addEventListener('click', () => {
    event.preventDefault();
    popupEnter.classList.toggle('popup_is-opened');
    popupRegister.classList.toggle('popup_is-opened');
  });

  popupRegisterGoToEnter.addEventListener('click', () => {
    event.preventDefault();
    popupRegister.classList.toggle('popup_is-opened');
    popupEnter.classList.toggle('popup_is-opened');
  });

  popupSuccessRegGoToEnter.addEventListener('click', () => {
    event.preventDefault();
    popupSuccessReg.classList.toggle('popup_is-opened');
    popupEnter.classList.toggle('popup_is-opened');
  });

  searchBtn.addEventListener('click', () => {
    function showNoResults() {
      function clearup() {
        notFoundSection.classList.toggle('not-found_visible');
      }

      preloader.classList.toggle('preloader_visible');
      notFoundSection.classList.toggle('not-found_visible');
      setTimeout(clearup, 3000);
    }

    preloader.classList.toggle('preloader_visible');
    setTimeout(showNoResults, 4000);
  });

  // конец IIFE
}());