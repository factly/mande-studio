import React from 'react';
import { shallow } from 'enzyme';

import FormatList from './index';

describe('Formats List component', () => {
  it('should render the component', () => {
    const component = shallow(<FormatList />);
    expect(component).toMatchSnapshot();
  });
  it('should render the component', () => {
    const component = shallow(<FormatList />);

    const button = component.find('Button').at(0);
    expect(button.children().text()).toEqual('Add Format');
    const link = component.find('Link').at(0);
    expect(link.props().to).toEqual('/formats/create');
  });
});
