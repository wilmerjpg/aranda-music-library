import AXIOS from '../../../config/api';

const API_KEY = process.env.REACT_APP_MM_KEY;

const getArtists = params => AXIOS.get('chart.artists.get', {
  params: {
    ...params,
    apikey: API_KEY,
  },
});

export default getArtists;
