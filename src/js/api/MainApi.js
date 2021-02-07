/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class MainApi {
  constructor(config) {
    this.baseUrl = config.url;
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
      return Promise.reject(res.status);
    }
    return res.json();
  }

  // methods for users' data

  signup(email, password, name, setServerError) {
    const url = `${this.baseUrl}/signup`;
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
      .catch((err) => {
        if (err === 409) {
          setServerError();
        } else { console.log(`Код ошибки ${err}`); }
      });
  }

  signin(email, password, setServerError) {
    const url = `${this.baseUrl}/signin`;

    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify(userData),
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          return new Error('потом прописать сообщение об ошибке в константы');
        }
        return err;
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
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          return new Error('потом прописать сообщение об ошибке в константы');
        }
        return err;
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
    });
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
    });
  }

  removeArticle(articleId) {
    const url = `${this.baseUrl}/articles/${articleId}`;

    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': this.headers['Content-Type'],
      },
      credentials: 'include',
    }); // cut to paste to newscard
  }
}
