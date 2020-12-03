import axios from '../utils/axios';
import {
  ADD_MEDIUM,
  ADD_MEDIA,
  SET_MEDIUM_LOADING,
  SET_MEDIUM_REQUEST,
  SET_MEDIUM_IDS,
  RESET_MEDIUM,
  MEDIUM_API,
} from '../constants/media';
import { getIds, buildObjectOfItems } from '../utils/objects';

export const loadMedia = (page = 1, limit = 5) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    const response = await axios({
      url: `${MEDIUM_API}?page=${page}&limit=${limit}`,
      method: 'get',
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { page: page, limit: limit, ids: currentPageIds };
    dispatch(setMediumRequest(currentReq, total));
    dispatch(addMedia(nodes));
    dispatch(setMediumIds(currentPageIds));

    dispatch(setLoading(false));
  };
};

export const createMedium = (data) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    await axios({
      url: MEDIUM_API,
      method: 'post',
      data: data,
    });

    dispatch(resetMedium());
    dispatch(setLoading(false));
  };
};

export const updateMedium = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${MEDIUM_API}/${id}`;

    dispatch(setLoading(true));

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    });

    dispatch(addMedium(response.data));
    dispatch(setLoading(false));
  };
};

export const deleteMedium = (id) => {
  return async (dispatch, getState) => {
    let url = `${MEDIUM_API}/${id}`;

    dispatch(setLoading(true));

    await axios({
      url: url,
      method: 'delete',
    });

    dispatch(resetMedium());
    dispatch(setLoading(false));
  };
};

export const getMedium = (id) => {
  return async (dispatch, getState) => {
    const {
      media: { items },
    } = getState();

    if (items[id]) {
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${MEDIUM_API}/${id}`,
      method: 'get',
    });
    dispatch(addMedium(response.data));

    dispatch(setLoading(false));
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_MEDIUM_LOADING,
    payload: { loading },
  };
};

export const addMedium = (medium) => {
  return {
    type: ADD_MEDIUM,
    payload: { medium },
  };
};

export const addMedia = (media) => {
  return {
    type: ADD_MEDIA,
    payload: {
      media: buildObjectOfItems(media),
    },
  };
};

export const setMediumRequest = (req, total) => {
  return {
    type: SET_MEDIUM_REQUEST,
    payload: { req, total },
  };
};

export const setMediumIds = (ids) => {
  return {
    type: SET_MEDIUM_IDS,
    payload: { ids },
  };
};

export const resetMedium = () => {
  return {
    type: RESET_MEDIUM,
  };
};
