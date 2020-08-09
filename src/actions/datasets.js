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
import { getIds, buildObjectOfItems } from '../utils/objects';

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

const setLoading = (loading) => {
  return {
    type: SET_DATASET_LOADING,
    payload: { loading },
  };
};

const addDataset = (dataset) => {
  return {
    type: ADD_DATASET,
    payload: { dataset },
  };
};

export const addDatasets = (datasets) => {
  return {
    type: ADD_DATASETS,
    payload: {
      datasets: buildObjectOfItems(datasets),
    },
  };
};

const addDatasetFormat = (datasetId, datasetFormat) => {
  return {
    type: ADD_DATASET_FORMAT,
    payload: { datasetId, datasetFormat },
  };
};

const removeDatasetFormat = (datasetId, datasetFormatId) => {
  return {
    type: REMOVE_DATASET_FORMAT,
    payload: { datasetId, datasetFormatId },
  };
};

const setDatasetRequest = (req, total) => {
  return {
    type: SET_DATASET_REQUEST,
    payload: { req, total },
  };
};

const setDatasetIds = (ids) => {
  return {
    type: SET_DATASET_IDS,
    payload: { ids },
  };
};

const resetDataset = () => {
  return {
    type: RESET_DATASET,
  };
};
