import React from 'react';
import CatalogsList from './components/CatalogsList';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Catalogs = () => {
  return (
    <>
      <Link to={'/catalogs/create'}>
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add Catalogs
        </Button>
      </Link>
      <CatalogsList />
    </>
  );
};

export default Catalogs;
