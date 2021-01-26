/* eslint-disable func-names */
/* eslint-disable wrap-iife */
import './index.css';

import NewsApi from './js/api/NewsApi';
import MainApi from './js/api/MainApi';
import Form from './js/components/Form';
import Header from './js/components/Header';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import Popup from './js/components/Popup';
import { NEWS_API_CONFIG } from './js/constants/NEWS_API_CONFIG';
import { MAIN_API_CONFIG } from './js/constants/MAIN_API_CONFIG';
import { USER } from './js/constants/USER';
import ProfilePage from './js/components/ProfilePage';
import {
  CARD_CONTAINER,
  PAGE,
  HEADER,
  NAVBAR,
  NAVBAR_SHOW_MENU_BTN,
  NAVBAR_BTN_AUTH,
  NAVBAR_BTN_LOGOUT,
  SEARCH_FORM,
  SEARCH_BAR,
  SEARCH_BTN,
  BTN_SHOW_MORE,
  PRELOADER,
  NOT_FOUND,
} from './js/constants/MARKUP_SELECTORS';

(function () {
  const newsApi = new NewsApi(NEWS_API_CONFIG);
  const mainApi = new MainApi(MAIN_API_CONFIG);
  const profilePage = new ProfilePage(USER);
  const newsCard = new NewsCard(mainApi, profilePage);
  const cardList = new NewsCardList(newsCard, mainApi, newsApi);
  const form = new Form(newsApi, cardList);

  // if (!USER) {
  //   header.render({ isLoggedin: false });
  // } else {
  //   header.render({ isLoggedin: true, userName: USER.name });
  // }

  form.setEventListeners();
  cardList.setEventListeners();
})();
