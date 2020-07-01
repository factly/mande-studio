import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import ProductCreateForm from './components/ProductCreateForm';
import { updateProduct, getProduct } from '../../actions/products';

const ProductEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector(({ products }) => ({
    loading: products.loading,
    product: products.items[id],
  }));
  product.tag_ids = product.tags;

  React.useEffect(() => {
    dispatch(getProduct(id));
  }, []);

  if (loading) return <Skeleton />;

  const onUpdate = async (values) => {
    await dispatch(updateProduct(id, values));
  };

  return <ProductCreateForm data={product} onSubmit={onUpdate} />;
};

export default ProductEdit;
