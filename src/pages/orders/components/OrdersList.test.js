import React from 'react';
import { Router } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Button, Table } from 'antd';

import '../../../matchMedia.mock';
import OrderList from './OrdersList';
import { loadOrders } from '../../../actions/orders';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('../../../actions/orders', () => ({
  loadOrders: jest.fn(),
  deleteOrder: jest.fn(),
}));

describe('Orders List component', () => {
  let store;
  let mockedDispatch;
  const order = {
    id: 1,
    cart_id: 1,
    user_id: 1,
    status: 'status',
    payment_id: 1,
    created_at: '2020-12-12',
  };

  describe('snapshot testing', () => {
    beforeEach(() => {
      store = mockStore({
        orders: {
          ids: [1],
          total: 1,
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
              cart_id: 1,
              user_id: 1,
              status: 'status',
              payment_id: 1,
              created_at: '2020-12-12',
            },
          },
        },
        payments: {
          items: {
            1: {
              id: 1,
              currency_id: 1,
              amount: 100,
            },
          },
        },
        currencies: {
          items: {
            1: {
              id: 1,
              iso_code: 'INR',
            },
          },
        },
      });
      store.dispatch = jest.fn(() => ({}));
      mockedDispatch = jest.fn();
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should render the component', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <OrderList />
          </Provider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component when loading', () => {
      store = mockStore({
        orders: {
          ids: [],
          total: 0,
          loading: true,
          req: [],
          items: {},
        },
        payments: {},
        currencies: {},
      });
      const tree = renderer
        .create(
          <Provider store={store}>
            <OrderList />
          </Provider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component with orders', () => {
      loadOrders.mockReset();

      let component;
      act(() => {
        component = renderer.create(
          <Provider store={store}>
            <OrderList />
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(loadOrders).toHaveBeenCalledWith(1, 5);
    });
  });
  describe('component testing', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({
        orders: {
          ids: [1],
          total: 1,
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
              cart_id: 1,
              user_id: 1,
              status: 'status',
              payment_id: 1,
              created_at: '2020-12-12',
            },
          },
        },
        payments: {
          items: {
            1: {
              id: 1,
              currency_id: 1,
              amount: 100,
            },
          },
        },
        currencies: {
          items: {
            1: {
              id: 1,
              iso_code: 'INR',
            },
          },
        },
      });
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should change the page', () => {
      const wrapper = mount(
        <Provider store={store}>
          <OrderList />
        </Provider>,
      );
      const table = wrapper.find(Table);
      table.props().pagination.onChange(2);
      wrapper.update();
      const updatedTable = wrapper.find(Table);
      expect(updatedTable.props().pagination.current).toEqual(2);
    });
    it('should go to order details page', () => {
      const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
      const wrapper = mount(
        <Provider store={store}>
          <Router history={historyMock}>
            <OrderList />
          </Router>
        </Provider>,
      );
      const button = wrapper.find(Button).at(0);
      expect(button.text()).toEqual('Details');
      button.simulate('click');

      expect(historyMock.push).toHaveBeenCalledWith('/orders/1');
    });
    it('should not have details buttons', () => {
      store = mockStore({
        orders: {
          ids: [],
          total: 0,
          loading: true,
          req: [],
          items: {},
        },
        payments: {},
        currencies: {},
      });
      const wrapper = mount(
        <Provider store={store}>
          <OrderList />
        </Provider>,
      );

      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
  });
});
