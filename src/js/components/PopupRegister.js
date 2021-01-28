import Popup from './Popup';
import {
  NAVBAR_BTN_AUTH,
} from '../constants/MARKUP_SELECTORS';

export default class PopupRegister extends Popup {
  constructor() {
    super();
    this.popupName = 'popup_register';
    this.popupContent = `
    <div class="popup__content">
      <button class="popup__close"></button>
      <h3 class="popup__title">Регистрация</h3>
      <form class="popup__form popup__form_register" name="register" novalidate>
        <fieldset class="popup__fieldset">
          <span class="popup__input-subtitle">Email</span>
          <input type="text" name="email" class="popup__input popup__input_email" placeholder="Введите почту" required pattern="([a-zA-Z\d]+(-[\w\d]+)?)+@([\w\d]+(-[\w\d]+)?\.)+\w{2,3}">
          <span class="error">Неправильный формат email</span>
        </fieldset>
        <fieldset class="popup__fieldset">
          <span class="popup__input-subtitle">Пароль</span>
          <input type="password" name="password" class="popup__input popup__input_password" placeholder="Введите пароль" required minlength="8" maxlength="30">
          <span class="error">Введите пароль длиной от 8 символов</span>
        </fieldset>
        <fieldset class="popup__fieldset">
          <span class="popup__input-subtitle">Имя</span>
          <input type="text" name="name" class="popup__input popup__input_name" placeholder="Введите своё имя" required pattern="^([А-ЯЁ][а-яё]*(-[А-ЯЁ][а-яё]*)?)$" minlength="2" maxlength="20">
          <span class="error">Введите имя</span>
        </fieldset>
        <div class="popup__bottom">
          <span class="error error_general">Такой пользователь уже есть</span>
          <button type="submit" class="popup__button button button_popup_register button__color_blue">Зарегистрироваться</button>
          <p class="popup__text-below">или <span class="popup__input-link">Войти</span></p>
        </div>
      </form>
    </div>
    `.trim();
    this.handleOpen = this.handleOpen.bind(this);
    // this.goToRegister = this.goToRegister.bind(this);
    // this.goToSuccess = this.goToSuccess.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  handleOpen() {
    this.popupCloser = this.popupElement.querySelector('.popup__close');
    this.popupBackground = this.popupElement.querySelector('.popup::before');

    this.popupCloser.addEventListener('click', this.popupElement.close);
    this.popupBackground.addEventListener('click', this.popupElement.close);
    // this.popupElement.addEventListener('keyup', (event) => {
    //   if (event.keyCode === 27) {
    //     this.popupElement.close();
    //   }
    // });
  }

  // goToRegister() {

  // }

  // goToSuccess() {

  // }

  setEventListeners() {
    NAVBAR_BTN_AUTH.addEventListener('click', () => {
      this.setContent(this.popupName, this.popupContent);
      this.open();
      this.handleOpen();
    });
  }
}