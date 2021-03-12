import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import SearchBar from '../commons/SearchBar';
import ArtistCard from '../commons/ArtistCard';

import './styles.css';

const Layout = props => {
  const {
    title,
    artists,
    isFavoritePage,
  } = props;

  const artistCardsList = artists.map(a => (
    <Col xs={20} sm={11} md={8} lg={6} xl={5} key={a?.artist?.artist_id}>
      <ArtistCard {...a} />
    </Col>
  ));

  return (
    <div className='Layout'>
      <Row justify='center' gutter={[24, 24]}>
        <Col xs={24} md={16} xl={12}>
          <SearchBar />
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
      <Row justify='center' gutter={[{ xs: 0, sm: 16 }, { xs: 8, sm: 16 }]} className='Layout__containerCards'>
        {artistCardsList}
      </Row>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  artists: PropTypes.array,
  isFavoritePage: PropTypes.bool,
};

Layout.defaultProps = {
  title: '',
  artists: [],
  isFavoritePage: false,
};

export default Layout;
