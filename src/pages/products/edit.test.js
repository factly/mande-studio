import React from 'react';
import { useDispatch, Provider, useSelector } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';

import '../../matchMedia.mock';
import EditProduct from './edit';
import * as actions from '../../actions/products';
import ProductEditForm from './components/ProductCreateForm';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
}));

jest.mock('../../actions/products', () => ({
  getProduct: jest.fn(),
  updateProduct: jest.fn(),
}));

describe('Product edit component', () => {
  let store = mockStore({
    products: {
      loading: false,
      ids: [1, 2],
      req: [],
      items: {
        1: {
          id: 1,
          title: 'title',
          slug: 'slug',
          price: 100,
          status: 'status',
          tags: [1],
          currency_id: 1,
          created_at: '2020-12-12',
        },
        2: {
          id: 2,
          title: 'title',
          slug: 'slug',
          price: 100,
          status: 'status',
          tags: [],
          currency_id: 1,
          created_at: '2020-12-12',
        },
      },
      total: 2,
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
    tags: {
      loading: false,
      ids: [1],
      req: [],
      items: {
        1: { id: 1, title: 'tag1' },
      },
      total: 1,
    },
    datasets: {
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    },
  });
  store.dispatch = jest.fn(() => ({}));

  const mockedDispatch = jest.fn();
  useDispatch.mockReturnValue(mockedDispatch);

  describe('snapshot testing', () => {
    it('should render the component', () => {
      const tree = mount(
        <Provider store={store}>
          <EditProduct />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should match when loading', () => {
      store = mockStore({
        products: {
          loading: true,
          ids: [1],
          req: [],
          items: {
            1: {
              id: 1,
              title: 'title',
              slug: 'slug',
              price: 100,
              status: 'status',
              tags: [1],
              currency_id: 1,
              created_at: '2020-12-12',
            },
          },
          total: 1,
        },
      });
      const tree = mount(
        <Provider store={store}>
          <EditProduct />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    beforeEach(() => {
      store = mockStore({
        products: {
          loading: false,
          ids: [1, 2],
          req: [],
          items: {
            1: {
              id: 1,
              title: 'title',
              slug: 'slug',
              price: 100,
              status: 'status',
              tags: [1],
              currency_id: 1,
              created_at: '2020-12-12',
            },
            2: {
              id: 2,
              title: 'title',
              slug: 'slug',
              price: 100,
              status: 'status',
              tags: [],
              currency_id: 1,
              created_at: '2020-12-12',
            },
          },
          total: 2,
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
        tags: {
          loading: false,
          ids: [1],
          req: [],
          items: {
            1: { id: 1, title: 'tag1' },
          },
          total: 1,
        },
        datasets: {
          loading: false,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
      });
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should call get action', () => {
      actions.getProduct.mockReset();
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditProduct />
          </Provider>,
        );
      });
      expect(actions.getProduct).toHaveBeenCalledWith('1');
    });
    it('should call updateTag', () => {
      actions.updateProduct.mockReset();
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditProduct />
          </Provider>,
        );
      });
      wrapper.find(ProductEditForm).props().onSubmit({ test: 'test' });
      expect(actions.updateProduct).toHaveBeenCalledWith('1', { test: 'test' });
    });
  });
});
