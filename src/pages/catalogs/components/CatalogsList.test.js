import React from 'react';
import { Router, useHistory } from 'react-router-dom';
import { act } from 'react-test-renderer';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Popconfirm, Button, Table } from 'antd';

import '../../../matchMedia.mock';
import CatalogList from './CatalogsList';
import { loadCatalogs, deleteCatalog } from '../../../actions/catalogs';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../../../actions/catalogs', () => ({
  loadCatalogs: jest.fn(),
  deleteCatalog: jest.fn(),
}));

describe('Catalogs List component', () => {
  let store;
  let mockedDispatch;
  const catalog = {
    id: 1,
    title: 'title',
    description: 'description',
    price: 100,
    published_date: '2020-12-12',
  };

  describe('snapshot testing', () => {
    beforeEach(() => {
      store = mockStore({
        catalogs: {
          loading: false,
          ids: [1],
          items: {
            1: {
              id: 1,
              title: 'title',
              description: 'description',
              price: 100,
              published_date: '2020-12-12',
            },
          },
          total: 1,
        },
      });
      store.dispatch = jest.fn(() => ({}));
      mockedDispatch = jest.fn(() => Promise.resolve({}));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should render the component', () => {
      const tree = mount(
        <Provider store={store}>
          <CatalogList />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should match component when loading', () => {
      store = mockStore({
        catalogs: {
          loading: true,
          ids: [1],
          items: {
            1: {
              id: 1,
              title: 'title',
              description: 'description',
              price: 100,
              published_date: '2020-12-12',
            },
          },
          total: 1,
        },
      });
      const tree = mount(
        <Provider store={store}>
          <CatalogList />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should match component with catalogs', () => {
      const tree = mount(
        <Provider store={store}>
          <CatalogList />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(loadCatalogs).toHaveBeenCalledWith(1, 5);
    });
  });
  describe('component testing', () => {
    let wrapper;
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({
        catalogs: {
          loading: false,
          ids: [1],
          items: {
            1: {
              id: 1,
              title: 'title',
              description: 'description',
              price: 100,
              published_date: '2020-12-12',
            },
          },
          total: 1,
        },
      });
      store.dispatch = jest.fn(() => ({}));
      mockedDispatch = jest.fn(() => Promise.resolve({}));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should change the page', () => {
      wrapper = mount(
        <Provider store={store}>
          <CatalogList />
        </Provider>,
      );
      const table = wrapper.find(Table);
      table.props().pagination.onChange(2);
      wrapper.update();
      const updatedTable = wrapper.find(Table);
      expect(updatedTable.props().pagination.current).toEqual(2);
    });
    it('should edit catalog', () => {
      loadCatalogs.mockReset();
      const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <Router history={historyMock}>
              <CatalogList />
            </Router>
          </Provider>,
        );
      });
      const button = wrapper.find(Button).at(0);
      expect(button.text()).toEqual('Edit');
      button.simulate('click');
      expect(historyMock.push).toHaveBeenCalledWith('/catalogs/1/edit');
    });
    it('should delete catalog', () => {
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CatalogList />
          </Provider>,
        );
      });

      const button = wrapper.find(Button).at(1);
      expect(button.text()).toEqual('Delete');

      button.simulate('click');
      const popconfirm = wrapper.find(Popconfirm);
      popconfirm
        .findWhere((item) => item.type() === 'button' && item.text() === 'OK')
        .simulate('click');
      expect(deleteCatalog).toHaveBeenCalled();
      expect(deleteCatalog).toHaveBeenCalledWith(1);
      expect(loadCatalogs).toHaveBeenCalledWith(1, 5);
    });
    it('should handle delete failure', () => {
      deleteCatalog.mockReset();
      deleteCatalog.mockImplementationOnce(() => Promise.resolve(new Error('Delete Failure')));
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CatalogList />
          </Provider>,
        );
      });
      const button = wrapper.find(Button).at(1);
      expect(button.text()).toEqual('Delete');
      button.simulate('click');
      const popconfirm = wrapper.find(Popconfirm);
      popconfirm
        .findWhere((item) => item.type() === 'button' && item.text() === 'OK')
        .simulate('click');

      expect(deleteCatalog).toHaveBeenCalled();
      expect(deleteCatalog).toHaveBeenCalledWith(1);
    });
    it('should have no delete and edit buttons', () => {
      store = mockStore({
        catalogs: {
          loading: false,
          ids: [],
          items: {},
          total: 0,
        },
      });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CatalogList />
          </Provider>,
        );
      });

      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
  });
});
