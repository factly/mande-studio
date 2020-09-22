import React from 'react';
import { shallow } from 'enzyme';

import PaymentList from './index';

describe('Payment List component', () => {
  it('should render the component', () => {
    const component = shallow(<PaymentList />);
    expect(component).toMatchSnapshot();
  });
});
