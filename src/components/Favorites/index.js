import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import * as utils from '../../utils';

const Favorites = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    let currentFavorites = utils.getValueFromLocalStorage('favoritesArtists');
    currentFavorites = Array.isArray(currentFavorites) ? currentFavorites : [];

    setArtists(currentFavorites);
  }, []);

  return (
    <div className='Favorites'>
      <Layout title='Favoritos' artists={artists} isFavoritePage />
    </div>
  );
};

export default Favorites;
