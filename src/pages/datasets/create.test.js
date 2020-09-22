import React from 'react';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { act } from '@testing-library/react';

import '../../matchMedia.mock';
import CreateDataset from './create';
import * as actions from '../../actions/datasets';
import DatasetCreateForm from './components/DatasetCreateForm';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

jest.mock('../../actions/datasets', () => ({
  createDataset: jest.fn(),
  createDatasetFormat: jest.fn(),
}));

describe('Datasets create component', () => {
  let store;
  let mockedDispatch;

  store = mockStore({
    datasets: {
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    },
  });
  store.dispatch = jest.fn(() => ({}));
  mockedDispatch = jest.fn(() => Promise.resolve({}));
  useDispatch.mockReturnValue(mockedDispatch);
  describe('snapshot testing', () => {
    it('should render the component', () => {
      const component = shallow(<CreateDataset />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    afterEach(() => {
      wrapper.unmount();
    });
    it('should call createDataset', (done) => {
      actions.createDataset.mockReset();
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CreateDataset />
          </Provider>,
        );
      });
      wrapper.find(DatasetCreateForm).props().onSubmitDataset({ test: 'test' });
      setTimeout(() => {
        expect(actions.createDataset).toHaveBeenCalledWith({ test: 'test' });
        done();
      }, 0);
    });
    it('should call createDatasetFormat', (done) => {
      actions.createDatasetFormat.mockReset();
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CreateDataset />
          </Provider>,
        );
      });
      wrapper.find(DatasetCreateForm).props().onSubmitDatasetFormat(1, { test: 'test' });
      setTimeout(() => {
        expect(actions.createDatasetFormat).toHaveBeenCalledWith(1, { test: 'test' });
        done();
      }, 0);
    });
  });
});
