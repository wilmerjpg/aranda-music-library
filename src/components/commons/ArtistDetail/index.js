import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Collapse, Spin, Alert } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import getAlbums from './api';

import Album from './components/Album';
import * as utils from '../../../utils';

import './styles.css';

const { Panel } = Collapse;

const ArtistDetail = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [existError, setExistError] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    isVisible,
    onCancel,
    artist: {
      artist_id: artistId,
      artist_name: artistName,
    },
    artist,
  } = props;

  const getAlbumsList = async () => {
    try {
      setIsLoading(true);
      const params = {
        artist_id: artistId,
      };
      const { data = {} } = await getAlbums(params);
      const { success, body } = utils.manageResponse(data);

      if (success) {
        const result = body.album_list || [];
        setAlbums(result);
      } else {
        setExistError(true);
      }
      setIsLoading(false);

    } catch {
      setExistError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      let currentFavorites = utils.getValueFromLocalStorage('favoritesArtists');
      currentFavorites = Array.isArray(currentFavorites) ? currentFavorites : [];

      const isFavoriteCurrentArtist = currentFavorites.find(cf => cf?.artist?.artist_id === artistId);
      setIsFavorite(isFavoriteCurrentArtist);

      getAlbumsList();

    } else {
      setAlbums([]);
    }
  }, [isVisible]);

  const handleChangeFavorite = () => {
    let currentFavorites = utils.getValueFromLocalStorage('favoritesArtists');
    currentFavorites = Array.isArray(currentFavorites) ? currentFavorites : [];

    if (isFavorite) {
      currentFavorites = currentFavorites.filter(cf => cf.artist.artist_id !== artistId);
    } else {
      currentFavorites.push({ artist });
    }

    utils.setValueToLocalStorage('favoritesArtists', currentFavorites);
    setIsFavorite(!isFavorite);
  };

  const albumList = albums.map(({ album }) => {
    const {
      album_name: name,
      album_id: id,
    } = album;
    return (
      <Panel header={name} key={id}>
        <Album {...album} />
      </Panel>
    );
  });

  const existAlbums = albums.length > 0;

  const headerAlbumList = (
    <div className='ArtistDetail__header'>
      <h2>{artistName}</h2>
      {isFavorite ?
        <StarFilled style={{ fontSize: 32, color: '#f5d51e' }} onClick={handleChangeFavorite} /> :
        <StarOutlined style={{ fontSize: 32 }} onClick={handleChangeFavorite} />}
    </div>
  );

  return (
    <Modal
      className='ArtistDetail'
      title={headerAlbumList}
      visible={isVisible}
      onCancel={onCancel}
      footer={false}
      key={artistId}
    >
      {isLoading ? (
        <Spin size='large' className='ArtistDetail__spinLoader' />
      ) : (
        existAlbums ? (
          <Collapse>
            {albumList}
          </Collapse>
        ) : (
          existError ? (
            <Alert message='Ha oucurrido un error por favor intente más tarde.' type='error' />
          ) : (
            <h3>No hay álbumes asociados a este artista</h3>
          )
        )
      )}

    </Modal>
  );
};
ArtistDetail.propTypes = {
  isVisible: PropTypes.bool,
  artist: PropTypes.shape({
    artist_name: PropTypes.string,
    artist_id: PropTypes.number,
  }),
};

ArtistDetail.defaultProps = {
  isVisible: false,
  artist: {
    artist_id: 1,
    artist_name: 'Wilmer Song',
  },
};

export default ArtistDetail;
