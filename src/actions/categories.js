import axios from '../utils/axios';
import {
  baseUrl,
  LOADING_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
  SET_CATEGORIES_LIST_TOTAL,
  CREATING_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  UPDATING_CATEGORY,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETING_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
} from '../constants/categories';
import { getIds, buildObjectOfItems } from '../utils/objects';

export const loadCategories = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(loadingCategories());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadCategoriesFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;
      dispatch(loadCategoriesSuccess(nodes));
      dispatch(setCategoriesListTotal(total));
    }
  };
};

export const createCategory = (data) => {
  return async (dispatch, getState) => {
    dispatch(creatingCategory());

    const response = await axios({
      url: baseUrl,
      method: 'post',
      data: data,
    }).catch((error) => {
      dispatch(createCategoryFailure(error.message));
    });

    if (response) {
      dispatch(createCategorySuccess(response.data));
    }
  };
};

export const updateCategory = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(updatingCategory());

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    }).catch((error) => {
      dispatch(updateCategoryFailure(error.message));
    });

    if (response) {
      dispatch(updateCategorySuccess(response.data));
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(deletingCategory());

    const response = await axios({
      url: url,
      method: 'delete',
    }).catch((error) => {
      dispatch(deleteCategoryFailure(error.message));
    });

    if (response) {
      dispatch(deleteCategorySuccess(id));
    }
  };
};

const loadingCategories = () => {
  return {
    type: LOADING_CATEGORIES,
  };
};

const setCategoriesListTotal = (total) => {
  return {
    type: SET_CATEGORIES_LIST_TOTAL,
    payload: total,
  };
};

export const loadCategoriesSuccess = (categories) => {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    payload: {
      ids: getIds(categories),
      items: buildObjectOfItems(categories),
    },
  };
};

const loadCategoriesFailure = (message) => {
  return {
    type: LOAD_CATEGORIES_FAILURE,
    payload: message,
  };
};

const creatingCategory = () => {
  return {
    type: CREATING_CATEGORY,
  };
};

const createCategorySuccess = (category) => {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    payload: category,
  };
};

const createCategoryFailure = (message) => {
  return {
    type: CREATE_CATEGORY_FAILURE,
    payload: message,
  };
};

const updatingCategory = () => {
  return {
    type: UPDATING_CATEGORY,
  };
};

const updateCategorySuccess = (category) => {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    payload: category,
  };
};

const updateCategoryFailure = (message) => {
  return {
    type: UPDATE_CATEGORY_FAILURE,
    payload: message,
  };
};

const deletingCategory = () => {
  return {
    type: DELETING_CATEGORY,
  };
};

const deleteCategorySuccess = (id) => {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: id,
  };
};

const deleteCategoryFailure = (message) => {
  return {
    type: DELETE_CATEGORY_FAILURE,
    payload: message,
  };
};
