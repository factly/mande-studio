import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../utils/axios';
import * as actions from './tags';
import * as types from '../constants/tags';

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

describe('tags actions', () => {
  it('should create an action to set loading to true', () => {
    const startLoadingAction = {
      type: types.SET_TAG_LOADING,
      payload: { loading: true },
    };
    expect(actions.setLoading(true)).toEqual(startLoadingAction);
  });
  it('should create an action to set loading to false', () => {
    const stopLoadingAction = {
      type: types.SET_TAG_LOADING,
      payload: { loading: false },
    };
    expect(actions.setLoading(false)).toEqual(stopLoadingAction);
  });
  it('should create an action to add single tag', () => {
    const tag = { id: 1, tag: 'tester 1' };

    const expectedActions = [
      {
        type: types.ADD_TAG,
        payload: {
          tag: { id: 1, tag: 'tester 1' },
        },
      },
    ];

    const store = mockStore({ tags: initialState });

    store.dispatch(actions.addTag(tag));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add tags without products', () => {
    const data = [
      { id: 1, tag: 'tester 1' },
      { id: 2, tag: 'testing 2' },
    ];

    const expectedActions = [
      {
        type: types.ADD_TAGS,
        payload: {
          tags: {
            1: { id: 1, tag: 'tester 1' },
            2: { id: 2, tag: 'testing 2' },
          },
        },
      },
    ];

    const store = mockStore({ tags: initialState });

    store.dispatch(actions.addTags(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add tags request', () => {
    const req = { page: 1, limit: 5, ids: [1, 2, 3, 4, 5] };
    const addTagsRequestAction = {
      type: types.SET_TAG_REQUEST,
      payload: { req, total: 5 },
    };
    expect(actions.setTagRequest(req, 5)).toEqual(addTagsRequestAction);
  });
  it('should create an action to set ids', () => {
    const setCatalgoIdsRequest = {
      type: types.SET_TAG_IDS,
      payload: { ids: [1, 2, 3] },
    };
    expect(actions.setTagIds([1, 2, 3])).toEqual(setCatalgoIdsRequest);
  });
  it('should create an action to reset tags', () => {
    const resetTagRequest = {
      type: types.RESET_TAG,
    };
    expect(actions.resetTag()).toEqual(resetTagRequest);
  });
  it('should create actions to load tags when req is not in state', () => {
    const tags = [{ id: 1, name: 'Tag' }];
    const resp = { data: { nodes: tags, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_TAG_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_TAG_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        type: types.ADD_TAGS,
        payload: { tags: { 1: { id: 1, name: 'Tag' } } },
      },
      {
        type: types.SET_TAG_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_TAG_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ tags: initialState });
    store
      .dispatch(actions.loadTags(1, 5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/tags?page=1&limit=5` });
      });
  });
  it('should create actions to load tags with no parameters', () => {
    const tags = [{ id: 1, name: 'Tag' }];
    const resp = { data: { nodes: tags, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_TAG_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_TAG_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        type: types.ADD_TAGS,
        payload: { tags: { 1: { id: 1, name: 'Tag' } } },
      },
      {
        type: types.SET_TAG_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_TAG_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ tags: initialState });
    store
      .dispatch(actions.loadTags())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/tags?page=1&limit=5` });
      });
  });
  it('should create actions to load tags when req is in state', () => {
    const tags = [{ id: 1, name: 'Tag' }];
    const resp = { data: { nodes: tags, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);
    const expectedActions = [
      {
        type: types.SET_TAG_LOADING,
        payload: { loading: true },
      },
    ];

    const store = mockStore({
      tags: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Tag' } },
        total: 1,
      },
    });
    store.dispatch(actions.loadTags(1, 5));
    expect(store.getActions()).toEqual(expectedActions);
    expect(axios).toHaveBeenCalled();
  });
  it('should create actions to create tag', () => {
    const tag = { name: 'Tag' };
    const resp = { data: tag };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_TAG_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_TAG,
      },
      {
        type: types.SET_TAG_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ tags: initialState });
    store
      .dispatch(actions.createTag(tag))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'post', url: `/tags`, data: tag });
      });
  });
  it('should create actions to update tag without product', () => {
    const tag = { id: 1, tag: 'tester 1' };
    const resp = { data: tag };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_TAG_LOADING,
        payload: { loading: true },
      },
      {
        type: types.ADD_TAG,
        payload: {
          tag: { id: 1, tag: 'tester 1' },
        },
      },
      {
        type: types.SET_TAG_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ tags: initialState });
    store
      .dispatch(actions.updateTag(1, tag))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'put', url: `/tags/1`, data: tag });
      });
  });
  it('should create actions to delete tag success', () => {
    axios.mockRestore();
    axios.mockResolvedValueOnce();

    const expectedActions = [
      {
        type: types.SET_TAG_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_TAG,
      },
      {
        type: types.SET_TAG_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ tags: initialState });
    store
      .dispatch(actions.deleteTag(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'delete', url: `/tags/1` });
      });
  });
  it('should create actions to get tag by id when tag is in state', () => {
    axios.mockRestore();
    const store = mockStore({
      tags: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Tag' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.getTag(1))
      .then(() => {
        expect(store.getActions()).toEqual([]);
      })
      .then(() => {
        expect(axios).not.toHaveBeenCalled();
      });
  });
  it('should create actions to get tag by id when tag is not in state', () => {
    const id = 1;
    const tag = { id, name: 'Tag' };
    const resp = { data: tag };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_TAG_LOADING,
        payload: { loading: true },
      },
      {
        type: types.ADD_TAG,
        payload: { tag: { id, name: 'Tag' } },
      },
      {
        type: types.SET_TAG_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ tags: initialState });
    store
      .dispatch(actions.getTag(id))
      .then(() => expect(store.getActions()).toEqual(expectedActions))
      .then(() => expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/tags/1` }));
  });
});
