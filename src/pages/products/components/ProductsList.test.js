import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Popconfirm, Button, List, Card } from 'antd';

import '../../../matchMedia.mock';
import ProductList from './ProductsList';
import { loadProducts, deleteProduct } from '../../../actions/products';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('../../../actions/products', () => ({
  loadProducts: jest.fn(),
  deleteProduct: jest.fn(),
}));

describe('Products List component', () => {
  let store;
  let mockedDispatch;
  const product = {
    id: 1,
    title: 'title',
    slug: 'slug',
    price: 100,
    status: 'status',
    tags: [1],
    currency_id: 1,
    created_at: '2020-12-12',
  };

  describe('snapshot testing', () => {
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
      });
      store.dispatch = jest.fn(() => ({}));
      mockedDispatch = jest.fn();
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should render the component', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <BrowserRouter>
              <ProductList />
            </BrowserRouter>
          </Provider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component when loading', () => {
      store = mockStore({
        products: {
          loading: true,
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
      });
      const tree = renderer
        .create(
          <Provider store={store}>
            <BrowserRouter>
              <ProductList />
            </BrowserRouter>
          </Provider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component with products', () => {
      const tree = mount(
        <Provider store={store}>
          <BrowserRouter>
            <ProductList />
          </BrowserRouter>
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(loadProducts).toHaveBeenCalledWith(1, 5);
    });
  });
  describe('component testing', () => {
    beforeEach(() => {
      jest.clearAllMocks();
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
      });
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should change the page', () => {
      const wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <ProductList />
          </BrowserRouter>
        </Provider>,
      );
      const list = wrapper.find(List);
      list.props().pagination.onChange(2);
      wrapper.update();
      const updatedList = wrapper.find(List);
      expect(updatedList.props().pagination.current).toEqual(2);
    });
    it('should edit product', () => {
      const historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
      };
      const wrapper = mount(
        <Provider store={store}>
          <Router history={historyMock}>
            <ProductList />
          </Router>
        </Provider>,
      );
      const card = wrapper.find(Card).at(0);
      const button = card.find('li').at(0).find('span').at(1);
      button.simulate('click');
      expect(historyMock.push).toHaveBeenCalledWith('/products/1/edit');
    });
    it('should delete product', () => {
      const wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <ProductList />
          </BrowserRouter>
        </Provider>,
      );
      const card = wrapper.find(Card).at(0);
      const button = card.find('li').at(1).find('span').at(1);

      button.simulate('click');
      const popconfirm = wrapper.find(Popconfirm);
      popconfirm
        .findWhere((item) => item.type() === 'button' && item.text() === 'OK')
        .simulate('click');
      expect(deleteProduct).toHaveBeenCalled();
      expect(deleteProduct).toHaveBeenCalledWith(1);
      expect(loadProducts).toHaveBeenCalledWith(1, 5);
    });
    it('should have no delete and edit buttons', () => {
      const wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <ProductList />
          </BrowserRouter>
          ,
        </Provider>,
      );
      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
  });
});
