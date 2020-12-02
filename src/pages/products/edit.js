import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import ProductCreateForm from './components/ProductCreateForm';
import { updateProduct, getProduct } from '../../actions/products';

const ProductEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let { loading, product } = useSelector(({ products }) => {
    console.log('products', products);
    return {
      loading: products.loading,
      product: { ...products.items[id] },
    };
  });

  React.useEffect(() => {
    dispatch(getProduct(id));
  }, []);

  if (loading) return <Skeleton />;

  product.tag_ids = product?.tags;

  const onUpdate = async (values) => {
    await dispatch(updateProduct(id, values));
  };

  return <ProductCreateForm data={product} onSubmit={onUpdate} />;
};

export default ProductEdit;
