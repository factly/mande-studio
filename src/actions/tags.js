import axios from '../utils/axios';
import {
  baseUrl,
  LOADING_TAGS,
  LOAD_TAGS_SUCCESS,
  LOAD_TAGS_FAILURE,
  CREATING_TAG,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_FAILURE,
  UPDATING_TAG,
  UPDATE_TAG_SUCCESS,
  UPDATE_TAG_FAILURE,
  DELETING_TAG,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_FAILURE,
} from '../constants/tags';

export const loadTags = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(loadingTags());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadTagsFailure(error.message));
    });

    if (response) {
      dispatch(loadTagsSuccess(response.data));
    }
  };
};

export const createTag = (data) => {
  return async (dispatch, getState) => {
    dispatch(creatingTag());

    const response = await axios({
      url: baseUrl,
      method: 'post',
      data: data,
    }).catch((error) => {
      dispatch(createTagFailure(error.message));
    });

    if (response) {
      dispatch(createTagSuccess(response.data));
    }
  };
};

export const updateTag = (id, data, index) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(updatingTag());

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    }).catch((error) => {
      dispatch(updateTagFailure(error.message));
    });

    if (response) {
      dispatch(updateTagSuccess(index, response.data));
    }
  };
};

export const deleteTag = (id, index) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(deletingTag());

    const response = await axios({
      url: url,
      method: 'delete',
    }).catch((error) => {
      dispatch(deleteTagFailure(error.message));
    });

    if (response) {
      dispatch(deleteTagSuccess(index));
    }
  };
};

const loadingTags = () => {
  return {
    type: LOADING_TAGS,
  };
};

const loadTagsSuccess = (data) => {
  return {
    type: LOAD_TAGS_SUCCESS,
    payload: {
      items: data.nodes,
      total: data.total,
    },
  };
};

const loadTagsFailure = (message) => {
  return {
    type: LOAD_TAGS_FAILURE,
    payload: message,
  };
};

const creatingTag = () => {
  return {
    type: CREATING_TAG,
  };
};

const createTagSuccess = (tag) => {
  return {
    type: CREATE_TAG_SUCCESS,
    payload: tag,
  };
};

const createTagFailure = (message) => {
  return {
    type: CREATE_TAG_FAILURE,
    payload: message,
  };
};

const updatingTag = () => {
  return {
    type: UPDATING_TAG,
  };
};

const updateTagSuccess = (index, tag) => {
  return {
    type: UPDATE_TAG_SUCCESS,
    payload: { index, tag },
  };
};

const updateTagFailure = (message) => {
  return {
    type: UPDATE_TAG_FAILURE,
    payload: message,
  };
};

const deletingTag = () => {
  return {
    type: DELETING_TAG,
  };
};

const deleteTagSuccess = (index) => {
  return {
    type: DELETE_TAG_SUCCESS,
    payload: index,
  };
};

const deleteTagFailure = (message) => {
  return {
    type: DELETE_TAG_FAILURE,
    payload: message,
  };
};
