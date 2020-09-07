import React from 'react';
import { shallow } from 'enzyme';

import MediaList from './index';

describe('Media List component', () => {
  it('should render the component', () => {
    const component = shallow(<MediaList />);
    expect(component).toMatchSnapshot();
  });
});
