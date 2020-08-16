import React from 'react';
import { shallow } from 'enzyme';

import MembershipList from './index';

describe('Membership List component', () => {
  it('should render the component', () => {
    const component = shallow(<MembershipList />);
    expect(component).toMatchSnapshot();
  });
});
