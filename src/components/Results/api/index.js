import AXIOS from '../../../config/api';

const API_KEY = process.env.REACT_APP_MM_KEY;

const getSearchResults = params => AXIOS.get('artist.search', {
  params: {
    ...params,
    apikey: API_KEY,
  },
});

export default getSearchResults;
