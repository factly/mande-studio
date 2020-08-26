import React from 'react';
import { shallow } from 'enzyme';

import ProductDetails from './ProductDetails';

describe('ProductDetails component', () => {
  const product = {
    id: 1,
    title: 'title',
    slug: 'slug',
    price: 'price',
    status: 'status',
    created_at: '2020-12-12',
  };

  it('should render the component', () => {
    const component = shallow(
      <ProductDetails
        product={product}
        currencyCode={'INR'}
        productTags={[{ id: 1, title: 'tag1' }]}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
