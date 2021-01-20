// export const API_URL = NODE_ENV === 'production' ? 'https://nomoreparties.co' : 'http://nomoreparties.co';
const API_URL = 'https://newsapi.org/v2';

const NEWS_API_CONFIG = {
  baseUrl: `${API_URL}/everything`,
  apiKey: 'b326bbabb1dd4436bca051964a795414',
  params: {
    q: 'экономика',
    from: '2021-01-01',
    to: '2021-01-19',
    language: 'ru',
    sortBy: 'popularity',
    pageSize: 9, // 100
  },
};

export default { NEWS_API_CONFIG };
