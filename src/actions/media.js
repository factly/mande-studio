import axios from '../utils/axios';
import {
  baseUrl,
  ADD_MEDIA_LIST_REQUEST,
  SET_MEDIA_LIST_CURRENT_PAGE,
  LOADING_MEDIA,
  LOAD_MEDIA_SUCCESS,
  SET_MEDIA_LIST_TOTAL,
  LOAD_MEDIA_FAILURE,
  GET_MEDIUM_SUCCESS,
  GET_MEDIUM_FAILURE,
  CREATING_MEDIUM,
  CREATE_MEDIUM_SUCCESS,
  CREATE_MEDIUM_FAILURE,
  UPDATING_MEDIUM,
  UPDATE_MEDIUM_SUCCESS,
  UPDATE_MEDIUM_FAILURE,
  DELETING_MEDIUM,
  DELETE_MEDIUM_SUCCESS,
  DELETE_MEDIUM_FAILURE,
} from '../constants/media';
import { getIds, buildObjectOfItems } from '../utils/objects';

export const loadMedia = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    const {
      media: { req },
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

    dispatch(loadingMedia());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadMediaFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;
      const currentPageIds = getIds(nodes);
      const req = { page: page, limit: limit, ids: currentPageIds };
      dispatch(addListRequest(req));
      dispatch(loadMediaSuccess(nodes));
      dispatch(setListCurrentPage(currentPageIds));
      dispatch(setMediaListTotal(total));
    }
  };
};

export const createMedium = (data) => {
  return async (dispatch, getState) => {
    dispatch(creatingMedium());

    const response = await axios({
      url: baseUrl,
      method: 'post',
      data: data,
    }).catch((error) => {
      dispatch(createMediumFailure(error.message));
    });

    if (response) {
      dispatch(createMediumSuccess(response.data));
      return response.data;
    }
  };
};

export const updateMedium = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(updatingMedium());

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    }).catch((error) => {
      dispatch(updateMediumFailure(error.message));
    });

    if (response) {
      dispatch(updateMediumSuccess(response.data));
    }
  };
};

export const deleteMedium = (id) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(deletingMedium());

    const response = await axios({
      url: url,
      method: 'delete',
    }).catch((error) => {
      dispatch(deleteMediumFailure(error.message));
    });

    if (response) {
      dispatch(deleteMediumSuccess(id));
    }
  };
};

export const getMedium = (id) => {
  return async (dispatch, getState) => {
    const {
      media: { items },
    } = getState();

    if (items[id]) {
      dispatch(getMediumSuccess({ ...items[id] }));
      return;
    }

    dispatch(loadingMedia());

    const response = await axios({
      url: `${baseUrl}/${id}`,
      method: 'get',
    }).catch((error) => {
      dispatch(getMediumFailure(error.message));
    });

    if (response) {
      dispatch(getMediumSuccess(response.data));
    }
  };
};

const getMediumSuccess = (medium) => {
  return {
    type: GET_MEDIUM_SUCCESS,
    payload: medium,
  };
};

const getMediumFailure = (message) => {
  return {
    type: GET_MEDIUM_FAILURE,
    payload: message,
  };
};

const loadingMedia = () => {
  return {
    type: LOADING_MEDIA,
  };
};

const setMediaListTotal = (total) => {
  return {
    type: SET_MEDIA_LIST_TOTAL,
    payload: total,
  };
};

const addListRequest = (req) => {
  return {
    type: ADD_MEDIA_LIST_REQUEST,
    payload: req,
  };
};

const setListCurrentPage = (ids) => {
  return {
    type: SET_MEDIA_LIST_CURRENT_PAGE,
    payload: ids,
  };
};

export const loadMediaSuccess = (media) => {
  return {
    type: LOAD_MEDIA_SUCCESS,
    payload: {
      items: buildObjectOfItems(media),
    },
  };
};

const loadMediaFailure = (message) => {
  return {
    type: LOAD_MEDIA_FAILURE,
    payload: message,
  };
};

const creatingMedium = () => {
  return {
    type: CREATING_MEDIUM,
  };
};

const createMediumSuccess = (medium) => {
  return {
    type: CREATE_MEDIUM_SUCCESS,
    payload: medium,
  };
};

const createMediumFailure = (message) => {
  return {
    type: CREATE_MEDIUM_FAILURE,
    payload: message,
  };
};

const updatingMedium = () => {
  return {
    type: UPDATING_MEDIUM,
  };
};

const updateMediumSuccess = (medium) => {
  return {
    type: UPDATE_MEDIUM_SUCCESS,
    payload: medium,
  };
};

const updateMediumFailure = (message) => {
  return {
    type: UPDATE_MEDIUM_FAILURE,
    payload: message,
  };
};

const deletingMedium = () => {
  return {
    type: DELETING_MEDIUM,
  };
};

const deleteMediumSuccess = (id) => {
  return {
    type: DELETE_MEDIUM_SUCCESS,
    payload: id,
  };
};

const deleteMediumFailure = (message) => {
  return {
    type: DELETE_MEDIUM_FAILURE,
    payload: message,
  };
};
