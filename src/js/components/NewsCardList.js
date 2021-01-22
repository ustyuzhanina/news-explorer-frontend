/* eslint-disable class-methods-use-this */
import BaseComponent from './BaseComponent';
import {
  SEARCH_RESULTS,
  SEARCH_ERROR,
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
  CARDS_RENDER_QTY,
} from '../constants/MARKUP_SELECTORS';

export default class NewsCardList extends BaseComponent {
  constructor(container, newsApi) { // принимает массив карточек, которые должны быть в списке при первой отрисовке.
    super();
    this.container = container;
    this.renderResults = this.renderResults.bind(this);
    this.renderLoader = this.renderLoader.bind(this);
    this.renderError = this.renderError.bind(this);
    this.showMore = this.showMore.bind(this); // отвечает за функциональность кнопки «Показать ещё»
    this.addCard = this.addCard.bind(this); // принимает экземпляр карточки и добавляет её в список
    this.cardRenderCounter = 0;
    this.setEventListeners = this.setEventListeners.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.newsApi = newsApi;
  }

  addCard(newCard) {
    this.container.appendChild(newCard);
  }

  renderResults(cards) {
    if (cards.length === 0) {
      SEARCH_RESULTS.classList.remove('.search-results_visible');
      SEARCH_ERROR.classList.remove('.search-error_visible');
      NOT_FOUND.classList.add('.not-found_visible');
    } else {
      SEARCH_ERROR.classList.remove('.search-error_visible');
      NOT_FOUND.classList.remove('.not-found_visible');
      SEARCH_RESULTS.classList.add('.search-results_visible');

      if (cards.length > CARDS_RENDER_QTY) {
        BTN_SHOW_MORE.classList.add('.button_show-more_visible');
      }

      cards.slice([0], [2]).forEach((item) => {
        this.addCard(item);
        this.cardRenderCounter++;
      });
    }
  }

  renderLoader(isLoading) {
    if (isLoading) {
      SEARCH_RESULTS.classList.remove('.search-results_visible');
      PRELOADER.classList.add('.preloader_visible');
    } else {
      PRELOADER.classList.remove('.preloader_visible');
      SEARCH_RESULTS.classList.add('.search-results_visible');
    }
  }

  renderError() {
    SEARCH_RESULTS.classList.remove('.search-results_visible');
    NOT_FOUND.classList.remove('.not-found_visible');
    SEARCH_ERROR.classList.add('.search-error_visible');
  }

  showMore(cards) {
    const nextCardNumber = this.cardRenderCounter + 1;
    cards.slice([nextCardNumber], [nextCardNumber + 3])
      .forEach((item) => {
        this.addCard(item);
        this.cardRenderCounter++;
        if (this.cardRenderCounter === (cards.length - 1)) {
          BTN_SHOW_MORE.classList.remove('.button_show-more_visible');
        }
      });
  } // здесь не должно быть cards в параметрах, понять почему и как удалить

  resetSearch() {
    SEARCH_RESULTS.classList.remove('.search-results_visible');
    NOT_FOUND.classList.remove('.not-found_visible');
    SEARCH_ERROR.classList.remove('.search-error_visible');
    this.cardRenderCounter = 0;
  }

  setEventListeners() {
    this._setHandlers([
      {
        element: SEARCH_BTN,
        event: 'click',
        callback: () => {
          this.resetSearch();
          this.renderLoader(true);
          this.newsApi.getNews(this.renderResults, this.renderLoader, this.renderError);
        },
      },
      {
        element: BTN_SHOW_MORE,
        event: 'click',
        callback: () => {
          this.showMore();
      },
    ])
  }
}
