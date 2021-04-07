import React from 'react';
import { Router, useHistory } from 'react-router-dom';
import { useSelector, useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Popconfirm, Button, Table } from 'antd';

import '../../../matchMedia.mock';
import CurrencyList from './CurrenciesList';
import { loadCurrencies, deleteCurrency } from '../../../actions/currencies';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('../../../actions/currencies', () => ({
  loadCurrencies: jest.fn(),
  deleteCurrency: jest.fn(),
}));

describe('Currencies List component', () => {
  let store;
  let mockedDispatch;
  const currency = {
    id: 1,
    name: 'name',
    iso_code: 'iso_code',
    created_at: '2020-12-12',
  };

  describe('snapshot testing', () => {
    beforeEach(() => {
      store = mockStore({
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
      const tree = mount(
        <Provider store={store}>
          <CurrencyList />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should match component when loading', () => {
      store = mockStore({
        currencies: {
          loading: true,
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
      const tree = mount(
        <Provider store={store}>
          <CurrencyList />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should match component with currencies', () => {
      const tree = mount(
        <Provider store={store}>
          <CurrencyList />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(loadCurrencies).toHaveBeenCalledWith(1, 5);
    });
  });
  describe('component testing', () => {
    let wrapper;
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({
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
    it('should change the page', () => {
      wrapper = mount(
        <Provider store={store}>
          <CurrencyList />
        </Provider>,
      );
      const table = wrapper.find(Table);
      table.props().pagination.onChange(2);
      wrapper.update();
      const updatedTable = wrapper.find(Table);
      expect(updatedTable.props().pagination.current).toEqual(2);
    });
    it('should edit currency', () => {
      const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

      wrapper = mount(
        <Provider store={store}>
          <Router history={historyMock}>
            <CurrencyList />
          </Router>
        </Provider>,
      );
      const button = wrapper.find(Button).at(0);
      expect(button.text()).toEqual('Edit');
      button.simulate('click');
      expect(historyMock.push).toHaveBeenCalledWith('/currencies/1/edit');
    });
    it('should delete currency', () => {
      wrapper = mount(
        <Provider store={store}>
          <CurrencyList />
        </Provider>,
      );
      const button = wrapper.find(Button).at(1);
      expect(button.text()).toEqual('Delete');

      button.simulate('click');
      const popconfirm = wrapper.find(Popconfirm);
      popconfirm
        .findWhere((item) => item.type() === 'button' && item.text() === 'OK')
        .simulate('click');
      expect(deleteCurrency).toHaveBeenCalled();
      expect(deleteCurrency).toHaveBeenCalledWith(1);
      expect(loadCurrencies).toHaveBeenCalledWith(1, 5);
    });
    it('should have no delete and edit buttons', () => {
      store = mockStore({
        currencies: {
          loading: false,
          ids: [],
          req: [],
          items: {},
        },
      });
      wrapper = mount(
        <Provider store={store}>
          <CurrencyList />
        </Provider>,
      );

      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
  });
});
