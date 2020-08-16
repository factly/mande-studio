import React from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { useSelector, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Button, Table } from 'antd';

import '../../../matchMedia.mock';
import OrderList from './OrdersList';
import { loadOrders } from '../../../actions/orders';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('../../../actions/orders', () => ({
  loadOrders: jest.fn(),
  deleteOrder: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
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
      store = mockStore({});
      store.dispatch = jest.fn();
      mockedDispatch = jest.fn();
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should render the component', () => {
      useSelector.mockImplementation((state) => ({}));
      const tree = renderer.create(<OrderList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component when loading', () => {
      useSelector.mockImplementation((state) => ({
        data: [],
        total: 0,
        payments: {},
        currencies: {},
      }));
      const tree = renderer.create(<OrderList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component with orders', () => {
      loadOrders.mockReset();
      useSelector.mockImplementation((state) => ({
        data: [order],
        total: 1,
        payments: { 1: { id: 1, amount: 100, currency_id: 1 } },
        currencies: { 1: { id: 1, iso_code: 'INR' } },
      }));

      let component;
      act(() => {
        component = renderer.create(
          <Router>
            <OrderList />
          </Router>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      expect(useSelector).toHaveBeenCalled();
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(useSelector).toHaveReturnedWith({
        data: [order],
        total: 1,
        payments: { 1: { id: 1, amount: 100, currency_id: 1 } },
        currencies: { 1: { id: 1, iso_code: 'INR' } },
      });
      expect(loadOrders).toHaveBeenCalledWith(1, 5);
    });
  });
  describe('component testing', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should change the page', () => {
      useSelector.mockImplementation((state) => ({}));

      const wrapper = shallow(<OrderList />);
      const table = wrapper.find(Table);
      table.props().pagination.onChange(2);
      wrapper.update();
      const updatedTable = wrapper.find(Table);
      expect(updatedTable.props().pagination.current).toEqual(2);
    });
    it('should go to order details page', () => {
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });
      useSelector.mockImplementation((state) => ({
        data: [order],
        total: 1,
        payments: { 1: { id: 1, amount: 100, currency_id: 1 } },
        currencies: { 1: { id: 1, iso_code: 'INR' } },
      }));

      const wrapper = mount(
        <Router>
          <OrderList />
        </Router>,
      );
      const button = wrapper.find(Button).at(0);
      expect(button.text()).toEqual('Details');
      button.simulate('click');

      expect(push).toHaveBeenCalledWith('/orders/1');
    });
    it('should not have details buttons', () => {
      useSelector.mockImplementation((state) => ({}));

      const wrapper = mount(
        <Router>
          <OrderList />
        </Router>,
      );

      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
  });
});
