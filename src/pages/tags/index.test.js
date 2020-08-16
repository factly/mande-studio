import React from 'react';
import { shallow } from 'enzyme';

import TagList from './index';

describe('Tags List component', () => {
  it('should render the component', () => {
    const component = shallow(<TagList />);
    expect(component).toMatchSnapshot();
  });
  it('should render the component', () => {
    const component = shallow(<TagList />);

    const button = component.find('Button').at(0);
    expect(button.children().text()).toEqual('Add Tag');
    const link = component.find('Link').at(0);
    expect(link.props().to).toEqual('/tags/create');
  });
});
