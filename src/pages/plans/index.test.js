import React from 'react';
import { shallow } from 'enzyme';

import PlanList from './index';

describe('Plans List component', () => {
  it('should render the component', () => {
    const component = shallow(<PlanList />);
    expect(component).toMatchSnapshot();
  });
  it('should render the component', () => {
    const component = shallow(<PlanList />);

    const button = component.find('Button').at(0);
    expect(button.children().text()).toEqual('Add Plan');
    const link = component.find('Link').at(0);
    expect(link.props().to).toEqual('/plans/create');
  });
});
