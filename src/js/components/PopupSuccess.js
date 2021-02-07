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
    this.closeBtn.removeEventListener('click', this.close);
    document.removeEventListener('keydown', (e) => this._handleKeyDown(e));
    document.removeEventListener('click', (e) => this._handleMouseDown(e));
  }

  setEventListeners() {
    this.closeBtn.addEventListener('click', this.close);
    document.addEventListener('keydown', (e) => this._handleKeyDown(e));
    document.addEventListener('click', (e) => this._handleMouseDown(e));
  }
}
