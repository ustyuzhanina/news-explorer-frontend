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
import ProfilePage from '../js/components/ProfilePage';
import {
  NAVBAR_SHOW_MENU_BTN,
  NAVBAR,
} from '../js/constants/MARKUP_SELECTORS';

(function () {
  const newsApi = new NewsApi(NEWS_API_CONFIG);
  const mainApi = new MainApi(MAIN_API_CONFIG);
  const profilePage = new ProfilePage();
  const newsCard = new NewsCard(mainApi, profilePage);
  const header = new Header({ headerColor: 'white' }, newsCard, mainApi);
  const cardList = new NewsCardList(newsCard, mainApi, newsApi);

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
          // отрисовываем контейнер с карточками по массиву сохраненных статей
          cardList.renderAllCards(savedArticles);
        });
    })
    .catch((err) => {
      window.location.href = '../';
    });






  // общие слушатели событий
  // newsCard.setEventListeners();

  NAVBAR_SHOW_MENU_BTN.addEventListener('click', () => {
    NAVBAR.classList.toggle('navbar_opened');
  });
})();
