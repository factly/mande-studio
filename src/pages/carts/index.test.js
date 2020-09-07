import React from 'react';
import { shallow } from 'enzyme';

import CartList from './index';

describe('Carts List component', () => {
  it('should render the component', () => {
    const component = shallow(<CartList />);
    expect(component).toMatchSnapshot();
  });
});
