import AXIOS from '../../../../config/api';

const API_KEY = process.env.REACT_APP_MM_KEY;

const getAlbums = params => AXIOS.get('artist.albums.get', {
  params: {
    ...params,
    apikey: API_KEY,
  },
});

export default getAlbums;
