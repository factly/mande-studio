import React from 'react';
import { shallow } from 'enzyme';

import OrderList from './index';

describe('Order List component', () => {
  it('should render the component', () => {
    const component = shallow(<OrderList />);
    expect(component).toMatchSnapshot();
  });
});
