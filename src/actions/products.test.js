import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../utils/axios';
import * as actions from './products';
import * as types from '../constants/products';
import { ADD_CURRENCIES } from '../constants/currencies';
import { ADD_TAGS } from '../constants/tags';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../utils/axios', () => jest.fn());

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('products actions', () => {
  it('should create an action to set loading to true', () => {
    const startLoadingAction = {
      type: types.SET_PRODUCT_LOADING,
      payload: { loading: true },
    };
    expect(actions.setLoading(true)).toEqual(startLoadingAction);
  });
  it('should create an action to set loading to false', () => {
    const stopLoadingAction = {
      type: types.SET_PRODUCT_LOADING,
      payload: { loading: false },
    };
    expect(actions.setLoading(false)).toEqual(stopLoadingAction);
  });
  it('should create an action to add single product with tags and currencies', () => {
    const product = {
      id: 1,
      product: 'tester 1',
      tags: [{ id: 11, tag: 'Tag 11' }],
      currency: { id: 100, currency: 'Currency 100' },
    };

    const expectedActions = [
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {
            100: { id: 100, currency: 'Currency 100' },
          },
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: { 11: { id: 11, tag: 'Tag 11' } },
        },
      },
      {
        type: types.ADD_PRODUCT,
        payload: {
          product: { id: 1, product: 'tester 1', tags: [11] },
        },
      },
    ];

    const store = mockStore({ products: initialState });

    store.dispatch(actions.addProduct(product));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add single product without tags and currencies', () => {
    const product = { id: 1, product: 'tester 1' };

    const expectedActions = [
      {
        type: ADD_CURRENCIES,
        payload: { currencies: {} },
      },
      {
        type: ADD_TAGS,
        payload: { tags: {} },
      },
      {
        type: types.ADD_PRODUCT,
        payload: {
          product: { id: 1, product: 'tester 1', tags: [] },
        },
      },
    ];

    const store = mockStore({ products: initialState });

    store.dispatch(actions.addProduct(product));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add products with tags and currencies', () => {
    const data = [
      {
        id: 1,
        product: 'tester 1',
        tags: [{ id: 11, tag: 'Tag 11' }],
        currency: { id: 100, currency: 'Currency 100' },
      },
      {
        id: 2,
        product: 'testing 2',
        tags: [{ id: 21, tag: 'Tag 21' }],
        currency: { id: 200, currency: 'Currency 200' },
      },
    ];

    const expectedActions = [
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {
            100: { id: 100, currency: 'Currency 100' },
            200: { id: 200, currency: 'Currency 200' },
          },
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: { 11: { id: 11, tag: 'Tag 11' }, 21: { id: 21, tag: 'Tag 21' } },
        },
      },
      {
        type: types.ADD_PRODUCTS,
        payload: {
          products: {
            1: { id: 1, product: 'tester 1', tags: [11] },
            2: { id: 2, product: 'testing 2', tags: [21] },
          },
        },
      },
    ];

    const store = mockStore({ products: initialState });

    store.dispatch(actions.addProducts(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add products without tags and currencies', () => {
    const data = [
      { id: 1, product: 'tester 1' },
      { id: 2, product: 'testing 2' },
    ];

    const expectedActions = [
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {},
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: {},
        },
      },
      {
        type: types.ADD_PRODUCTS,
        payload: {
          products: {
            1: { id: 1, product: 'tester 1', tags: [] },
            2: { id: 2, product: 'testing 2', tags: [] },
          },
        },
      },
    ];

    const store = mockStore({ products: initialState });

    store.dispatch(actions.addProducts(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add products request', () => {
    const req = { page: 1, limit: 5, ids: [1, 2, 3, 4, 5] };
    const addProductsRequestAction = {
      type: types.SET_PRODUCT_REQUEST,
      payload: { req, total: 5 },
    };
    expect(actions.setProductRequest(req, 5)).toEqual(addProductsRequestAction);
  });
  it('should create an action to set ids', () => {
    const setCatalgoIdsRequest = {
      type: types.SET_PRODUCT_IDS,
      payload: { ids: [1, 2, 3] },
    };
    expect(actions.setProductIds([1, 2, 3])).toEqual(setCatalgoIdsRequest);
  });
  it('should create an action to reset products', () => {
    const resetProductRequest = {
      type: types.RESET_PRODUCT,
    };
    expect(actions.resetProduct()).toEqual(resetProductRequest);
  });
  it('should create actions to load products when req is not in state', () => {
    const products = [{ id: 1, name: 'Product' }];
    const resp = { data: { nodes: products, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_PRODUCT_LOADING,
        payload: { loading: true },
      },
      {
        type: ADD_CURRENCIES,
        payload: { currencies: {} },
      },
      {
        type: ADD_TAGS,
        payload: { tags: {} },
      },
      {
        type: types.ADD_PRODUCTS,
        payload: { products: { 1: { id: 1, name: 'Product', tags: [] } } },
      },
      {
        type: types.SET_PRODUCT_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_PRODUCT_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        type: types.SET_PRODUCT_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ products: initialState });
    store
      .dispatch(actions.loadProducts(1, 5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/products?page=1&limit=5` });
      });
  });
  it('should create actions to load products when req is in state', () => {
    axios.mockRestore();
    const expectedActions = [
      {
        type: types.SET_PRODUCT_IDS,
        payload: { ids: [1] },
      },
    ];

    const store = mockStore({
      products: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Product' } },
        total: 1,
      },
    });
    store.dispatch(actions.loadProducts(1, 5));
    expect(store.getActions()).toEqual(expectedActions);
    expect(axios).not.toHaveBeenCalled();
  });
  it('should create actions to create product', () => {
    const product = { name: 'Product' };
    const resp = { data: product };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_PRODUCT_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_PRODUCT,
      },
      {
        type: types.SET_PRODUCT_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ products: initialState });
    store
      .dispatch(actions.createProduct(product))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'post', url: `/products`, data: product });
      });
  });
  it('should create actions to update product without product', () => {
    const product = { id: 1, product: 'tester 1' };
    const resp = { data: product };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_PRODUCT_LOADING,
        payload: { loading: true },
      },
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {},
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: {},
        },
      },
      {
        type: types.ADD_PRODUCT,
        payload: {
          product: { id: 1, product: 'tester 1', tags: [] },
        },
      },
      {
        type: types.SET_PRODUCT_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ products: initialState });
    store
      .dispatch(actions.updateProduct(1, product))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'put', url: `/products/1`, data: product });
      });
  });
  it('should create actions to delete product success', () => {
    axios.mockRestore();
    axios.mockResolvedValueOnce();

    const expectedActions = [
      {
        type: types.SET_PRODUCT_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_PRODUCT,
      },
      {
        type: types.SET_PRODUCT_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ products: initialState });
    store
      .dispatch(actions.deleteProduct(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'delete', url: `/products/1` });
      });
  });
  it('should create actions to get product by id when product is in state', () => {
    axios.mockRestore();
    const store = mockStore({
      products: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Product' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.getProduct(1))
      .then(() => {
        expect(store.getActions()).toEqual([]);
      })
      .then(() => {
        expect(axios).not.toHaveBeenCalled();
      });
  });
  it('should create actions to get product by id when product is not in state', () => {
    const id = 1;
    const product = { id, name: 'Product' };
    const resp = { data: product };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_PRODUCT_LOADING,
        payload: { loading: true },
      },
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {},
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: {},
        },
      },
      {
        type: types.ADD_PRODUCT,
        payload: { product: { id, name: 'Product', tags: [] } },
      },
      {
        type: types.SET_PRODUCT_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ products: initialState });
    store
      .dispatch(actions.getProduct(id))
      .then(() => expect(store.getActions()).toEqual(expectedActions))
      .then(() => expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/products/1` }));
  });
});
