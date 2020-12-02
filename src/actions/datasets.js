import axios from '../utils/axios';
import {
  ADD_DATASET,
  ADD_DATASET_FORMAT,
  REMOVE_DATASET_FORMAT,
  ADD_DATASETS,
  SET_DATASET_LOADING,
  SET_DATASET_REQUEST,
  SET_DATASET_IDS,
  RESET_DATASET,
  DATASET_API,
} from '../constants/datasets';
import { addCurrencies } from './currencies';
import { addTags } from './tags';
import { addMedium } from './media';
import { getIds, buildObjectOfItems, getValues, deleteKeys } from '../utils/objects';

export const loadDatasets = (page = 1, limit = 5) => {
  return async (dispatch, getState) => {
    const {
      datasets: { req },
    } = getState();

    let ids;
    for (let item of req) {
      if (item.page === page && item.limit === limit) {
        ids = [...item.ids];
      }
    }

    if (ids) {
      dispatch(setDatasetIds(ids));
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${DATASET_API}?page=${page}&limit=${limit}`,
      method: 'get',
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { page: page, limit: limit, ids: currentPageIds };
    dispatch(setDatasetRequest(currentReq, total));
    dispatch(addDatasets(nodes));
    dispatch(setDatasetIds(currentPageIds));

    dispatch(setLoading(false));
  };
};

export const createDataset = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    const response = await axios({
      url: DATASET_API,
      method: 'post',
      data: data,
    });

    dispatch(addDataset(response.data));
    dispatch(setLoading(false));

    return response.data;
  };
};

export const createDatasetFormat = (datasetId, data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    const response = await axios({
      url: `${DATASET_API}/${datasetId}/format`,
      method: 'post',
      data: data,
    });

    dispatch(addDatasetFormat(datasetId, response.data));
    dispatch(setLoading(false));
  };
};

export const updateDataset = (id, data) => {
  return async (dispatch) => {
    let url = `${DATASET_API}/${id}`;

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    });

    dispatch(addDataset(response.data));

    return response.data;
  };
};

export const deleteDataset = (id) => {
  return async (dispatch, getState) => {
    let url = `${DATASET_API}/${id}`;

    dispatch(setLoading(true));

    await axios({
      url: url,
      method: 'delete',
    });

    dispatch(resetDataset());
    dispatch(setLoading(false));
  };
};

export const deleteDatasetFormat = (datasetId, id) => {
  return async (dispatch) => {
    let url = `${DATASET_API}/${datasetId}/format/${id}`;

    dispatch(setLoading(true));

    await axios({
      url: url,
      method: 'delete',
    });

    dispatch(removeDatasetFormat(datasetId, id));
    dispatch(setLoading(false));
  };
};

export const getDataset = (id) => {
  return async (dispatch, getState) => {
    const {
      datasets: { items },
    } = getState();

    if (items[id]) {
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${DATASET_API}/${id}`,
      method: 'get',
    });
    dispatch(addDataset(response.data));

    dispatch(setLoading(false));
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_DATASET_LOADING,
    payload: { loading },
  };
};

export const addDataset = (dataset) => (dispatch) => {
  const currencies = getValues([dataset], 'currency');
  dispatch(addCurrencies(currencies));

  const medium = getValues([dataset], 'featured_medium');
  dispatch(addMedium(medium));

  const tags = getValues([dataset], 'tags');
  dispatch(addTags(tags));

  dataset.tags = getIds(dataset.tags);

  dispatch({
    type: ADD_DATASET,
    payload: { dataset: deleteKeys([dataset], ['currency', 'featured_medium'])[0] },
  });
};

export const addDatasets = (datasets) => (dispatch) => {
  const currencies = getValues(datasets, 'currency');
  dispatch(addCurrencies(currencies));

  const medium = getValues(datasets, 'featured_medium');
  dispatch(addMedium(medium));

  const tags = getValues(datasets, 'tags');
  dispatch(addTags(tags));

  datasets.forEach((dataset) => {
    dataset.tags = getIds(dataset.tags);
  });

  dispatch({
    type: ADD_DATASETS,
    payload: {
      datasets: buildObjectOfItems(deleteKeys(datasets, ['currency', 'featured_medium'])),
    },
  });
};

export const addDatasetFormat = (datasetId, datasetFormat) => {
  return {
    type: ADD_DATASET_FORMAT,
    payload: { datasetId, datasetFormat },
  };
};

export const removeDatasetFormat = (datasetId, datasetFormatId) => {
  return {
    type: REMOVE_DATASET_FORMAT,
    payload: { datasetId, datasetFormatId },
  };
};

export const setDatasetRequest = (req, total) => {
  return {
    type: SET_DATASET_REQUEST,
    payload: { req, total },
  };
};

export const setDatasetIds = (ids) => {
  return {
    type: SET_DATASET_IDS,
    payload: { ids },
  };
};

export const resetDataset = () => {
  return {
    type: RESET_DATASET,
  };
};
