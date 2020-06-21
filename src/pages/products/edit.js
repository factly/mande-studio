import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import ProductCreateForm from './components/ProductCreateForm';
import { updateProduct, getProductDetails } from '../../actions/products';

const ProductEdit = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector(({ products }) => products);
  product.tag_ids = product.tags;

  React.useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);

  if (!product.id) return <Skeleton />;

  const onUpdate = async (values) => {
    await dispatch(updateProduct(id, values));
  };

  return <ProductCreateForm data={product} onSubmit={onUpdate} />;
};

export default ProductEdit;
