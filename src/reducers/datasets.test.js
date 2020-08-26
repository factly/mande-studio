import reducer from './datasets';
import * as types from '../constants/datasets';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

describe('datasets reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should return the state for default case', () => {
    expect(
      reducer({
        req: [{ ids: [1, 2, 3], page: 1, limit: 5 }],
        items: { 1: { id: 1, name: 'dataset' } },
        ids: [1, 2, 3],
        loading: false,
        total: 3,
      }),
    ).toEqual({
      req: [{ ids: [1, 2, 3], page: 1, limit: 5 }],
      items: { 1: { id: 1, name: 'dataset' } },
      ids: [1, 2, 3],
      loading: false,
      total: 3,
    });
  });
  it('should handle SET_DATASET_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.SET_DATASET_LOADING,
        payload: { loading: true },
      }),
    ).toEqual({
      loading: true,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
    expect(
      reducer(initialState, {
        type: types.SET_DATASET_LOADING,
        payload: { loading: false },
      }),
    ).toEqual({
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_DATASET', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_DATASET,
        payload: {
          dataset: { id: 1, name: 'dataset 1' },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'dataset 1' } },
      loading: false,
    });
  });
  it('should handle ADD_DATASET when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          total: 0,
          items: { 1: { id: 1, name: 'existing dataset 1' } },
          loading: false,
        },
        {
          type: types.ADD_DATASET,
          payload: {
            dataset: { id: 1, name: 'updated dataset 1' },
          },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'updated dataset 1' } },
      loading: false,
    });
  });
  it('should handle ADD_DATASETS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_DATASETS,
        payload: {
          datasets: { 1: { id: 1, name: 'dataset 1' }, 2: { id: 2, name: 'dataset 2' } },
        },
      }),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'dataset 1' }, 2: { id: 2, name: 'dataset 2' } },
      loading: false,
    });
  });
  it('should handle empty payload ADD_DATASETS', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_DATASETS,
        payload: { datasets: {} },
      }),
    ).toEqual({
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    });
  });
  it('should handle ADD_DATASETS when already exists', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          items: {
            1: { id: 1, name: 'existing dataset' },
            2: { id: 2, name: 'new dataset' },
          },
          loading: false,
          total: 0,
        },
        {
          type: types.ADD_DATASETS,
          payload: { datasets: { 2: { id: 2, name: 'updated dataset' } } },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      items: {
        1: { id: 1, name: 'existing dataset' },
        2: { id: 2, name: 'updated dataset' },
      },
      loading: false,
      total: 0,
    });
  });
  it('should handle ADD_DATASET_FORMAT when dataset has no formats', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          total: 0,
          items: { 1: { id: 1, name: 'dataset 1' } },
          loading: false,
        },
        {
          type: types.ADD_DATASET_FORMAT,
          payload: {
            datasetId: 1,
            datasetFormat: { id: 1, name: 'datasetFormat 1' },
          },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'dataset 1', formats: [{ id: 1, name: 'datasetFormat 1' }] } },
      loading: false,
    });
  });
  it('should handle ADD_DATASET_FORMAT when dataset already has formats', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          total: 0,
          items: { 1: { id: 1, name: 'dataset 1', formats: [{ id: 1, name: 'datasetFormat 1' }] } },
          loading: false,
        },
        {
          type: types.ADD_DATASET_FORMAT,
          payload: {
            datasetId: 1,
            datasetFormat: { id: 2, name: 'datasetFormat 2' },
          },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: {
        1: {
          id: 1,
          name: 'dataset 1',
          formats: [
            { id: 1, name: 'datasetFormat 1' },
            { id: 2, name: 'datasetFormat 2' },
          ],
        },
      },
      loading: false,
    });
  });
  it('should handle REMOVE_DATASET_FORMAT', () => {
    expect(
      reducer(
        {
          req: [],
          ids: [],
          total: 0,
          items: {
            1: {
              id: 1,
              name: 'dataset 1',
              formats: [
                { id: 1, name: 'datasetFormat 1' },
                { id: 2, name: 'datasetFormat 2' },
              ],
            },
          },
          loading: false,
        },
        {
          type: types.REMOVE_DATASET_FORMAT,
          payload: {
            datasetId: 1,
            datasetFormatId: 1,
          },
        },
      ),
    ).toEqual({
      req: [],
      ids: [],
      total: 0,
      items: { 1: { id: 1, name: 'dataset 1', formats: [{ id: 2, name: 'datasetFormat 2' }] } },
      loading: false,
    });
  });
  it('should handle SET_DATASET_IDS', () => {
    expect(
      reducer(initialState, {
        type: types.SET_DATASET_IDS,
        payload: { ids: [1, 2, 3] },
      }),
    ).toEqual({
      req: [],
      items: {},
      ids: [1, 2, 3],
      loading: false,
      total: 0,
    });
  });
  it('should handle SET_DATASET_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.SET_DATASET_REQUEST,
        payload: {
          req: { ids: [1, 2, 3], page: 1, limit: 5 },
          total: 3,
        },
      }),
    ).toEqual({
      req: [{ ids: [1, 2, 3], page: 1, limit: 5 }],
      items: {},
      ids: [],
      loading: false,
      total: 3,
    });
  });
  it('should handle RESET_DATASET', () => {
    expect(
      reducer(
        {
          req: [{ ids: [1, 2, 3], page: 1, limit: 5 }],
          items: { 1: { id: 1, name: 'dataset' } },
          ids: [1, 2, 3],
          loading: false,
          total: 3,
        },
        {
          type: types.RESET_DATASET,
        },
      ),
    ).toEqual(initialState);
  });
});
