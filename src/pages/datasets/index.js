import React from 'react';
import DatasetsList from './components/DatasetsList';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Datasets = () => {
  return (
    <>
      <Link to={'/datasets/create'}>
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add Dataset
        </Button>
      </Link>
      <DatasetsList />
    </>
  );
};

export default Datasets;
