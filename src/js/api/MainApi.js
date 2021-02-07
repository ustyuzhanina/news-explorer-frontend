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
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
    return res.json();
  }

  // methods for users' data

  signup(email, password, name, setServerError) {
    const url = `${this.baseUrl}/signup`;
    const fullHeaders = this.headers.append('credentials', 'include');
    const userData = {
      email,
      password,
      name,
    };

    return fetch(url, {
      method: 'POST',
      headers: fullHeaders,
      body: JSON.stringify(userData),
    })
      .then((res) => this._getResponseData(res))
      .then((res) => console.log(res))
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          return new Error('потом прописать сообщение об ошибке в константы');
        }
        return err;
      });
  }

  signin(userData) {
    const url = `${this.baseUrl}/signin`;

    return fetch(url, {
      method: 'POST',
      headers: this.headers,
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

  getUserData(token) {
    const url = `${this.baseUrl}/users/me`;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': this.headers['Content-Type'],
        Authorization: `Bearer ${token}`,
      },
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

  getArticles(token) {
    const url = `${this.baseUrl}/articles`;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': this.headers['Content-Type'],
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createArticle(articleData, token) {
    const url = `${this.baseUrl}/articles`;

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': this.headers['Content-Type'],
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articleData),
    });
  }

  removeArticle(articleId, token) {
    const url = `${this.baseUrl}/articles/${articleId}`;

    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': this.headers['Content-Type'],
        Authorization: `Bearer ${token}`,
      },
    }); // cut to paste to newscard
  }
}
