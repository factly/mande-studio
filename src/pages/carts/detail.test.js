import React from 'react';
import { shallow } from 'enzyme';

import CartDetail from './detail';

describe('Carts Detail component', () => {
  it('should render the component', () => {
    const component = shallow(<CartDetail />);
    expect(component).toMatchSnapshot();
  });
});
