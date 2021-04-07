import React from 'react';
import { Router, useHistory } from 'react-router-dom';
import renderer, { act as rendererAct } from 'react-test-renderer';
import { useSelector, useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Button, Table } from 'antd';
import { act } from '@testing-library/react';

import '../../../matchMedia.mock';
import CartList from './CartItemsList';
import { loadCartItems } from '../../../actions/cartItems';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('../../../actions/cartItems', () => ({
  loadCartItems: jest.fn(),
}));

describe('Carts List component', () => {
  let store;
  let mockedDispatch;
  const cart = {
    id: 1,
    user_id: 1,
    status: 'status',
    created_at: '2020-12-12',
  };
  store = mockStore({
    cartItems: {
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
          user_id: 1,
          status: 'status',
          created_at: '2020-12-12',
        },
      },
      total: 1,
    },
  });

  describe('snapshot testing', () => {
    beforeEach(() => {
      store = mockStore({
        cartItems: {
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
              user_id: 1,
              status: 'status',
              created_at: '2020-12-12',
            },
          },
          total: 1,
        },
        products: {
          loading: true,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
      });
      store.dispatch = jest.fn(() => ({}));
      mockedDispatch = jest.fn(() => Promise.resolve({}));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should render the component', () => {
      const tree = mount(
        <Provider store={store}>
          <CartList />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should match component when loading', () => {
      store = mockStore({
        cartItems: {
          loading: true,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
      });
      const tree = mount(
        <Provider store={store}>
          <CartList />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should match component with carts', () => {
      loadCartItems.mockReset();
      const tree = mount(
        <Provider store={store}>
          <CartList />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(loadCartItems).toHaveBeenCalledWith(1, 5);
    });
  });
  describe('component testing', () => {
    let wrapper;
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({
        cartItems: {
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
              user_id: 1,
              status: 'status',
              created_at: '2020-12-12',
            },
          },
          total: 1,
        },
        products: {
          loading: true,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
      });
      mockedDispatch = jest.fn(() => Promise.resolve({}));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should change the page', () => {
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CartList />
          </Provider>,
        );
      });
      const table = wrapper.find(Table);
      table.props().pagination.onChange(2, 5);
      wrapper.update();
      const updatedTable = wrapper.find(Table);
      expect(updatedTable.props().pagination.current).toEqual(2);
    });
    it('should go to cart details page', () => {
      const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <Router history={historyMock}>
              <CartList />
            </Router>
          </Provider>,
        );
      });
      const button = wrapper.find(Button).at(0);
      expect(button.text()).toEqual('Details');
      button.simulate('click');
      expect(historyMock.push).toHaveBeenCalledWith('/cart-items/1');
    });
    it('should not have details buttons', () => {
      store = mockStore({
        cartItems: {
          loading: false,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
      });
      wrapper = mount(
        <Provider store={store}>
          <CartList />
        </Provider>,
      );

      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
  });
});
