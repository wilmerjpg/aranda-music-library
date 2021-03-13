import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import { TwitterOutlined, StarOutlined, StarFilled, PlusCircleFilled } from '@ant-design/icons';
import './styles.css';

const ArtistCard = props => {
  const {
    artist,
    handleShowDetail,
    isFavorite,
    handleChangeFavorite,
  } = props;

  const {
    artist_country: artistCountry,
    artist_name: artistName,
    artist_twitter_url: artistTwitterUrl,
    begin_date: beginDate,
  } = artist;

  const handleClickDetail = () => {
    handleShowDetail(artist);
  };

  const artistTwiiterAccount = artistTwitterUrl ? artistTwitterUrl.split('/').pop() : '';

  return (
    <Card className='ArtistCard'>
      <p>
        <span>Artista: </span>
        {artistName || 'Desconocido'}
      </p>
      <p>
        <span>País: </span>
        {artistCountry || 'Desconocido'}
      </p>
      <p>
        <span>Fecha de inicio: </span>
        {beginDate || 'Desconocida'}
      </p>
      {artistTwitterUrl && (
        <Button className='ArtistCard__twitter' type='link' href={artistTwitterUrl} target='_blank'>
          <span>{artistTwiiterAccount}</span>
          <TwitterOutlined style={{ fontSize: 32 }} />
        </Button>
      )}
      <div className='ArtistCard__actions'>
        {isFavorite ?
          <StarFilled style={{ fontSize: 32, color: '#f5d51e' }} onClick={() => handleChangeFavorite(artist)} /> :
          <StarOutlined style={{ fontSize: 32 }} onClick={() => handleChangeFavorite(artist)} />}
        <PlusCircleFilled style={{ fontSize: 32 }} onClick={handleClickDetail} />
      </div>

    </Card>
  );
};
ArtistCard.propTypes = {
  handleShowDetail: PropTypes.func,
  artist: PropTypes.shape({
    artist_country: PropTypes.string,
    artist_name: PropTypes.string,
    artist_twitter_url: PropTypes.string,
    begin_date: PropTypes.string,
  }),
  handleChangeFavorite: PropTypes.func,
  isFavorite: PropTypes.bool,

};

ArtistCard.defaultProps = {
  handleShowDetail: () => {},
  artist: {
    artist_country: '',
    artist_name: '',
    artist_twitter_url: '',
    begin_date: '',
  },
  handleChangeFavorite: () => {},
  isFavorite: false,

};

export default ArtistCard;
