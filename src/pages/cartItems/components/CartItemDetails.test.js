import React from 'react';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';

import '../../../matchMedia.mock';
import CartItemDetails from './CartItemDetails';
import { getProduct } from '../../../actions/products';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('../../../actions/products', () => ({
  getProduct: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
}));

describe('Cart Item Details component', () => {
  let store;
  let mockedDispatch;
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
              product_id: 1,
              created_at: '2020-12-12',
            },
          },
          total: 1,
        },
        products: {
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
              title: 'Product',
              currency_id: 1,
              tags: [1],
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
        tags: {
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
              title: 'Tag',
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
          <CartItemDetails></CartItemDetails>
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should render the component when loading', () => {
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
              product_id: 1,
              created_at: '2020-12-12',
            },
          },
          total: 1,
        },
        products: {
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
              title: 'Product',
              currency_id: 1,
              tags: [1],
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
        tags: {
          loading: false,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
      });
      const tree = mount(
        <Provider store={store}>
          <CartItemDetails></CartItemDetails>
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
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
              product_id: 1,
              created_at: '2020-12-12',
            },
          },
          total: 1,
        },
        products: {
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
              title: 'Product',
              currency_id: 1,
              tags: [1],
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
        tags: {
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
              title: 'Tag',
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

    it('should call getProduct action', () => {
      getProduct.mockReset();
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CartItemDetails />
          </Provider>,
        );
      });
      expect(getProduct).toHaveBeenCalledWith(1);
    });
  });
});
