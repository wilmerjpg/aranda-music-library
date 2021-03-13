import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import getSearchResults from './api';
import Layout from '../Layout';
import * as utils from '../../utils';

const Results = () => {
  const [results, setResults] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryTextSearch = searchParams.get('q_artist') || '';

  const handleSearch = async () => {
    if (!queryTextSearch) {
      history.replace('/');
    } else {
      const params = {
        page: 1,
        page_size: 12,
        q_artist: queryTextSearch,
      };

      const { data = {} } = await getSearchResults(params);
      const { success, body } = utils.manageResponse(data);

      if (success) {
        const result = body.artist_list || [];
        setResults(result);
      } else {
        throw new Error();
      }
    }
  };

  return (
    <div className='Results'>
      <Layout title='Resultados...' artists={results} handleGetResults={handleSearch} queryTextSearch={queryTextSearch} />
    </div>
  );
};

export default Results;
