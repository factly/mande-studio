import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductDetails from './components/ProductDetails';

const ProductDetail = () => {
  const { id } = useParams();
  const { product, currencies, tags } = useSelector(({ products, currencies, tags }) => ({
    currencies: currencies.items,
    tags: tags.items,
    product: products.items[id],
  }));

  const currencyCode = currencies[product.currency_id].iso_code;
  const productTags = [];
  product.tags.forEach((id) => productTags.push(tags[id]));

  return <ProductDetails product={product} productTags={productTags} currencyCode={currencyCode} />;
};

export default ProductDetail;
