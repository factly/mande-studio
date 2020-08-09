import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../utils/axios';
import * as actions from './catalogs';
import * as types from '../constants/catalogs';
import { ADD_PRODUCTS } from '../constants/products';
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

describe('catalogs actions', () => {
  it('should create an action to set loading to true', () => {
    const startLoadingAction = {
      type: types.SET_CATALOG_LOADING,
      payload: { loading: true },
    };
    expect(actions.setLoading(true)).toEqual(startLoadingAction);
  });
  it('should create an action to set loading to false', () => {
    const stopLoadingAction = {
      type: types.SET_CATALOG_LOADING,
      payload: { loading: false },
    };
    expect(actions.setLoading(false)).toEqual(stopLoadingAction);
  });
  it('should create an action to add single catalog with products', () => {
    const catalog = { id: 1, catalog: 'tester 1', products: [{ id: 11, name: 'Product 1' }] };

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
        type: ADD_PRODUCTS,
        payload: { products: { 11: { id: 11, name: 'Product 1', tags: [] } } },
      },
      {
        type: types.ADD_CATALOG,
        payload: {
          catalog: { id: 1, catalog: 'tester 1', products: [11] },
        },
      },
    ];

    const store = mockStore({ catalogs: initialState });

    store.dispatch(actions.addCatalog(catalog));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add single catalog without products', () => {
    const catalog = { id: 1, catalog: 'tester 1' };

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
        type: ADD_PRODUCTS,
        payload: { products: {} },
      },
      {
        type: types.ADD_CATALOG,
        payload: {
          catalog: { id: 1, catalog: 'tester 1', products: [] },
        },
      },
    ];

    const store = mockStore({ catalogs: initialState });

    store.dispatch(actions.addCatalog(catalog));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add catalogs with products', () => {
    const data = [
      { id: 1, catalog: 'tester 1', products: [{ id: 11, name: 'Product 1' }] },
      { id: 2, catalog: 'testing 2' },
    ];

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
        type: ADD_PRODUCTS,
        payload: { products: { 11: { id: 11, name: 'Product 1', tags: [] } } },
      },
      {
        type: types.ADD_CATALOGS,
        payload: {
          catalogs: {
            1: { id: 1, catalog: 'tester 1', products: [11] },
            2: { id: 2, catalog: 'testing 2', products: [] },
          },
        },
      },
    ];

    const store = mockStore({ catalogs: initialState });

    store.dispatch(actions.addCatalogs(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add catalogs without products', () => {
    const data = [
      { id: 1, catalog: 'tester 1' },
      { id: 2, catalog: 'testing 2' },
    ];

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
        type: ADD_PRODUCTS,
        payload: { products: {} },
      },
      {
        type: types.ADD_CATALOGS,
        payload: {
          catalogs: {
            1: { id: 1, catalog: 'tester 1', products: [] },
            2: { id: 2, catalog: 'testing 2', products: [] },
          },
        },
      },
    ];

    const store = mockStore({ catalogs: initialState });

    store.dispatch(actions.addCatalogs(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add catalogs request', () => {
    const req = { page: 1, limit: 5, ids: [1, 2, 3, 4, 5] };
    const addCatalogsRequestAction = {
      type: types.SET_CATALOG_REQUEST,
      payload: { req, total: 5 },
    };
    expect(actions.setCatalogRequest(req, 5)).toEqual(addCatalogsRequestAction);
  });
  it('should create an action to set ids', () => {
    const setCatalgoIdsRequest = {
      type: types.SET_CATALOG_IDS,
      payload: { ids: [1, 2, 3] },
    };
    expect(actions.setCatalogIds([1, 2, 3])).toEqual(setCatalgoIdsRequest);
  });
  it('should create an action to reset catalogs', () => {
    const resetCatalogRequest = {
      type: types.RESET_CATALOG,
    };
    expect(actions.resetCatalog()).toEqual(resetCatalogRequest);
  });
  it('should create actions to load catalogs when req is not in state', () => {
    const catalogs = [{ id: 1, name: 'Catalog' }];
    const resp = { data: { nodes: catalogs, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_CATALOG_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_CATALOG_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
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
        type: ADD_PRODUCTS,
        payload: { products: {} },
      },
      {
        type: types.ADD_CATALOGS,
        payload: { catalogs: { 1: { id: 1, name: 'Catalog', products: [] } } },
      },
      {
        type: types.SET_CATALOG_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_CATALOG_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ catalogs: initialState });
    store
      .dispatch(actions.loadCatalogs(1, 5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/catalogs?page=1&limit=5` });
      });
  });
  it('should create actions to load catalogs when req is in state', () => {
    axios.mockRestore();
    const expectedActions = [
      {
        type: types.SET_CATALOG_IDS,
        payload: { ids: [1] },
      },
    ];

    const store = mockStore({
      catalogs: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Catalog' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.loadCatalogs(1, 5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).not.toHaveBeenCalled();
      });
  });
  it('should create actions to create catalog', () => {
    const catalog = { name: 'Catalog' };
    const resp = { data: catalog };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_CATALOG_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_CATALOG,
      },
      {
        type: types.SET_CATALOG_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ catalogs: initialState });
    store
      .dispatch(actions.createCatalog(catalog))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'post', url: `/catalogs`, data: catalog });
      });
  });
  it('should create actions to update catalog with product', () => {
    const catalog = { id: 1, catalog: 'tester 1', products: [{ id: 11, name: 'Product 1' }] };
    const resp = { data: catalog };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_CATALOG_LOADING,
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
        type: ADD_PRODUCTS,
        payload: { products: { 11: { id: 11, name: 'Product 1', tags: [] } } },
      },
      {
        type: types.ADD_CATALOG,
        payload: {
          catalog: { id: 1, catalog: 'tester 1', products: [11] },
        },
      },
      {
        type: types.SET_CATALOG_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ catalogs: initialState });
    store
      .dispatch(actions.updateCatalog(1, catalog))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'put', url: `/catalogs/1`, data: catalog });
      });
  });
  it('should create actions to update catalog without product', () => {
    const catalog = { id: 1, catalog: 'tester 1', products: [] };
    const resp = { data: catalog };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_CATALOG_LOADING,
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
        type: ADD_PRODUCTS,
        payload: { products: {} },
      },
      {
        type: types.ADD_CATALOG,
        payload: {
          catalog: { id: 1, catalog: 'tester 1', products: [] },
        },
      },
      {
        type: types.SET_CATALOG_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ catalogs: initialState });
    store
      .dispatch(actions.updateCatalog(1, catalog))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'put', url: `/catalogs/1`, data: catalog });
      });
  });
  it('should create actions to delete catalog success', () => {
    axios.mockRestore();
    axios.mockResolvedValueOnce();

    const expectedActions = [
      {
        type: types.SET_CATALOG_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_CATALOG,
      },
      {
        type: types.SET_CATALOG_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ catalogs: initialState });
    store
      .dispatch(actions.deleteCatalog(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'delete', url: `/catalogs/1` });
      });
  });
  it('should create actions to get catalog by id when catalog is in state', () => {
    axios.mockRestore();
    const store = mockStore({
      catalogs: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Catalog' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.getCatalog(1))
      .then(() => {
        expect(store.getActions()).toEqual([]);
      })
      .then(() => {
        expect(axios).not.toHaveBeenCalled();
      });
  });
  it('should create actions to get catalog by id when catalog is not in state', () => {
    const id = 1;
    const catalog = { id, name: 'Catalog' };
    const resp = { data: catalog };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_CATALOG_LOADING,
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
        type: ADD_PRODUCTS,
        payload: { products: {} },
      },
      {
        type: types.ADD_CATALOG,
        payload: { catalog: { id, name: 'Catalog', products: [] } },
      },
      {
        type: types.SET_CATALOG_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ catalogs: initialState });
    store
      .dispatch(actions.getCatalog(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/catalogs/1` });
      });
  });
});
