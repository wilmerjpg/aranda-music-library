import React, { useState } from 'react';
import Layout from '../Layout';
import * as utils from '../../utils';

const Favorites = () => {
  const [artists, setArtists] = useState([]);

  const getFavoritesArtists = () => {
    const favorites = utils.getFavorites();
    setArtists(favorites);
  };

  return (
    <div className='Favorites'>
      <Layout title='Favoritos' artists={artists} isFavoritePage handleGetResults={getFavoritesArtists} />
    </div>
  );
};

export default Favorites;
