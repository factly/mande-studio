import React from 'react';
import { useParams } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { useSelector, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';

import '../../../matchMedia.mock';
import OrderDetails from './detail';
import { getOrder } from '../../actions/orders';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('../../actions/orders', () => ({
  getOrder: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));
useParams.mockReturnValue({ id: 1 });

describe('Orders detail component', () => {
  let store;
  let mockedDispatch;
  const order = {
    id: 1,
    payment_id: 1,
    status: 'status',
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
        order: order,
        payments: {
          1: {
            id: 1,
            title: 'payment',
            amount: 100,
            currency_id: 1,
            gateway: 'gateway',
            status: 'status',
          },
        },
        currencies: { 1: { id: 1, iso_code: 'INR' } },
      }));
      const tree = renderer.create(<OrderDetails />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component when no data', () => {
      useSelector.mockImplementation(() => ({
        order: {},
        payments: {
          1: {
            id: 1,
            title: 'payment',
            amount: 100,
            currency_id: 1,
            gateway: 'gateway',
            status: 'status',
          },
        },
        currencies: {},
      }));
      const tree = renderer.create(<OrderDetails />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
  });
  describe('component testing', () => {
    let wrapper;
    beforeEach(async () => {
      jest.clearAllMocks();
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);
      useSelector.mockImplementation(() => ({
        order: order,
        payments: {
          1: {
            id: 1,
            title: 'payment',
            amount: 100,
            currency_id: 1,
            gateway: 'gateway',
            status: 'status',
          },
        },
        currencies: { 1: { id: 1, iso_code: 'INR' } },
      }));
    });
    afterEach(() => {
      act(() => {
        wrapper.unmount();
      });
    });
    it('should render the component', async (done) => {
      await act(async () => {
        wrapper = mount(<OrderDetails />);
      });
      setTimeout(() => {
        expect(getOrder).toHaveBeenCalledWith(1);
        done();
      });
    });
  });
});
