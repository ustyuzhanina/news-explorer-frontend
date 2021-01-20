/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
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
    this.getNews = this.getNews.bind(this);
  }

  // _getResponseData(res) {
  //   if (!res.ok) {
  //     return Promise.reject(new Error(`Ошибка: ${res.status}`));
  //   }
  //   return res.json();
  // }

  getNews() {
    const header = new Headers();
    header.append('x-api-key', `${this.apiKey.replace('\'', '')}`);

    const url = 'https://newsapi.org/v2/everything?q=экономика&from=2021-01-01&to=2021-01-20&language=ru&sortBy=popularity&pageSize=3';

    const req = new Request(url.trim());

    return fetch(req, {
      headers: header,
    })
      .then((res) => res.json())
      .then((res) => res.articles);
  }
}

// const url = `
// ${this.baseUrl}?
// q=${this.q}&
// from=${this.from}&
// to=${this.to}&
// language=${this.language}&
// sortBy=${this.sortBy}&
// pageSize=${this.pageSize}
// `;
