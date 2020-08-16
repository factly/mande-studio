import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { useSelector, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Table } from 'antd';

import '../../../matchMedia.mock';
import PaymentList from './PaymentsList';
import { loadPayments } from '../../../actions/payments';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('../../../actions/payments', () => ({
  loadPayments: jest.fn(),
  deletePayment: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

describe('Payments List component', () => {
  let store;
  let mockedDispatch;
  const payment = {
    id: 1,
    amount: 1,
    currency_id: 1,
    status: 'status',
    gateway: 'Gateway',
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
      const tree = renderer.create(<PaymentList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component when loading', () => {
      useSelector.mockImplementation((state) => ({
        data: [],
        total: 0,
        currencies: {},
      }));
      const tree = renderer.create(<PaymentList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component with payments', () => {
      loadPayments.mockReset();
      useSelector.mockImplementation((state) => ({
        data: [payment],
        total: 1,
        currencies: { 1: { id: 1, iso_code: 'INR' } },
      }));

      let component;
      act(() => {
        component = renderer.create(
          <Router>
            <PaymentList />
          </Router>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      expect(useSelector).toHaveBeenCalled();
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(useSelector).toHaveReturnedWith({
        data: [payment],
        total: 1,
        currencies: { 1: { id: 1, iso_code: 'INR' } },
      });
      expect(loadPayments).toHaveBeenCalledWith(1, 5);
    });
  });
  describe('component testing', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should change the page', (done) => {
      useSelector.mockImplementation((state) => ({}));

      const wrapper = mount(<PaymentList />);
      const table = wrapper.find(Table);
      table.props().pagination.onChange(2, 5);
      wrapper.update();
      const updatedTable = wrapper.find(Table);
      expect(updatedTable.props().pagination.current).toEqual(2);
      setTimeout(() => {
        expect(loadPayments).toHaveBeenLastCalledWith(2, 5);
        done();
      }, 0);
    });
  });
});
