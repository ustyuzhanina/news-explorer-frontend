/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class MainApi {
  constructor(config) {
    this.baseUrl = config.url;
    this.headers = config.headers;
    this._getResponseData = this._getResponseData.bind(this);
    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.createArticle = this.createArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this._isLoggedIn = false;
  }

  set isLoggedIn(status) {
    if (typeof status === 'boolean') {
      this._isLoggedIn = status;
    } else {
      console.log('isLoggedIn может принимать только значения true или false');
    }
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  }

  // methods for users' data and logging-in status

  signup({ email, password, name }) {
    const url = `${this.baseUrl}/signup`;
    this.userName = name;
    const userData = {
      email,
      password,
      name,
    };

    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify(userData),
    })
      .then((res) => this._getResponseData(res))
      .then(() => localStorage.setItem('user', userData.name));
  }

  signin({ email, password }) {
    const url = `${this.baseUrl}/signin`;
    const userData = {
      email,
      password,
    };

    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify(userData),
    })
      .then((res) => this._getResponseData(res))
      .then((res) => {
        this.isLoggedIn = true;
        return res;
      });
  }

  getUserData() {
    const url = `${this.baseUrl}/users/me`;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': this.headers['Content-Type'],
      },
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res))
      .then((userData) => {
        this.isLoggedIn = true;

        if (!localStorage.getItem('user')) {
          localStorage.setItem('user', userData.name);
        }
      })
      .catch((err) => {
        this.isLoggedIn = false;
        console.log(`Код ошибки: ${err}`);
      });
  }

  signout() {
    const url = `${this.baseUrl}/signout`;

    return fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res))
      .then((res) => {
        this.isLoggedIn = false;
        return res;
      });
  }

  // methods for articles

  getArticles() {
    const url = `${this.baseUrl}/articles`;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': this.headers['Content-Type'],
      },
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res));
  }

  createArticle(articleData) {
    const url = `${this.baseUrl}/articles`;

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': this.headers['Content-Type'],
      },
      credentials: 'include',
      body: JSON.stringify(articleData),
    })
      .then((res) => this._getResponseData(res));
  }

  removeArticle(articleId) {
    const url = `${this.baseUrl}/articles/${articleId}`;

    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': this.headers['Content-Type'],
      },
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res));
  }
}
