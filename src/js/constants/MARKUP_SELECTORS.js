const SEARCH_RESULTS = document.querySelector('.search-results');
const SEARCH_ERROR = document.querySelector('.search-error');
const CARD_CONTAINER = document.querySelector('.cards-list');
const PAGE = document.querySelector('.page');
const HEADER = document.querySelector('.header');
const NAVBAR = document.querySelector('.navbar');
const NAVBAR_SHOW_MENU_BTN = document.querySelector('.navbar__show-menu-btn');
const NAVBAR_BTN_AUTH = document.querySelector('.navbar__btn_auth');
const NAVBAR_BTN_LOGOUT = document.querySelector('.navbar__btn_logout');
const NAVBAR_USERNAME = document.querySelector('.navbar__username');
const SEARCH_FORM = document.querySelector('.search__box');
const SEARCH_BAR = document.querySelector('.search__bar');
const SEARCH_BTN = document.querySelector('.search__button');
const BTN_SHOW_MORE = document.querySelector('.button_show-more');
const PRELOADER = document.querySelector('.preloader');
const NOT_FOUND = document.querySelector('.not-found');
const INTRO = document.querySelector('.intro');

// popup selectors
const POPUP_ENTER = document.querySelector('.popup_enter');
const POPUP_REGISTER = document.querySelector('.popup_register');
const POPUP_SUCCESS = document.querySelector('.popup_success-reg');

const CARDS_RENDER_QTY = 3;

export {
  SEARCH_RESULTS,
  SEARCH_ERROR,
  CARD_CONTAINER,
  PAGE,
  HEADER,
  NAVBAR,
  NAVBAR_SHOW_MENU_BTN,
  NAVBAR_BTN_AUTH,
  NAVBAR_BTN_LOGOUT,
  NAVBAR_USERNAME,
  SEARCH_FORM,
  SEARCH_BAR,
  SEARCH_BTN,
  BTN_SHOW_MORE,
  PRELOADER,
  NOT_FOUND,
  CARDS_RENDER_QTY,
  INTRO,
  POPUP_ENTER,
  POPUP_REGISTER,
  POPUP_SUCCESS,
};
