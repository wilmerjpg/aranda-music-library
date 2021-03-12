import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = props => {
  const [searchText, setSearchText] = useState('');
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryTextSearch = searchParams.get('q_artist') || '';
  const { isLoading } = props;

  const handleChangeInputSearch = e => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    if (searchText) {
      history.push(`results?q_artist=${searchText}`);
    } else {
      history.push('/');
    }
  };

  const handleClearSearch = () => {
    history.push('/');
  };

  useEffect(() => {
    if (queryTextSearch) {
      setSearchText(queryTextSearch);
    }
  }, [queryTextSearch]);

  return (
    <div className='SearchBar'>
      <Row gutter={[16, 16]} justify='center'>
        <Col flex={1}>
          <Input
            placeholder='Ingrese nombre del artista'
            prefix={<SearchOutlined />}
            onChange={handleChangeInputSearch}
            onPressEnter={handleSearch}
            value={searchText}
            disabled={isLoading}
            maxLength={80}
          />
        </Col>
        <Col>
          <Button
            type='primary'
            onClick={handleSearch}
            disabled={isLoading}
          >
            Buscar
          </Button>
        </Col>
        <Col>
          <Button
            onClick={handleClearSearch}
            disabled={isLoading}
          >
            Limpiar
          </Button>
        </Col>
      </Row>
    </div>
  );
};

SearchBar.propTypes = {
  isLoading: PropTypes.bool,
};

SearchBar.defaultProps = {
  isLoading: false,
};

export default SearchBar;
