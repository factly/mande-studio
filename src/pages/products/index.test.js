import React from 'react';
import { shallow } from 'enzyme';

import ProductList from './index';

describe('Products List component', () => {
  it('should render the component', () => {
    const component = shallow(<ProductList />);
    expect(component).toMatchSnapshot();
  });
  it('should render the component', () => {
    const component = shallow(<ProductList />);

    const button = component.find('Button').at(0);
    expect(button.children().text()).toEqual('Add Product');
    const link = component.find('Link').at(0);
    expect(link.props().to).toEqual('/products/create');
  });
});
