import axios from '../utils/axios';
import {
  baseUrl,
  ADD_DATASETS_LIST_REQUEST,
  SET_DATASETS_LIST_CURRENT_PAGE,
  GET_DATASET_SUCCESS,
  GET_DATASET_FAILURE,
  LOADING_DATASETS,
  LOAD_DATASETS_SUCCESS,
  SET_DATASETS_LIST_TOTAL,
  LOAD_DATASETS_FAILURE,
  CREATING_DATASET,
  CREATE_DATASET_SUCCESS,
  CREATE_DATASET_FAILURE,
  CREATE_DATASET_FORMAT_SUCCESS,
  CREATE_DATASET_FORMAT_FAILURE,
  UPDATING_DATASET,
  UPDATE_DATASET_SUCCESS,
  UPDATE_DATASET_FAILURE,
  DELETING_DATASET,
  DELETE_DATASET_SUCCESS,
  DELETE_DATASET_FAILURE,
  DELETE_DATASET_FORMAT_SUCCESS,
  DELETE_DATASET_FORMAT_FAILURE,
  DELETING_DATASET_FORMAT,
} from '../constants/datasets';
import { getIds, buildObjectOfItems } from '../utils/objects';

export const loadDatasets = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    const {
      datasets: { req },
    } = getState();

    let found = false;
    let ids;
    for (let item of req) {
      if (item.page === page && item.limit === limit) {
        ids = [...item.ids];
        found = true;
      }
    }

    if (found) {
      dispatch(setListCurrentPage(ids));
      return;
    }

    dispatch(loadingDatasets());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadDatasetsFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;
      const currentPageIds = getIds(nodes);
      const req = { page: page, limit: limit, ids: currentPageIds };
      dispatch(addListRequest(req));
      dispatch(loadDatasetsSuccess(nodes));
      dispatch(setListCurrentPage(currentPageIds));
      dispatch(setDatasetsListTotal(total));
    }
  };
};

export const createDataset = (data) => {
  return async (dispatch, getState) => {
    dispatch(creatingDataset());

    const response = await axios({
      url: baseUrl,
      method: 'post',
      data: data,
    }).catch((error) => {
      dispatch(createDatasetFailure(error.message));
    });

    if (response) {
      dispatch(createDatasetSuccess(response.data));
    }

    return response.data;
  };
};

export const createDatasetFormat = (datasetId, data) => {
  return async (dispatch, getState) => {
    dispatch(creatingDataset());

    const response = await axios({
      url: `${baseUrl}/${datasetId}/format`,
      method: 'post',
      data: data,
    }).catch((error) => {
      dispatch(createDatasetFormatFailure(error.message));
    });

    if (response) {
      dispatch(createDatasetFormatSuccess(datasetId, response.data));
    }
  };
};

export const updateDataset = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(updatingDataset());

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    }).catch((error) => {
      dispatch(updateDatasetFailure(error.message));
    });

    if (response) {
      dispatch(updateDatasetSuccess(response.data));
      return response.data;
    }
  };
};

export const deleteDataset = (id) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(deletingDataset());

    const response = await axios({
      url: url,
      method: 'delete',
    }).catch((error) => {
      dispatch(deleteDatasetFailure(error.message));
    });

    if (response) {
      dispatch(deleteDatasetSuccess(id));
    }
  };
};

export const deleteDatasetFormat = (datasetId, id) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${datasetId}/format/${id}`;

    dispatch(deletingDatasetFormat());

    const response = await axios({
      url: url,
      method: 'delete',
    }).catch((error) => {
      dispatch(deleteDatasetFormatFailure(error.message));
    });

    if (response) {
      dispatch(deleteDatasetFormatSuccess(datasetId, id));
    }
  };
};

export const getDataset = (id) => {
  return async (dispatch, getState) => {
    const {
      datasets: { items },
    } = getState();

    if (items[id]) {
      dispatch(getDatasetSuccess({ ...items[id] }));
      return;
    }

    dispatch(loadingDatasets());

    const response = await axios({
      url: `${baseUrl}/${id}`,
      method: 'get',
    }).catch((error) => {
      dispatch(getDatasetFailure(error.message));
    });

    if (response) {
      dispatch(getDatasetSuccess(response.data));
    }
  };
};

const getDatasetSuccess = (dataset) => {
  return {
    type: GET_DATASET_SUCCESS,
    payload: dataset,
  };
};

const getDatasetFailure = (message) => {
  return {
    type: GET_DATASET_FAILURE,
    payload: message,
  };
};

const loadingDatasets = () => {
  return {
    type: LOADING_DATASETS,
  };
};

const setDatasetsListTotal = (total) => {
  return {
    type: SET_DATASETS_LIST_TOTAL,
    payload: total,
  };
};

const addListRequest = (req) => {
  return {
    type: ADD_DATASETS_LIST_REQUEST,
    payload: req,
  };
};

const setListCurrentPage = (ids) => {
  return {
    type: SET_DATASETS_LIST_CURRENT_PAGE,
    payload: ids,
  };
};

export const loadDatasetsSuccess = (datasets) => {
  return {
    type: LOAD_DATASETS_SUCCESS,
    payload: {
      items: buildObjectOfItems(datasets),
    },
  };
};

const loadDatasetsFailure = (message) => {
  return {
    type: LOAD_DATASETS_FAILURE,
    payload: message,
  };
};

const creatingDataset = () => {
  return {
    type: CREATING_DATASET,
  };
};

const createDatasetSuccess = (dataset) => {
  return {
    type: CREATE_DATASET_SUCCESS,
    payload: dataset,
  };
};

const createDatasetFailure = (message) => {
  return {
    type: CREATE_DATASET_FAILURE,
    payload: message,
  };
};

const createDatasetFormatSuccess = (datasetId, datasetFormat) => {
  return {
    type: CREATE_DATASET_FORMAT_SUCCESS,
    payload: { datasetId, datasetFormat },
  };
};

const createDatasetFormatFailure = (message) => {
  return {
    type: CREATE_DATASET_FORMAT_FAILURE,
    payload: message,
  };
};

const updatingDataset = () => {
  return {
    type: UPDATING_DATASET,
  };
};

const updateDatasetSuccess = (dataset) => {
  return {
    type: UPDATE_DATASET_SUCCESS,
    payload: dataset,
  };
};

const updateDatasetFailure = (message) => {
  return {
    type: UPDATE_DATASET_FAILURE,
    payload: message,
  };
};

const deletingDataset = () => {
  return {
    type: DELETING_DATASET,
  };
};

const deleteDatasetSuccess = (id) => {
  return {
    type: DELETE_DATASET_SUCCESS,
    payload: id,
  };
};

const deleteDatasetFailure = (message) => {
  return {
    type: DELETE_DATASET_FAILURE,
    payload: message,
  };
};

const deletingDatasetFormat = () => {
  return {
    type: DELETING_DATASET_FORMAT,
  };
};

const deleteDatasetFormatSuccess = (datasetId, id) => {
  return {
    type: DELETE_DATASET_FORMAT_SUCCESS,
    payload: { datasetId, id },
  };
};

const deleteDatasetFormatFailure = (message) => {
  return {
    type: DELETE_DATASET_FORMAT_FAILURE,
    payload: message,
  };
};
