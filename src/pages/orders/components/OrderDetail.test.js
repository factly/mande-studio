import React from 'react';
import { useParams } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { useSelector, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Table } from 'antd';
import { act } from '@testing-library/react';

import '../../../matchMedia.mock';
import OrderDetails from './OrderDetails';
import { loadOrders } from '../../../actions/orders';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('../../../actions/orders', () => ({
  loadOrders: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));
useParams.mockReturnValue({ id: 1 });

describe('Orders List component', () => {
  let store;
  let mockedDispatch;
  const orderItem = {
    id: 1,
    extra_info: 'extra_info',
    product_id: 1,
    currency_id: 1,
  };

  describe('snapshot testing', () => {
    beforeEach(() => {
      store = mockStore({});
      store.dispatch = jest.fn();
      mockedDispatch = jest.fn();
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should render the component', () => {
      useSelector.mockImplementation(() => ({
        data: [orderItem],
        products: { 1: { id: 1, title: 'Product', price: 100, currency_id: 1 } },
        currencies: { 1: { id: 1, iso_code: 'INR' } },
        total: 1,
      }));
      const tree = renderer.create(<OrderDetails />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component when no data', () => {
      useSelector.mockImplementation(() => ({
        data: [],
        total: 0,
        products: {},
        currencies: {},
      }));
      const tree = renderer.create(<OrderDetails />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
  });
  describe('component testing', () => {
    let wrapper;
    beforeEach(() => {
      jest.clearAllMocks();
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);

      act(() => {
        wrapper = mount(<OrderDetails />);
      });
    });
    afterEach(() => {
      act(() => {
        wrapper.unmount();
      });
    });
    it('should render the component', () => {
      useSelector.mockImplementation(() => ({
        data: [orderItem],
        products: { 1: { id: 1, title: 'Product', price: 100, currency_id: 1 } },
        currencies: { 1: { id: 1, iso_code: 'INR' } },
        total: 1,
      }));
      //expect(loadOrders).toHaveBeenCalledWith(1, 1, 5);
    });
    it('should change the page', (done) => {
      useSelector.mockImplementation(() => ({}));

      act(() => {
        const table = wrapper.find(Table);
        table.props().pagination.onChange(2);
      });
      wrapper.update();
      setTimeout(() => {
        const updatedTable = wrapper.find(Table);
        expect(updatedTable.props().pagination.current).toEqual(2);
        done();
      });
    });
  });
});
