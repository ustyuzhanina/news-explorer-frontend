/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import {
  SEARCH_RESULTS,
  SEARCH_ERROR,
  BTN_SHOW_MORE,
  PRELOADER,
  NOT_FOUND,
  CARDS_RENDER_QTY,
  CARD_CONTAINER,
} from '../constants/MARKUP_SELECTORS';

export default class NewsCardList {
  constructor(newsCard, mainApi, newsApi) {
    this.cardCreator = newsCard;
    this.mainApi = mainApi;
    this.newsApi = newsApi;
    this.renderResults = this.renderResults.bind(this);
    this.renderLoader = this.renderLoader.bind(this);
    this.renderError = this.renderError.bind(this);
    this.showMore = this.showMore.bind(this);
    this.addCard = this.addCard.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.cardRenderCounter = 0;
    this.waitingArticles = null;
    this.keyword = null;
  }

  addCard(newCard) {
    CARD_CONTAINER.appendChild(newCard);
  }

  renderResults(articles) {
    this.keyword = this.newsApi.keyword;

    if (articles.length === 0) {
      SEARCH_RESULTS.classList.remove('search-results_visible');
      SEARCH_ERROR.classList.remove('search-error_visible');
      NOT_FOUND.classList.add('not-found_visible');
    } else {
      SEARCH_ERROR.classList.remove('search-error_visible');
      NOT_FOUND.classList.remove('not-found_visible');
      SEARCH_RESULTS.classList.add('search-results_visible');

      if (articles.length > CARDS_RENDER_QTY) {
        BTN_SHOW_MORE.classList.add('button_show-more_visible');
      }

      articles.slice([0], [3]).forEach((article) => {
        const newCard = this.cardCreator.create(article, this.newsApi.keyword);
        this.addCard(newCard);
        this.cardRenderCounter++;
      });
      this.waitingArticles = articles.slice([3], [articles.length + 1]);
    }
  }

  renderLoader(isLoading) {
    if (isLoading) {
      SEARCH_RESULTS.classList.remove('search-results_visible');
      PRELOADER.classList.add('preloader_visible');
    } else {
      PRELOADER.classList.remove('preloader_visible');
      SEARCH_RESULTS.classList.add('search-results_visible');
    }
  }

  renderError(err) {
    SEARCH_RESULTS.classList.remove('search-results_visible');
    NOT_FOUND.classList.remove('not-found_visible');
    SEARCH_ERROR.querySelector('.search-error__description').textContent = err;
    SEARCH_ERROR.classList.add('search-error_visible');
  }

  showMore() {
    this.renderResults(this.waitingArticles, this.keyword);
    if (this.cardRenderCounter > (this.newsApi.cache.length - 1)) {
      BTN_SHOW_MORE.classList.remove('button_show-more_visible');
    }
  }

  resetSearch() {
    SEARCH_RESULTS.classList.remove('search-results_visible');
    NOT_FOUND.classList.remove('not-found_visible');
    SEARCH_ERROR.classList.remove('search-error_visible');
    this.cardRenderCounter = 0;
    CARD_CONTAINER.textContent = '';
    this.waitingArticles = null;
    this.keyword = null;
  }

  renderAllCards(articles) {
    articles.forEach((article) => {
      const newCard = this.cardCreator.create(article);
      this.addCard(newCard);
    });
  }
}
