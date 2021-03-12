import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import getSearchResults from './api';
import Layout from '../Layout';

const Results = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryTextSearch = searchParams.get('q_artist') || '';

  const handleSearch = async () => {
    try {
      if (!queryTextSearch) {
        history.replace('/');
      } else {
        setIsLoading(true);
        const params = {
          page: 1,
          page_size: 12,
          q_artist: queryTextSearch,
        };

        const { data = {} } = await getSearchResults(params);
        setResults(data.message?.body?.artist_list);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <div className='Results'>
      <Layout title='Resultados...' artists={results} isLoading={isLoading} handleGetResults={handleSearch} queryTextSearch={queryTextSearch} />
    </div>
  );
};

export default Results;
