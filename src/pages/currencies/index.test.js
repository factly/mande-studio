import React from 'react';
import { shallow } from 'enzyme';

import CurrencyList from './index';

describe('Currencies List component', () => {
  it('should render the component', () => {
    const component = shallow(<CurrencyList />);
    expect(component).toMatchSnapshot();
  });
  it('should render the component', () => {
    const component = shallow(<CurrencyList />);

    const button = component.find('Button').at(0);
    expect(button.children().text()).toEqual('Add Currency');
    const link = component.find('Link').at(0);
    expect(link.props().to).toEqual('/currencies/create');
  });
});
