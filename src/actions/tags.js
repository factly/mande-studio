import axios from '../utils/axios';
import {
  baseUrl,
  LOADING_TAGS,
  LOAD_TAGS_SUCCESS,
  SET_TAGS_LIST_TOTAL,
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
import { getIds, buildObjectOfItems } from '../utils/objects';

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
      const { nodes, total } = response.data;
      dispatch(loadTagsSuccess(nodes));
      dispatch(setTagsListTotal(total));
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

export const updateTag = (id, data) => {
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
      dispatch(updateTagSuccess(response.data));
    }
  };
};

export const deleteTag = (id) => {
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
      dispatch(deleteTagSuccess(id));
    }
  };
};

const loadingTags = () => {
  return {
    type: LOADING_TAGS,
  };
};

const setTagsListTotal = (total) => {
  return {
    type: SET_TAGS_LIST_TOTAL,
    payload: total,
  };
};

export const loadTagsSuccess = (tags) => {
  return {
    type: LOAD_TAGS_SUCCESS,
    payload: {
      ids: getIds(tags),
      items: buildObjectOfItems(tags),
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

const updateTagSuccess = (tag) => {
  return {
    type: UPDATE_TAG_SUCCESS,
    payload: tag,
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

const deleteTagSuccess = (id) => {
  return {
    type: DELETE_TAG_SUCCESS,
    payload: id,
  };
};

const deleteTagFailure = (message) => {
  return {
    type: DELETE_TAG_FAILURE,
    payload: message,
  };
};
