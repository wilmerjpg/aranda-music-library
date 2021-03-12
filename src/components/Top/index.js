import React, { useState } from 'react';
import getArtists from './api';
import Layout from '../Layout';

const Top = () => {
  const [artistTop, setArtisTop] = useState([]);

  const getArtistTop = async () => {
    const params = {
      page: 1,
      page_size: 12,
    };

    const { data = {} } = await getArtists(params);
    setArtisTop(data.message?.body?.artist_list);
  };

  return (
    <div className='Top'>
      <Layout title='Top 12 By Musicmatch' artists={artistTop} handleGetResults={getArtistTop} />
    </div>
  );
};

export default Top;
