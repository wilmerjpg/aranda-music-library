import React, { useState } from 'react';
import getArtists from './api';
import Layout from '../Layout';
import * as utils from '../../utils';

const Top = () => {
  const [artistTop, setArtisTop] = useState([]);

  const getArtistTop = async () => {
    const params = {
      page: 1,
      page_size: 12,
    };

    const { data = {} } = await getArtists(params);
    const { success, body } = utils.manageResponse(data);

    if (success) {
      const result = body.artist_list || [];
      setArtisTop(result);
    } else {
      throw new Error();
    }
  };

  return (
    <div className='Top'>
      <Layout title='Top 12 By Musicmatch' artists={artistTop} handleGetResults={getArtistTop} />
    </div>
  );
};

export default Top;
