// export const API_URL = NODE_ENV === 'production' ? 'https://nomoreparties.co' : 'http://nomoreparties.co';
const API_URL = 'https://newsapi.org/v2';
const ENDPOINT = '/everything';
const TODAY = new Date().toJSON().toString().slice([0], [10]);
const FROM_DAY = new Date();
const WEEK_AGO_DATE = (new Date(FROM_DAY.setDate(FROM_DAY.getDate() - 7)))
  .toJSON().toString().slice([0], [10]);


const NEWS_API_CONFIG = {
  baseUrl: `${API_URL}${ENDPOINT}`,
  apiKey: 'b326bbabb1dd4436bca051964a795414',
  params: {
    q: 'природа',
    from: WEEK_AGO_DATE,
    to: TODAY,
    language: 'ru',
    sortBy: 'popularity',
    pageSize: 9, // 100
  },
};

export default { NEWS_API_CONFIG };
