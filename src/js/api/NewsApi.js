/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import removeQuotes from '../utils/removeQuotes';

export default class NewsApi {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.q = config.params.q;
    this.from = config.params.from;
    this.to = config.params.to;
    this.language = config.params.language;
    this.sortBy = config.params.sortBy;
    this.pageSize = config.params.pageSize;
    this.apiKey = config.apiKey;
    this._getResponseData = this._getResponseData.bind(this);
    this.getNews = this.getNews.bind(this);
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(new Error('ошибка'));
    }
    return res.json();
  }

  getNews() {
    const header = new Headers();
    header.append('x-api-key', this.apiKey);

    const url = `
    ${removeQuotes(this.baseUrl)}?q=${removeQuotes(this.q)}&from=${this.from}&to=${this.to}&language=${this.language}&sortBy=${this.sortBy}&pageSize=${this.pageSize}
    `;

    console.log(this.q);

    const req = new Request(url.trim());

    return fetch(req, {
      headers: header,
    })
      .then((res) => {
        console.log(this._getResponseData(res));
        this._getResponseData(res);
      })
      .then((obj) => obj.articles);
    // .then((res) => {
    //   renderResults(res.articles);
    // })
    // .catch(((err) => renderError(err)))
    // .finally(() => renderLoader(false));
  }
}
