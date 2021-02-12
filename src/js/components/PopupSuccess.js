import Popup from './Popup';

export default class PopupSuccess extends Popup {
  constructor(popup) {
    super(popup);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.linkBtn = this.popup.querySelector('.popup__input-link');
  }

  open() {
    this.linkBtn = this.popup.querySelector('.popup__input-link');
    this.closeBtn = this.popup.querySelector('.popup__close');

    this.popup.classList.add('popup_is-opened');
    this.setEventListeners();
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }

  setEventListeners() {
    this.closeBtn.addEventListener('click', this.close, { once: true });
    document.addEventListener('keydown', (e) => this._handleKeyDown(e), { once: true });
    document.addEventListener('click', (e) => this._handleMouseDown(e), { once: true });
  }
}
