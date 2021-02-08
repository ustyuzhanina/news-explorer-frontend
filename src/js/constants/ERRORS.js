const NEWS_API_ERROR = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

const NOT_FOUND_ERROR = {
  user: 'Нет пользователя с таким id',
  article: 'В базе данных еще нет ни одной новости',
  articleId: 'В базе данных нет такой новости',
};

const BAD_REQUEST_ERROR = {
  noPassword: 'Введите пароль',
  wrongUrl: 'Неправильный URL',
};

const AUTH_ERROR = {
  invalidCreds: 'Неправильные почта или пароль',
  authRequired: 'Необходима авторизация',
};

const FORBIDDEN = {
  deleteArticle: 'Запрещено',
};

const MONGO_ERROR = {
  usedEmailErr: 'Такой пользователь уже есть',
};

const MAIN_API_ERROR = 'На сервере произошла ошибка';

export {
  NEWS_API_ERROR,
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  AUTH_ERROR,
  FORBIDDEN,
  MAIN_API_ERROR,
  MONGO_ERROR,
};
