import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../utils/axios';
import * as actions from './media';
import * as types from '../constants/media';

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

describe('media actions', () => {
  it('should create an action to set loading to true', () => {
    const startLoadingAction = {
      type: types.SET_MEDIUM_LOADING,
      payload: { loading: true },
    };
    expect(actions.setLoading(true)).toEqual(startLoadingAction);
  });
  it('should create an action to set loading to false', () => {
    const stopLoadingAction = {
      type: types.SET_MEDIUM_LOADING,
      payload: { loading: false },
    };
    expect(actions.setLoading(false)).toEqual(stopLoadingAction);
  });
  it('should create an action to add single medium', () => {
    const medium = { id: 1, medium: 'tester 1' };

    const expectedActions = [
      {
        type: types.ADD_MEDIUM,
        payload: {
          medium: { id: 1, medium: 'tester 1' },
        },
      },
    ];

    const store = mockStore({ media: initialState });

    store.dispatch(actions.addMedium(medium));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add media without products', () => {
    const data = [
      { id: 1, medium: 'tester 1' },
      { id: 2, medium: 'testing 2' },
    ];

    const expectedActions = [
      {
        type: types.ADD_MEDIA,
        payload: {
          media: {
            1: { id: 1, medium: 'tester 1' },
            2: { id: 2, medium: 'testing 2' },
          },
        },
      },
    ];

    const store = mockStore({ media: initialState });

    store.dispatch(actions.addMedia(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add media request', () => {
    const req = { page: 1, limit: 5, ids: [1, 2, 3, 4, 5] };
    const addMediaRequestAction = {
      type: types.SET_MEDIUM_REQUEST,
      payload: { req, total: 5 },
    };
    expect(actions.setMediumRequest(req, 5)).toEqual(addMediaRequestAction);
  });
  it('should create an action to set ids', () => {
    const setCatalgoIdsRequest = {
      type: types.SET_MEDIUM_IDS,
      payload: { ids: [1, 2, 3] },
    };
    expect(actions.setMediumIds([1, 2, 3])).toEqual(setCatalgoIdsRequest);
  });
  it('should create an action to reset media', () => {
    const resetMediumRequest = {
      type: types.RESET_MEDIUM,
    };
    expect(actions.resetMedium()).toEqual(resetMediumRequest);
  });
  it('should create actions to load media when req is not in state', () => {
    const media = [{ id: 1, name: 'Medium' }];
    const resp = { data: { nodes: media, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_MEDIUM_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_MEDIUM_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        type: types.ADD_MEDIA,
        payload: { media: { 1: { id: 1, name: 'Medium' } } },
      },
      {
        type: types.SET_MEDIUM_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_MEDIUM_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ media: initialState });
    store
      .dispatch(actions.loadMedia(1, 5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/media?page=1&limit=5` });
      });
  });
  it('should create actions to load media with no parameters', () => {
    const media = [{ id: 1, name: 'Medium' }];
    const resp = { data: { nodes: media, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_MEDIUM_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_MEDIUM_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        type: types.ADD_MEDIA,
        payload: { media: { 1: { id: 1, name: 'Medium' } } },
      },
      {
        type: types.SET_MEDIUM_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_MEDIUM_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ media: initialState });
    store
      .dispatch(actions.loadMedia())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/media?page=1&limit=5` });
      });
  });
  it('should create actions to load media when req is in state', () => {
    const media = [{ id: 1, name: 'Medium' }];
    const resp = { data: { nodes: media, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);
    const expectedActions = [
      {
        type: types.SET_MEDIUM_LOADING,
        payload: { loading: true },
      },
    ];

    const store = mockStore({
      media: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Medium' } },
        total: 1,
      },
    });
    store.dispatch(actions.loadMedia(1, 5));
    expect(store.getActions()).toEqual(expectedActions);
    expect(axios).toHaveBeenCalled();
  });
  it('should create actions to create medium', () => {
    const medium = { name: 'Medium' };
    const resp = { data: medium };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_MEDIUM_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_MEDIUM,
      },
      {
        type: types.SET_MEDIUM_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ media: initialState });
    store
      .dispatch(actions.createMedium(medium))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'post', url: `/media`, data: medium });
      });
  });
  it('should create actions to update medium without product', () => {
    const medium = { id: 1, medium: 'tester 1' };
    const resp = { data: medium };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_MEDIUM_LOADING,
        payload: { loading: true },
      },
      {
        type: types.ADD_MEDIUM,
        payload: {
          medium: { id: 1, medium: 'tester 1' },
        },
      },
      {
        type: types.SET_MEDIUM_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ media: initialState });
    store
      .dispatch(actions.updateMedium(1, medium))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'put', url: `/media/1`, data: medium });
      });
  });
  it('should create actions to delete medium success', () => {
    axios.mockRestore();
    axios.mockResolvedValueOnce();

    const expectedActions = [
      {
        type: types.SET_MEDIUM_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_MEDIUM,
      },
      {
        type: types.SET_MEDIUM_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ media: initialState });
    store
      .dispatch(actions.deleteMedium(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'delete', url: `/media/1` });
      });
  });
  it('should create actions to get medium by id when medium is in state', () => {
    axios.mockRestore();
    const store = mockStore({
      media: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Medium' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.getMedium(1))
      .then(() => {
        expect(store.getActions()).toEqual([]);
      })
      .then(() => {
        expect(axios).not.toHaveBeenCalled();
      });
  });
  it('should create actions to get medium by id when medium is not in state', () => {
    const id = 1;
    const medium = { id, name: 'Medium' };
    const resp = { data: medium };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_MEDIUM_LOADING,
        payload: { loading: true },
      },
      {
        type: types.ADD_MEDIUM,
        payload: { medium: { id, name: 'Medium' } },
      },
      {
        type: types.SET_MEDIUM_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ media: initialState });
    store
      .dispatch(actions.getMedium(id))
      .then(() => expect(store.getActions()).toEqual(expectedActions))
      .then(() => expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/media/1` }));
  });
});
