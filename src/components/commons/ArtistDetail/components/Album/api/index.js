import AXIOS from '../../../../../../config/api';

const API_KEY = process.env.REACT_APP_MM_KEY;

const getTracks = params => AXIOS.get('album.tracks.get', {
  params: {
    ...params,
    apikey: API_KEY,
  },
});

export default getTracks;
