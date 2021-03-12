import React, { useState, useEffect } from 'react';
import * as api from './api';
import Layout from '../Layout';

const Top = () => {
  const [artistTop, setArtisTop] = useState([]);

  const getArtistTop = async () => {
    const params = {
      page: 1,
      page_size: 12,
    };

    const { data = {} } = await api.getArtistTop(params);
    setArtisTop(data.message?.body?.artist_list);

  };

  useEffect(() => {
    getArtistTop();
  }, []);

  return (
    <div className='Top'>
      <Layout title='Top 12 By Musicmatch' artists={artistTop} />
    </div>
  );
};

export default Top;
