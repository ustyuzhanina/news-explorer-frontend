export default class NewsApi {
  constructor(config, keyword) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
    this.params = config.params;
    this.params.q = keyword;
    this._getResponseData = this._getResponseData.bind(this);
    this.getNews = this.getNews.bind(this);
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
    return res.json();
  }

  getNews() {
    return fetch(`${this.baseUrl}`, {
      headers: this.headers,
      params: this.params,
    })
      .then((res) => this._getResponseData(res));
  }
}
