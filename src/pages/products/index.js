import React from 'react';
import ProductsList from './components/ProductsList';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

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
