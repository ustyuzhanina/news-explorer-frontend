export default class MainApi {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
    this._getResponseData = this._getResponseData.bind(this);
    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.createArticle = this.createArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    /// и так далее
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}
