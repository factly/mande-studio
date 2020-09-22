import React from 'react';
import { shallow } from 'enzyme';

import DatasetList from './index';

describe('Datasets index component', () => {
  it('should render the component', () => {
    const component = shallow(<DatasetList />);
    expect(component).toMatchSnapshot();
  });
  it('should render the component', () => {
    const component = shallow(<DatasetList />);

    const button = component.find('Button').at(0);
    expect(button.children().text()).toEqual('Add Dataset');
    const link = component.find('Link').at(0);
    expect(link.props().to).toEqual('/datasets/create');
  });
});
