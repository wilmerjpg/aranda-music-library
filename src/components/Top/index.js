import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import SearchBar from '../commons/SearchBar';
import * as api from './api';
import ArtistCard from '../commons/ArtistCard';

import './styles.css';

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

  const artistCardsList = artistTop.map(a => (
    <Col xs={20} sm={11} md={8} lg={6} xl={5} key={a.artist?.artist_id}>
      <ArtistCard {...a} />
    </Col>
  ));

  return (
    <div className='Top'>
      <Row justify='center' gutter={[24, 24]}>
        <Col xs={24} md={16} xl={12}>
          <SearchBar />
        </Col>
      </Row>
      <Row justify='center' gutter={[24, 24]}>
        <Col xs={24} md={16} xl={12}>
          <Button type='link' className='Top__favoriteButton'>
            Ver favoritos
          </Button>
        </Col>
      </Row>
      <Row justify='center' gutter={[24, 24]}>
        <Col xs={24}>
          <h1 className='Top__title'>Top 12 By Musicmatch</h1>
        </Col>
      </Row>
      <Row justify='center' gutter={[{ xs: 0, sm: 16 }, { xs: 8, sm: 16 }]} className='Top__containerCards'>
        {artistCardsList}
      </Row>
    </div>
  );
};

export default Top;
