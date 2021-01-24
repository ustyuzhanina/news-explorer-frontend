import { SEARCH_BAR } from './MARKUP_SELECTORS';

const API_URL = 'https://newsapi.org/v2';
const ENDPOINT = '/everything';
const TODAY = new Date().toISOString().slice([0], [10]);
const FROM_DAY = new Date();
const WEEK_AGO_DATE = (new Date(FROM_DAY.setDate(FROM_DAY.getDate() - 7)))
  .toISOString().slice([0], [10]);

const NEWS_API_CONFIG = {
  baseUrl: `${API_URL}${ENDPOINT}`,
  apiKey: 'b326bbabb1dd4436bca051964a795414',
  params: {
    q: SEARCH_BAR.value,
    from: WEEK_AGO_DATE,
    to: TODAY,
    language: 'ru',
    sortBy: 'popularity',
    pageSize: 6, // 100
  },
};

export { NEWS_API_CONFIG };
