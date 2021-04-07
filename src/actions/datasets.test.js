import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../utils/axios';
import * as actions from './datasets';
import * as types from '../constants/datasets';
import { ADD_CURRENCIES } from '../constants/currencies';
import { ADD_MEDIUM } from '../constants/media';
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

describe('datasets actions', () => {
  it('should create an action to set loading to true', () => {
    const startLoadingAction = {
      type: types.SET_DATASET_LOADING,
      payload: { loading: true },
    };
    expect(actions.setLoading(true)).toEqual(startLoadingAction);
  });
  it('should create an action to set loading to false', () => {
    const stopLoadingAction = {
      type: types.SET_DATASET_LOADING,
      payload: { loading: false },
    };
    expect(actions.setLoading(false)).toEqual(stopLoadingAction);
  });
  it('should create an action to add single dataset', () => {
    const dataset = { id: 1, dataset: 'dataset 1' };

    const expectedActions = [
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {},
        },
      },
      {
        type: ADD_MEDIUM,
        payload: {
          medium: [],
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: {},
        },
      },
      {
        type: types.ADD_DATASET,
        payload: {
          dataset: { id: 1, dataset: 'dataset 1', tags: [] },
        },
      },
    ];

    const store = mockStore({ datasets: initialState });

    store.dispatch(actions.addDataset(dataset));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add datasets', () => {
    const data = [
      { id: 1, dataset: 'dataset 1' },
      { id: 2, dataset: 'dataset 2' },
    ];

    const expectedActions = [
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {},
        },
      },
      {
        type: ADD_MEDIUM,
        payload: {
          medium: [],
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: {},
        },
      },
      {
        type: types.ADD_DATASETS,
        payload: {
          datasets: {
            1: { id: 1, dataset: 'dataset 1', tags: [] },
            2: { id: 2, dataset: 'dataset 2', tags: [] },
          },
        },
      },
    ];

    const store = mockStore({ datasets: initialState });

    store.dispatch(actions.addDatasets(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to add datasets request', () => {
    const req = { page: 1, limit: 5, ids: [1, 2, 3, 4, 5] };
    const addDatasetsRequestAction = {
      type: types.SET_DATASET_REQUEST,
      payload: { req, total: 5 },
    };
    expect(actions.setDatasetRequest(req, 5)).toEqual(addDatasetsRequestAction);
  });
  it('should create an action to set ids', () => {
    const setCatalgoIdsRequest = {
      type: types.SET_DATASET_IDS,
      payload: { ids: [1, 2, 3] },
    };
    expect(actions.setDatasetIds([1, 2, 3])).toEqual(setCatalgoIdsRequest);
  });
  it('should create an action to reset datasets', () => {
    const resetDatasetRequest = {
      type: types.RESET_DATASET,
    };
    expect(actions.resetDataset()).toEqual(resetDatasetRequest);
  });
  it('should create an action to add datasetformat', () => {
    const datasetFormat = { id: 1, format: 'datasetformat 1' };

    const expectedActions = [
      {
        type: types.ADD_DATASET_FORMAT,
        payload: {
          datasetId: 1,
          datasetFormat: { id: 1, format: 'datasetformat 1' },
        },
      },
    ];

    const store = mockStore({ datasets: initialState });

    store.dispatch(actions.addDatasetFormat(1, datasetFormat));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to remove datasetformat', () => {
    const expectedActions = [
      {
        type: types.REMOVE_DATASET_FORMAT,
        payload: {
          datasetId: 1,
          datasetFormatId: 1,
        },
      },
    ];

    const store = mockStore({ datasets: initialState });

    store.dispatch(actions.removeDatasetFormat(1, 1));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create actions to load datasets when req is not in state', () => {
    const datasets = [{ id: 1, name: 'Dataset' }];
    const resp = { data: { nodes: datasets, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_DATASET_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_DATASET_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {},
        },
      },
      {
        type: ADD_MEDIUM,
        payload: {
          medium: [],
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: {},
        },
      },
      {
        type: types.ADD_DATASETS,
        payload: { datasets: { 1: { id: 1, name: 'Dataset', tags: [] } } },
      },
      {
        type: types.SET_DATASET_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_DATASET_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ datasets: initialState });
    store
      .dispatch(actions.loadDatasets(1, 5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/datasets?page=1&limit=5` });
      });
  });
  it('should create actions to load datasets with no parameters', () => {
    const datasets = [{ id: 1, name: 'Dataset' }];
    const resp = { data: { nodes: datasets, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_DATASET_LOADING,
        payload: { loading: true },
      },
      {
        type: types.SET_DATASET_REQUEST,
        payload: {
          req: { page: 1, limit: 5, ids: [1] },
          total: 1,
        },
      },
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {},
        },
      },
      {
        type: ADD_MEDIUM,
        payload: {
          medium: [],
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: {},
        },
      },
      {
        type: types.ADD_DATASETS,
        payload: { datasets: { 1: { id: 1, name: 'Dataset', tags: [] } } },
      },
      {
        type: types.SET_DATASET_IDS,
        payload: { ids: [1] },
      },
      {
        type: types.SET_DATASET_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ datasets: initialState });
    store
      .dispatch(actions.loadDatasets())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/datasets?page=1&limit=5` });
      });
  });
  it('should create actions to load datasets when req is in state', () => {
    const datasets = [{ id: 1, name: 'Dataset' }];
    const resp = { data: { nodes: datasets, total: 1 } };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);
    const expectedActions = [
      {
        type: types.SET_DATASET_LOADING,
        payload: {
          loading: true,
        },
      },
    ];

    const store = mockStore({
      datasets: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Dataset' } },
        total: 1,
      },
    });
    store.dispatch(actions.loadDatasets(1, 5));
    expect(store.getActions()).toEqual(expectedActions);
    expect(axios).toHaveBeenCalled();
  });
  it('should create actions to create dataset', () => {
    const dataset = { name: 'Dataset' };
    const resp = { data: dataset };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_DATASET_LOADING,
        payload: { loading: true },
      },
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {},
        },
      },
      {
        type: ADD_MEDIUM,
        payload: {
          medium: [],
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: {},
        },
      },
      {
        type: types.ADD_DATASET,
        payload: {
          dataset: {
            name: 'Dataset',
            tags: [],
          },
        },
      },
      {
        type: types.SET_DATASET_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ datasets: initialState });
    store
      .dispatch(actions.createDataset(dataset))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'post', url: `/datasets`, data: dataset });
      });
  });
  it('should create actions to create dataset format', () => {
    const datasetFormat = { name: 'Dataset' };
    const resp = { data: datasetFormat };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_DATASET_LOADING,
        payload: { loading: true },
      },
      {
        type: types.ADD_DATASET_FORMAT,
        payload: { datasetId: 1, datasetFormat },
      },
      {
        type: types.SET_DATASET_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ datasets: initialState });
    store
      .dispatch(actions.createDatasetFormat(1, datasetFormat))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({
          method: 'post',
          url: `/datasets/1/format`,
          data: datasetFormat,
        });
      });
  });
  it('should create actions to update dataset', () => {
    const dataset = { id: 1, dataset: 'dataset 1', tags: [] };
    const resp = { data: dataset };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {},
        },
      },
      {
        type: ADD_MEDIUM,
        payload: {
          medium: [],
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: {},
        },
      },
      {
        type: types.ADD_DATASET,
        payload: {
          dataset: { id: 1, dataset: 'dataset 1', tags: [] },
        },
      },
    ];

    const store = mockStore({
      datasets: {
        items: {
          1: {
            id: 1,
            dataset: 'dataset 1',
          },
        },
      },
    });
    store
      .dispatch(actions.updateDataset(1, dataset))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'put', url: `/datasets/1`, data: dataset });
      });
  });
  it('should create actions to update dataset when dataset not found in state', () => {
    const dataset = { id: 1, dataset: 'dataset 1', tags: [] };
    const resp = { data: dataset };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [];

    const store = mockStore({ datasets: initialState });
    store
      .dispatch(actions.updateDataset(1, dataset))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).not.toHaveBeenCalled();
      });
  });
  it('should create actions to delete dataset success', () => {
    axios.mockRestore();
    axios.mockResolvedValueOnce();

    const expectedActions = [
      {
        type: types.SET_DATASET_LOADING,
        payload: { loading: true },
      },
      {
        type: types.RESET_DATASET,
      },
      {
        type: types.SET_DATASET_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ datasets: initialState });
    store
      .dispatch(actions.deleteDataset(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'delete', url: `/datasets/1` });
      });
  });
  it('should create actions to delete dataset format success', () => {
    axios.mockRestore();
    axios.mockResolvedValueOnce();

    const expectedActions = [
      {
        type: types.SET_DATASET_LOADING,
        payload: { loading: true },
      },
      {
        type: types.REMOVE_DATASET_FORMAT,
        payload: { datasetId: 1, datasetFormatId: 2 },
      },
      {
        type: types.SET_DATASET_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ datasets: initialState });
    store
      .dispatch(actions.deleteDatasetFormat(1, 2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(() => {
        expect(axios).toHaveBeenCalledWith({ method: 'delete', url: `/datasets/1/format/2` });
      });
  });
  it('should create actions to get dataset by id when dataset is in state', () => {
    axios.mockRestore();
    const store = mockStore({
      datasets: {
        loading: false,
        ids: [],
        req: [{ page: 1, limit: 5, ids: [1] }],
        items: { 1: { id: 1, name: 'Dataset' } },
        total: 1,
      },
    });
    store
      .dispatch(actions.getDataset(1))
      .then(() => {
        expect(store.getActions()).toEqual([]);
      })
      .then(() => {
        expect(axios).not.toHaveBeenCalled();
      });
  });
  it('should create actions to get dataset by id when dataset is not in state', () => {
    const id = 1;
    const dataset = { id, name: 'Dataset' };
    const resp = { data: dataset };
    axios.mockRestore();
    axios.mockResolvedValueOnce(resp);

    const expectedActions = [
      {
        type: types.SET_DATASET_LOADING,
        payload: { loading: true },
      },
      {
        type: ADD_CURRENCIES,
        payload: {
          currencies: {},
        },
      },
      {
        type: ADD_MEDIUM,
        payload: {
          medium: [],
        },
      },
      {
        type: ADD_TAGS,
        payload: {
          tags: {},
        },
      },
      {
        type: types.ADD_DATASET,
        payload: { dataset: { id, name: 'Dataset', tags: [] } },
      },
      {
        type: types.SET_DATASET_LOADING,
        payload: { loading: false },
      },
    ];

    const store = mockStore({ datasets: initialState });
    store
      .dispatch(actions.getDataset(id))
      .then(() => expect(store.getActions()).toEqual(expectedActions))
      .then(() => expect(axios).toHaveBeenCalledWith({ method: 'get', url: `/datasets/1` }));
  });
});
