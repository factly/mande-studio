import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import ProductsList from './components/ProductsList';

const Products = () => {
  return (
    <>
      <Link to={'/products/create'}>
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add Product
        </Button>
      </Link>
      <ProductsList />
    </>
  );
};

export default Products;
