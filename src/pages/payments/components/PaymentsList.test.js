import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { useDispatch, Provider } from 'react-redux';
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
  ...jest.requireActual('react-redux'),
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
      store = mockStore({
        payments: {
          ids: [1],
          req: [],
          loading: false,
          items: {
            1: {
              id: 1,
              amount: 1,
              currency_id: 1,
              status: 'status',
              gateway: 'Gateway',
              created_at: '2020-12-12',
            },
          },
          total: 1,
        },
        currencies: {
          loading: false,
          ids: [1],
          req: [],
          items: {
            1: { id: 1, iso_code: 'INR' },
          },
          total: 1,
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
            <PaymentList />
          </Provider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component when loading', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <PaymentList />
          </Provider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component with payments', () => {
      loadPayments.mockReset();
      let component;
      act(() => {
        component = renderer.create(
          <Provider store={store}>
            <Router>
              <PaymentList />
            </Router>
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(loadPayments).toHaveBeenCalledWith(1, 5);
    });
  });
  describe('component testing', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({
        payments: {
          ids: [1],
          req: [],
          loading: false,
          items: {
            1: {
              id: 1,
              amount: 1,
              currency_id: 1,
              status: 'status',
              gateway: 'Gateway',
              created_at: '2020-12-12',
            },
          },
          total: 1,
        },
        currencies: {
          loading: false,
          ids: [1],
          req: [],
          items: {
            1: { id: 1, iso_code: 'INR' },
          },
          total: 1,
        },
      });
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should change the page', (done) => {
      const wrapper = mount(
        <Provider store={store}>
          <PaymentList />
        </Provider>,
      );
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
