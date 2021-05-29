import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, Provider, useSelector } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { act } from '@testing-library/react';

import '../../matchMedia.mock';
import EditDataset from './edit';
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
  useParams: jest.fn().mockReturnValue({ id: '1' }),
}));

jest.mock('../../actions/datasets', () => ({
  getDataset: jest.fn(),
  updateDataset: jest.fn(),
  createDatasetFormat: jest.fn(),
}));

describe('Dataset edit component', () => {
  let store;
  let mockedDispatch;

  describe('snapshot testing', () => {
    beforeEach(() => {
      store = mockStore({
        datasets: {
          loading: false,
          ids: [1],
          req: [
            {
              page: 1,
              limit: 5,
              ids: [1],
            },
          ],
          items: {
            1: {
              id: 1,
              url: 'url',
              sample_url: 'sample_url',
              formats: [{ id: 1, url: 'sample_url', format: { id: 1, name: 'pdf' } }],
            },
          },
          total: 1,
        },
        currencies: {
          loading: false,
          ids: [1],
          req: [
            {
              page: 1,
              limit: 5,
              ids: [1],
            },
          ],
          items: {
            1: {
              id: 1,
              name: 'Indian Rupee',
              iso_code: 'INR',
            },
          },
        },
      });
      store.dispatch = jest.fn(() => ({}));
      mockedDispatch = jest.fn(() => Promise.resolve({}));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should render the component', () => {
      const tree = shallow(
        <Provider store={store}>
          <EditDataset />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should match when loading and dataset not found', () => {
      store = mockStore({
        datasets: {
          loading: true,
          ids: [2],
          req: [
            {
              page: 1,
              limit: 5,
              ids: [2],
            },
          ],
          items: {
            2: {
              id: 2,
              url: 'url',
              sample_url: 'sample_url',
              formats: [{ id: 1, url: 'sample_url', format: { id: 1, name: 'pdf' } }],
            },
          },
          total: 1,
        },
        currencies: {
          loading: false,
          ids: [],
          req: [],
          items: {},
        },
      });
      const tree = mount(
        <Provider store={store}>
          <EditDataset />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    beforeEach(() => {
      store = mockStore({
        datasets: {
          loading: false,
          ids: [1],
          req: [
            {
              page: 1,
              limit: 5,
              ids: [1],
            },
          ],
          items: {
            1: {
              id: 1,
              url: 'url',
              sample_url: 'sample_url',
              formats: [{ id: 1, url: 'sample_url', format: { id: 1, name: 'pdf' } }],
            },
          },
          total: 1,
        },
        currencies: {
          loading: false,
          ids: [1],
          req: [
            {
              page: 1,
              limit: 5,
              ids: [1],
            },
          ],
          items: {
            1: {
              id: 1,
              name: 'Indian Rupee',
              iso_code: 'INR',
            },
          },
        },
      });
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should call get action', () => {
      actions.getDataset.mockReset();
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditDataset />
          </Provider>,
        );
      });
      expect(actions.getDataset).toHaveBeenCalledWith('1');
    });
    it('should call update dataset', (done) => {
      actions.updateDataset.mockReset();
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditDataset />
          </Provider>,
        );
      });
      wrapper.find(DatasetCreateForm).props().onSubmitDataset({ test: 'test' });
      setTimeout(() => {
        expect(actions.updateDataset).toHaveBeenCalledWith('1', { test: 'test' });
        done();
      }, 0);
    });
    it('should call createDatasetFormat', (done) => {
      actions.createDatasetFormat.mockReset();
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditDataset />
          </Provider>,
        );
      });
      wrapper.find(DatasetCreateForm).props().onSubmitDatasetFormat({ test: 'test' }, 1);
      setTimeout(() => {
        expect(actions.createDatasetFormat).toHaveBeenCalledWith({ test: 'test' }, 1);
        done();
      }, 0);
    });
  });
});
