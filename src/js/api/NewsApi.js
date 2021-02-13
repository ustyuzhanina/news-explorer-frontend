/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import removeQuotes from '../utils/removeQuotes';
import { NEWS_API_ERROR } from '../constants/ERRORS';

export default class NewsApi {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.from = config.params.from;
    this.to = config.params.to;
    this.language = config.params.language;
    this.sortBy = config.params.sortBy;
    this.pageSize = config.params.pageSize;
    this.apiKey = config.apiKey;
    this._getResponseData = this._getResponseData.bind(this);
    this.getNews = this.getNews.bind(this);
    this._cache = null;
    this._keyword = null;
  }

  get cache() {
    return this._cache;
  }

  get keyword() {
    return this._keyword;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(new Error(NEWS_API_ERROR));
    }
    return res.json();
  }

  getNews(keyword, cardList) {
    this._keyword = keyword;
    const header = new Headers();
    header.append('x-api-key', this.apiKey);

    const url = `
    ${removeQuotes(this.baseUrl)}?q=${this.keyword}&from=${this.from}&to=${this.to}&language=${this.language}&sortBy=${this.sortBy}&pageSize=${this.pageSize}
    `;
    const req = new Request(url.trim());

    return fetch(req, {
      headers: header,
    })
      .then((res) => this._getResponseData(res))
      .then((obj) => {
        this._cache = obj.articles;
        cardList.renderLoader(false);
        cardList.renderResults(this.cache);
      })
      .catch((err) => cardList.renderError(err));
  }
}
