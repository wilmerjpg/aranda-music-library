import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, Spin, Alert } from 'antd';
import getTracks from './api';
import * as utils from '../../../../../utils';

import './styles.css';

const Album = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [existError, setExistError] = useState(false);
  const [tracks, setTracks] = useState([]);

  const {
    album_id: id,
  } = props;

  const getTracksList = async () => {
    try {
      setIsLoading(true);
      const params = {
        album_id: id,
      };
      const { data = {} } = await getTracks(params);
      const { success, body } = utils.manageResponse(data);

      if (success) {
        const result = body.track_list || [];
        setTracks(result);
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
    getTracksList();
  }, []);

  const tracksList = tracks.map(({ track }) => track.track_name);
  const existAlbums = tracks.length > 0;

  return (
    <>
      {isLoading ? (
        <Spin size='large' className='Album__spinLoader' />
      ) : (
        existAlbums ? (
          <List
            className='Album'
            header={null}
            footer={null}
            bordered
            dataSource={tracksList}
            renderItem={item => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />
        ) : (
          existError ? (
            <Alert message='Ha oucurrido un error por favor intente más tarde.' type='error' />
          ) : (
            <h3>No hay tracks asociados a este album.</h3>
          )
        )
      )}
    </>

  );
};

Album.propTypes = {
  album_id: PropTypes.number,
};

Album.defaultProps = {
  album_id: 0,
};

export default Album;
