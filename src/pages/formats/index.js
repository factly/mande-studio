import React from 'react';
import FormatsList from './components/FormatsList';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Formats = () => {
  return (
    <>
      <Link to={'/formats/create'}>
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add Format
        </Button>
      </Link>
      <FormatsList />
    </>
  );
};

export default Formats;
