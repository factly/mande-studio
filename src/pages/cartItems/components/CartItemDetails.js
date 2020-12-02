import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import ProductDetails from '../../products/components/ProductDetails';
import { getProduct } from '../../../actions/products';

const CartItemDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, product, currencies, tags } = useSelector(({ products, currencies, tags }) => ({
    loading: products.loading,
    product: products.items[id],
    currencies: currencies.items,
    tags: tags.items,
  }));

  React.useEffect(() => {
    dispatch(getProduct(id));
  }, []);

  if (loading) return <Skeleton />;

  const currencyCode = currencies[product.currency_id].iso_code;
  const productTags = [];
  product.tags.forEach((id) => productTags.push(tags[id]));

  return (
    <>
      <h2>Product:</h2>
      <ProductDetails product={product} currencyCode={currencyCode} productTags={productTags} />
    </>
  );
};

export default CartItemDetails;
