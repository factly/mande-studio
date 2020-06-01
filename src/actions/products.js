import axios from '../utils/axios';
import {
  baseUrl,
  LOADING_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILURE,
  CREATING_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  LOADING_PRODUCT_DETAILS,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE,
  UPDATING_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETING_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from '../constants/products';

export const loadProducts = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    dispatch(loadingProducts());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadProductsFailure(error.message));
    });

    if (response) {
      dispatch(loadProductsSuccess(response.data));
    }
  };
};

export const createProduct = (data) => {
  return async (dispatch, getState) => {
    dispatch(creatingProduct());

    const response = await axios({
      url: baseUrl,
      method: 'post',
      data: data,
    }).catch((error) => {
      dispatch(createProductFailure(error.message));
    });

    if (response) {
      dispatch(createProductSuccess(response.data));
    }
  };
};

export const getProductDetails = (id) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(loadingProductDetails());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(getProductDetailsFailure(error.message));
    });

    if (response) {
      dispatch(getProductDetailsSuccess(response.data));
    }
  };
};

export const updateProduct = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(updatingProduct());

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    }).catch((error) => {
      dispatch(updateProductFailure(error.message));
    });

    if (response) {
      dispatch(updateProductSuccess());
    }
  };
};

export const deleteProduct = (id, index) => {
  return async (dispatch, getState) => {
    let url = `${baseUrl}/${id}`;

    dispatch(deletingProduct());

    const response = await axios({
      url: url,
      method: 'delete',
    }).catch((error) => {
      dispatch(deleteProductFailure(error.message));
    });

    if (response) {
      dispatch(deleteProductSuccess(index));
    }
  };
};

const loadingProducts = () => {
  return {
    type: LOADING_PRODUCTS,
  };
};

const loadProductsSuccess = (data) => {
  return {
    type: LOAD_PRODUCTS_SUCCESS,
    payload: {
      items: data.nodes,
      total: data.total,
    },
  };
};

const loadProductsFailure = (message) => {
  return {
    type: LOAD_PRODUCTS_FAILURE,
    payload: message,
  };
};

const creatingProduct = () => {
  return {
    type: CREATING_PRODUCT,
  };
};

const createProductSuccess = (product) => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload: product,
  };
};

const createProductFailure = (message) => {
  return {
    type: CREATE_PRODUCT_FAILURE,
    payload: message,
  };
};

const loadingProductDetails = () => {
  return {
    type: LOADING_PRODUCT_DETAILS,
  };
};

const getProductDetailsSuccess = (product) => {
  return {
    type: GET_PRODUCT_DETAILS_SUCCESS,
    payload: product,
  };
};

const getProductDetailsFailure = (message) => {
  return {
    type: GET_PRODUCT_DETAILS_FAILURE,
    payload: message,
  };
};

const updatingProduct = () => {
  return {
    type: UPDATING_PRODUCT,
  };
};

const updateProductSuccess = () => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
  };
};

const updateProductFailure = (message) => {
  return {
    type: UPDATE_PRODUCT_FAILURE,
    payload: message,
  };
};

const deletingProduct = () => {
  return {
    type: DELETING_PRODUCT,
  };
};

const deleteProductSuccess = (index) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: index,
  };
};

const deleteProductFailure = (message) => {
  return {
    type: DELETE_PRODUCT_FAILURE,
    payload: message,
  };
};
