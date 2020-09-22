import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { shallow } from 'enzyme';

import DatasetDetails from './detail';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Datasets detail component', () => {
  beforeEach(() => {
    useParams.mockReturnValueOnce({ id: 1 });
  });
  it('should render the component', () => {
    useSelector.mockReturnValueOnce({ id: 1, name: 'dataset' });
    const component = shallow(<DatasetDetails />);
    expect(component).toMatchSnapshot();
  });
  it('should render the component without dataset', () => {
    useSelector.mockReturnValueOnce({});
    const component = shallow(<DatasetDetails />);
    expect(component).toMatchSnapshot();
  });
});
