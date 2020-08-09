import axios from '../utils/axios';
import {
  ADD_FORMAT,
  ADD_FORMATS,
  SET_FORMAT_LOADING,
  SET_FORMAT_REQUEST,
  SET_FORMAT_IDS,
  RESET_FORMAT,
  FORMAT_API,
} from '../constants/formats';
import { getIds, buildObjectOfItems } from '../utils/objects';

export const loadFormats = (page = 1, limit = 5) => {
  return async (dispatch, getState) => {
    const {
      formats: { req },
    } = getState();

    let ids;
    for (let item of req) {
      if (item.page === page && item.limit === limit) {
        ids = [...item.ids];
      }
    }

    if (ids) {
      dispatch(setFormatIds(ids));
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${FORMAT_API}?page=${page}&limit=${limit}`,
      method: 'get',
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { page: page, limit: limit, ids: currentPageIds };
    dispatch(setFormatRequest(currentReq, total));
    dispatch(addFormats(nodes));
    dispatch(setFormatIds(currentPageIds));

    dispatch(setLoading(false));
  };
};

export const createFormat = (data) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    await axios({
      url: FORMAT_API,
      method: 'post',
      data: data,
    });

    dispatch(resetFormat());
    dispatch(setLoading(false));
  };
};

export const updateFormat = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${FORMAT_API}/${id}`;

    dispatch(setLoading(true));

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    });

    dispatch(addFormat(response.data));
    dispatch(setLoading(false));
  };
};

export const deleteFormat = (id) => {
  return async (dispatch, getState) => {
    let url = `${FORMAT_API}/${id}`;

    dispatch(setLoading(true));

    await axios({
      url: url,
      method: 'delete',
    });

    dispatch(resetFormat());
    dispatch(setLoading(false));
  };
};

export const getFormat = (id) => {
  return async (dispatch, getState) => {
    const {
      formats: { items },
    } = getState();

    if (items[id]) {
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${FORMAT_API}/${id}`,
      method: 'get',
    });
    dispatch(addFormat(response.data));

    dispatch(setLoading(false));
  };
};

const setLoading = (loading) => {
  return {
    type: SET_FORMAT_LOADING,
    payload: { loading },
  };
};

const addFormat = (format) => {
  return {
    type: ADD_FORMAT,
    payload: { format },
  };
};

export const addFormats = (formats) => {
  return {
    type: ADD_FORMATS,
    payload: {
      formats: buildObjectOfItems(formats),
    },
  };
};

const setFormatRequest = (req, total) => {
  return {
    type: SET_FORMAT_REQUEST,
    payload: { req, total },
  };
};

const setFormatIds = (ids) => {
  return {
    type: SET_FORMAT_IDS,
    payload: { ids },
  };
};

const resetFormat = () => {
  return {
    type: RESET_FORMAT,
  };
};
