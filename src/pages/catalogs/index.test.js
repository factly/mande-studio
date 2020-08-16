import React from 'react';
import { shallow } from 'enzyme';

import CatalogList from './index';

describe('Catalogs List component', () => {
  it('should render the component', () => {
    const component = shallow(<CatalogList />);
    expect(component).toMatchSnapshot();
  });
  it('should render the component', () => {
    const component = shallow(<CatalogList />);

    const button = component.find('Button').at(0);
    expect(button.children().text()).toEqual('Add Catalog');
    const link = component.find('Link').at(0);
    expect(link.props().to).toEqual('/catalogs/create');
  });
});
