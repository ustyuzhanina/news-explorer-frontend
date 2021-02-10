/* eslint-disable wrap-iife */
/* eslint-disable no-console */
import './index.css';

import NewsApi from '../js/api/NewsApi';
import MainApi from '../js/api/MainApi';
import Header from '../js/components/Header';
import NewsCard from '../js/components/NewsCard';
import NewsCardList from '../js/components/NewsCardList';
import { NEWS_API_CONFIG } from '../js/constants/NEWS_API_CONFIG';
import { MAIN_API_CONFIG } from '../js/constants/MAIN_API_CONFIG';
// import { USER } from '../js/constants/USER';
import ProfilePage from '../js/components/ProfilePage';
import {
  NAVBAR_BTN_AUTH,
} from '../js/constants/MARKUP_SELECTORS';
import {
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  AUTH_ERROR,
  FORBIDDEN,
  MAIN_API_ERROR,
  MONGO_ERROR,
} from '../js/constants/ERRORS';

(function () {
  const newsApi = new NewsApi(NEWS_API_CONFIG);
  const mainApi = new MainApi(MAIN_API_CONFIG);
  const newsCard = new NewsCard(mainApi);
  const header = new Header({ headerColor: 'white' }, newsCard, mainApi);
  const cardList = new NewsCardList(newsCard, mainApi, newsApi);
  const profilePage = new ProfilePage();

  const savedArticles = [];

  mainApi.getUserData()
    .then((userObj) => {
      profilePage.user = userObj.name;
    })
    .then(() => {
      header.render(profilePage.user);
      // получаем все сохраненные статьи пользователя из mainApi
      mainApi.getArticles()
        .then((res) => {
          savedArticles.push.apply(savedArticles, res);
        })
        .catch((err) => console.log(`Ошибка ${err}: у Вас еще нет сохраненных статей`))
        .finally(() => {
          console.log(savedArticles);
          // отрисовываем интро для ЛК по массиву сохраненных статей
          profilePage.renderMarkup(savedArticles);
          cardList.renderAllCards(savedArticles);
        });
    })
    .catch((err) => {
      window.location.href = '../';
    });






  // общие слушатели событий
  // cardList.setEventListeners();
  // newsCard.setEventListeners();
})();
