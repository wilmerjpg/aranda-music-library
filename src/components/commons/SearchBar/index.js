import React, { useState } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleChangeInputSearch = e => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    console.log('handleSearch', searchText);
  };

  return (
    <div className='SearchBar'>
      <Row gutter={[24, 16]} justify='center'>
        <Col flex={1}>
          <Input
            placeholder='Ingrese nombre del artista'
            prefix={<SearchOutlined />}
            onChange={handleChangeInputSearch}
            onPressEnter={handleSearch}
          />
        </Col>
        <Col>
          <Button
            type='primary'
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
