import {
  PAGE,
  HEADER,
  NAVBAR_SHOW_MENU_BTN,
  NAVBAR_BTN_LOGOUT,
  NAVBAR_USERNAME,
  NAVBAR,
} from '../constants/MARKUP_SELECTORS';
import { USER } from '../constants/USER';
import { MAIN_API_CONFIG } from '../constants/MAIN_API_CONFIG';

export default class Header {
  constructor({ headerColor }, newsCardClass) {
    this.headerColor = headerColor;
    this.page = PAGE;
    this.cardClass = newsCardClass;
  }

  render(userName) {
    HEADER.style.backgroundColor = this.headerColor;

    if (!userName) {
      PAGE.classList.remove('page_logged-in');
    } else {
      NAVBAR_USERNAME.textContent = userName;
      PAGE.classList.add('page_logged-in');

      NAVBAR_BTN_LOGOUT.addEventListener('click', () => {
        this.logout();
        window.location.href = '../';
      });
    }

    NAVBAR_SHOW_MENU_BTN.addEventListener('click', () => {
      NAVBAR.classList.toggle('navbar_opened');
    });
  }

  logout() {
    // перенести слушатель события в index и создать новый route в api на удаление куки
    USER.name = null;
    USER.email = null;
    this.render(USER.name);
    NAVBAR_USERNAME.textContent = '';
    // this.cardClass.switchIcons();
  }
}
