import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import SearchBar from '../commons/SearchBar';
import ArtistCard from '../commons/ArtistCard';

import './styles.css';

TopBarProgress.config({
  barThickness: 5,
  barColors: {
    '0': '#41a0f9',
    '1.0': '#0067c7',
  },
  shadowBlur: 5,
});

const Layout = props => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    title,
    artists,
    isFavoritePage,
    handleGetResults,
    queryTextSearch,
  } = props;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await handleGetResults();
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [queryTextSearch]);

  const artistCardsList = artists.map(a => (
    <Col xs={20} sm={11} md={8} lg={6} xl={5} key={a?.artist?.artist_id}>
      <ArtistCard {...a} />
    </Col>
  ));

  return (
    <div className='Layout'>
      {isLoading && <TopBarProgress />}
      <Row justify='center' gutter={[24, 24]}>
        <Col xs={24} md={16} xl={12}>
          <SearchBar isLoading={isLoading} />
        </Col>
      </Row>
      <Row justify='center' gutter={[24, 24]}>
        <Col xs={24} md={16} xl={12}>
          {isFavoritePage ? (
            <Link to='/' className='Layout__favoriteButton'>
              Volver al Top 12
            </Link>
          ) : (
            <Link to='/favorites' className='Layout__favoriteButton'>
              Ver favoritos
            </Link>
          )}
        </Col>
      </Row>
      <Row justify='center' gutter={[24, 24]}>
        <Col xs={24}>
          <h1 className='Layout__title'>{title}</h1>
        </Col>
      </Row>
      {artists.length ? (
        <Row justify='center' gutter={[{ xs: 0, sm: 16 }, { xs: 8, sm: 16 }]} className='Layout__containerCards'>
          {artistCardsList}
        </Row>
      ) : (isLoading ? (
        null
      ) : (
        <Row justify='center' gutter={[24, 24]}>
          <Col xs={24}>
            <h3 className='Layout__title'>No hay artistas para mostrar en este momento</h3>
          </Col>
        </Row>
      )
      )}

    </div>
  );
};

Layout.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  artists: PropTypes.array,
  isFavoritePage: PropTypes.bool,
  handleGetResults: PropTypes.func,
  queryTextSearch: PropTypes.string,
};

Layout.defaultProps = {
  isLoading: false,
  title: '',
  artists: [],
  isFavoritePage: false,
  handleGetResults: () => {},
  queryTextSearch: '',
};

export default Layout;
