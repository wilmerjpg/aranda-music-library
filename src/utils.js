export const getValueFromLocalStorage = key => {
  let value = localStorage.getItem(key);
  value = value ? JSON.parse(value) : null;
  return value;
};

export const setValueToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFavorites = () => {
  let value = localStorage.getItem('favoritesArtists');
  value = value ? JSON.parse(value) : null;
  const currentFavorites = Array.isArray(value) ? value : [];
  return currentFavorites;
};

export const isFavoriteArtist = artistId => {
  const currentFavorites = getFavorites();
  return !!currentFavorites.find(cf => cf.artist.artist_id === artistId);
};

export const updateFavorites = artist => {
  let currentFavorites = getFavorites();
  const isFavorite = isFavoriteArtist(artist.artist_id);
  if (isFavorite) {
    currentFavorites = currentFavorites.filter(cf => cf.artist.artist_id !== artist.artist_id);
  } else {
    currentFavorites.push({ artist });
  }
  setValueToLocalStorage('favoritesArtists', currentFavorites);
  return currentFavorites;
};

export const manageResponse = response => {
  const statusCode = response?.message?.header?.status_code;
  const body = response?.message?.body;

  return {
    success: statusCode && statusCode >= 200 && statusCode <= 299,
    body,
  };

};

