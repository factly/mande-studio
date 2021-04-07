import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../utils/axios';
import * as actions from './formats';
import * as types from '../constants/formats';

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

describe('formats actions', () => {
  it('should create an action to set loading to true', () => {
    const startLoadingAction = {
      type: types.SET_FORMAT_LOADING,
      payload: { loading: true },
    };
    expect(actions.setLoading(true)).toEqual(startLoadingAction);
  });
  it('should create an action to set loading to false', () => {
    const stopLoadingAction = {
      type: types.SET_FORMAT_LOADING,
      payload: { loading: false },
    };
    expect(actions.setLoading(false)).toEqual(stopLoadingAction);
  });
  it('should create an action to add single format', () => {
    const format = { id: 1, format: 'tester 1' };

    const expectedActions = [
      {
        type: types.ADD_FORMAT,
        payload: {
          format: { id: 1, format: 'tester 1' },
        },
      },
    ];

    const store = mockStore({ formats: initialState });

    store.dispatch(actions.addFormat(format));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add formats without products', () => {
    const data = [
      { id: 1, format: 'tester 1' },
      { id: 2, format: 'testing 2' },
    ];

    const expectedActions = [
      {
        type: types.ADD_FORMATS,
        payload: {
          formats: {
            1: { id: 1, format: 'tester 1' },
            2: { id: 2, format: 'testing 2' },
          },
        },
      },
    ];

    const store = mockStore({ formats: initialState });

    store.dispatch(actions.addFormats(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add formats request', () => {
    const req = { page: 1, limit: 5, ids: [1, 2, 3, 4, 5] };
    const addFormatsRequestAction = {
      type: types.SET_FORMAT_REQUEST,
      payload: { req, total: 5 },
    };
    expect(actions.setFormatRequest(req, 5)).toEqual(addFormatsRequestAction);
  });
  it('should create an action to set ids', () => {
    const setCatalgoIdsRequest = {
      type: types.SET_FORMAT_IDS,
      payload: { ids: [1, 2, 3] },
    };
    expect(actions.setFormatIds([1, 2, 3])).toEqual(setCatalgoIdsRequest);
  });
  it('should create an action to reset formats', () => {
    const resetFormatRequest = {
      type: types.RESET_FORMAT,
    };
    expect(actions.resetFormat()).toEqual(resetFormatRequest);
  });
  it('should create actions to load formats when req is not in state', () => {
    const formats = [{ id: 1, name: 'Format' }];
    const resp = { data: { nodes: formats, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_FORMAT_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_FORMAT_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        type: types.ADD_FORMATS,
        payload: { formats: { 1: { id: 1, name: 'Format' } } },
      },
      {
        type: types.SET_FORMAT_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_FORMAT_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ formats: initialState });
    store
      .dispatch(actions.loadFormats(1, 5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/formats?page=1&limit=5` });
      });
  });
  it('should create actions to load formats with no parameters', () => {
    const formats = [{ id: 1, name: 'Format' }];
    const resp = { data: { nodes: formats, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_FORMAT_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_FORMAT_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        type: types.ADD_FORMATS,
        payload: { formats: { 1: { id: 1, name: 'Format' } } },
      },
      {
        type: types.SET_FORMAT_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_FORMAT_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ formats: initialState });
    store
      .dispatch(actions.loadFormats())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/formats?page=1&limit=5` });
      });
  });
  it('should create actions to load formats when req is in state', () => {
    const formats = [{ id: 1, name: 'Format' }];
    const resp = { data: { nodes: formats, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);
    const expectedActions = [
      {
        type: types.SET_FORMAT_LOADING,

        payload: {
          loading: true,
        },
      },
    ];

    const store = mockStore({
      formats: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Format' } },
        total: 1,
      },
    });
    store.dispatch(actions.loadFormats(1, 5));
    expect(store.getActions()).toEqual(expectedActions);
    expect(axios).toHaveBeenCalled();
  });
  it('should create actions to create format', () => {
    const format = { name: 'Format' };
    const resp = { data: format };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_FORMAT_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_FORMAT,
      },
      {
        type: types.SET_FORMAT_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ formats: initialState });
    store
      .dispatch(actions.createFormat(format))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'post', url: `/formats`, data: format });
      });
  });
  it('should create actions to update format without product', () => {
    const format = { id: 1, format: 'tester 1' };
    const resp = { data: format };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_FORMAT_LOADING,
        payload: { loading: true },
      },
      {
        type: types.ADD_FORMAT,
        payload: {
          format: { id: 1, format: 'tester 1' },
        },
      },
      {
        type: types.SET_FORMAT_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ formats: initialState });
    store
      .dispatch(actions.updateFormat(1, format))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'put', url: `/formats/1`, data: format });
      });
  });
  it('should create actions to delete format success', () => {
    axios.mockRestore();
    axios.mockResolvedValueOnce();

    const expectedActions = [
      {
        type: types.SET_FORMAT_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_FORMAT,
      },
      {
        type: types.SET_FORMAT_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ formats: initialState });
    store
      .dispatch(actions.deleteFormat(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'delete', url: `/formats/1` });
      });
  });
  it('should create actions to get format by id when format is in state', () => {
    axios.mockRestore();
    const store = mockStore({
      formats: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Format' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.getFormat(1))
      .then(() => {
        expect(store.getActions()).toEqual([]);
      })
      .then(() => {
        expect(axios).not.toHaveBeenCalled();
      });
  });
  it('should create actions to get format by id when format is not in state', () => {
    const id = 1;
    const format = { id, name: 'Format' };
    const resp = { data: format };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_FORMAT_LOADING,
        payload: { loading: true },
      },
      {
        type: types.ADD_FORMAT,
        payload: { format: { id, name: 'Format' } },
      },
      {
        type: types.SET_FORMAT_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ formats: initialState });
    store
      .dispatch(actions.getFormat(id))
      .then(() => expect(store.getActions()).toEqual(expectedActions))
      .then(() => expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/formats/1` }));
  });
});
