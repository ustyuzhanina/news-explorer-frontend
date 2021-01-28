import Popup from './Popup';
import {
  NAVBAR_BTN_AUTH,
} from '../constants/MARKUP_SELECTORS';

export default class PopupSuccess extends Popup {
  constructor() {
    super();
    this.popupName = 'popup_success-reg';
    this.popupContent = `
    <div class="popup__content">
      <button class="popup__close"></button>
      <h3 class="popup__title">Пользователь успешно зарегистрирован!</h3>
        <p class="popup__text-below"><span class="popup__input-link">Войти</span></p>
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