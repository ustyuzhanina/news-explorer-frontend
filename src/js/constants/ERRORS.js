const NEWS_API_ERROR = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

const BAD_REQUEST_ERROR = {
  noPassword: 'Введите пароль',
  wrongUrl: 'Неправильный URL',
};

const AUTH_ERROR = {
  invalidCreds: 'Неправильные почта или пароль',
};

const MONGO_ERROR = {
  usedEmailErr: 'Такой пользователь уже есть',
};

const MAIN_API_ERROR = 'На сервере произошла ошибка';

export {
  NEWS_API_ERROR,
  BAD_REQUEST_ERROR,
  AUTH_ERROR,
  MAIN_API_ERROR,
  MONGO_ERROR,
};
