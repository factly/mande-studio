import axios from '../utils/axios';
import {
  baseUrl,
  ADD_FORMATS_LIST_REQUEST,
  SET_FORMATS_LIST_CURRENT_PAGE,
  LOADING_FORMATS,
  LOAD_FORMATS_SUCCESS,
  SET_FORMATS_LIST_TOTAL,
  LOAD_FORMATS_FAILURE,
  GET_FORMAT_SUCCESS,
  GET_FORMAT_FAILURE,
  CREATING_FORMAT,
  CREATE_FORMAT_SUCCESS,
  CREATE_FORMAT_FAILURE,
  UPDATING_FORMAT,
  UPDATE_FORMAT_SUCCESS,
  UPDATE_FORMAT_FAILURE,
  DELETING_FORMAT,
  DELETE_FORMAT_SUCCESS,
  DELETE_FORMAT_FAILURE,
} from '../constants/formats';
import { getIds, buildObjectOfItems } from '../utils/objects';

export const loadFormats = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    const {
      formats: { req },
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

    dispatch(loadingFormats());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadFormatsFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;
      const currentPageIds = getIds(nodes);
      const req = { page: page, limit: limit, ids: currentPageIds };
      dispatch(addListRequest(req));
      dispatch(loadFormatsSuccess(nodes));
      dispatch(setListCurrentPage(currentPageIds));
      dispatch(setFormatsListTotal(total));
    }
  };
};

export const createFormat = (data) => {
  return async (dispatch, getState) => {
    dispatch(creatingFormat());

    const response = await axios({
      url: baseUrl,
      method: 'post',
      data: data,
    }).catch((error) => {
      dispatch(createFormatFailure(error.message));
    });

    if (response) {
      dispatch(createFormatSuccess(response.data));
    }
  };
};

export const updateFormat = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(updatingFormat());

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    }).catch((error) => {
      dispatch(updateFormatFailure(error.message));
    });

    if (response) {
      dispatch(updateFormatSuccess(response.data));
    }
  };
};

export const deleteFormat = (id) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(deletingFormat());

    const response = await axios({
      url: url,
      method: 'delete',
    }).catch((error) => {
      dispatch(deleteFormatFailure(error.message));
    });

    if (response) {
      dispatch(deleteFormatSuccess(id));
    }
  };
};

export const getFormat = (id) => {
  return async (dispatch, getState) => {
    const {
      formats: { items },
    } = getState();

    if (items[id]) {
      dispatch(getFormatSuccess({ ...items[id] }));
      return;
    }

    dispatch(loadingFormats());

    const response = await axios({
      url: `${baseUrl}/${id}`,
      method: 'get',
    }).catch((error) => {
      dispatch(getFormatFailure(error.message));
    });

    if (response) {
      dispatch(getFormatSuccess(response.data));
    }
  };
};

const getFormatSuccess = (format) => {
  return {
    type: GET_FORMAT_SUCCESS,
    payload: format,
  };
};

const getFormatFailure = (message) => {
  return {
    type: GET_FORMAT_FAILURE,
    payload: message,
  };
};

const loadingFormats = () => {
  return {
    type: LOADING_FORMATS,
  };
};

const setFormatsListTotal = (total) => {
  return {
    type: SET_FORMATS_LIST_TOTAL,
    payload: total,
  };
};

const addListRequest = (req) => {
  return {
    type: ADD_FORMATS_LIST_REQUEST,
    payload: req,
  };
};

const setListCurrentPage = (ids) => {
  return {
    type: SET_FORMATS_LIST_CURRENT_PAGE,
    payload: ids,
  };
};

export const loadFormatsSuccess = (formats) => {
  return {
    type: LOAD_FORMATS_SUCCESS,
    payload: {
      items: buildObjectOfItems(formats),
    },
  };
};

const loadFormatsFailure = (message) => {
  return {
    type: LOAD_FORMATS_FAILURE,
    payload: message,
  };
};

const creatingFormat = () => {
  return {
    type: CREATING_FORMAT,
  };
};

const createFormatSuccess = (format) => {
  return {
    type: CREATE_FORMAT_SUCCESS,
    payload: format,
  };
};

const createFormatFailure = (message) => {
  return {
    type: CREATE_FORMAT_FAILURE,
    payload: message,
  };
};

const updatingFormat = () => {
  return {
    type: UPDATING_FORMAT,
  };
};

const updateFormatSuccess = (format) => {
  return {
    type: UPDATE_FORMAT_SUCCESS,
    payload: format,
  };
};

const updateFormatFailure = (message) => {
  return {
    type: UPDATE_FORMAT_FAILURE,
    payload: message,
  };
};

const deletingFormat = () => {
  return {
    type: DELETING_FORMAT,
  };
};

const deleteFormatSuccess = (id) => {
  return {
    type: DELETE_FORMAT_SUCCESS,
    payload: id,
  };
};

const deleteFormatFailure = (message) => {
  return {
    type: DELETE_FORMAT_FAILURE,
    payload: message,
  };
};
