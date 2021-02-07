import {
  PAGE,
  HEADER,
  NAVBAR_SHOW_MENU_BTN,
  NAVBAR_BTN_LOGOUT,
  NAVBAR_USERNAME,
  NAVBAR,
} from '../constants/MARKUP_SELECTORS';

export default class Header {
  constructor({ headerColor }, newsCardClass) {
    this.headerColor = headerColor;
    this.page = PAGE;
    this.cardClass = newsCardClass;
  }

  render({ isLoggedin, userName }) {
    HEADER.style.backgroundColor = this.headerColor;

    if (isLoggedin === false) {
      PAGE.classList.remove('page_logged-in');
    } else {
      NAVBAR_USERNAME.textContent = userName;
      PAGE.classList.add('page_logged-in');

      NAVBAR_BTN_LOGOUT.addEventListener('click', () => {
        window.location.href = '../';
        this.logout();
      });
    }

    NAVBAR_SHOW_MENU_BTN.addEventListener('click', () => {
      NAVBAR.classList.toggle('navbar_opened');
    });
  }

  logout() {
    PAGE.classList.remove('page_logged-in');
    this.render({ isLoggedin: false });
    localStorage.removeItem('user');
    NAVBAR_USERNAME.textContent = '';
    this.cardClass.switchIcons();
  }
}
