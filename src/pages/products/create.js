import React from 'react';
import { useDispatch } from 'react-redux';

import ProductCreateForm from './components/ProductCreateForm';
import { createProduct } from '../../actions/products';

const ProductCreate = () => {
  const dispatch = useDispatch();

  const onCreate = async (values) => {
    await dispatch(createProduct(values));
  };

  return <ProductCreateForm onSubmit={onCreate} />;
};

export default ProductCreate;
