import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

const AXIOS = axios.create({
  baseURL: URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default AXIOS;
