import axios from '../utils/axios';
import {
  baseUrl,
  ADD_PRODUCTS_LIST_REQUEST,
  SET_PRODUCTS_LIST_CURRENT_PAGE,
  LOADING_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  SET_PRODUCTS_LIST_TOTAL,
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
import { loadCategoriesSuccess } from './categories';
import { loadCurrenciesSuccess } from './currencies';
import { loadProductTypesSuccess } from './product_types';
import { loadTagsSuccess } from './tags';
import { getIds, getValues, deleteKeys, buildObjectOfItems } from '../utils/objects';

export const loadProducts = (page, limit) => {
  return async (dispatch, getState) => {
    let url = baseUrl;
    if (page && limit) {
      url = `${url}?page=${page}&limit=${limit}`;
    }

    const {
      products: { req },
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

    dispatch(loadingProducts());

    const response = await axios({
      url: url,
      method: 'get',
    }).catch((error) => {
      dispatch(loadProductsFailure(error.message));
    });

    if (response) {
      const { nodes, total } = response.data;
      const currentPageIds = getIds(nodes);
      const req = { page: page, limit: limit, ids: currentPageIds };

      const categories = getValues(nodes, 'categories');
      dispatch(loadCategoriesSuccess(categories));

      const currencies = getValues(nodes, 'currency');
      dispatch(loadCurrenciesSuccess(currencies));

      const productTypes = getValues(nodes, 'product_type');
      dispatch(loadProductTypesSuccess(productTypes));

      const tags = getValues(nodes, 'tags');
      dispatch(loadTagsSuccess(tags));

      nodes.forEach((product) => {
        product.categories = getIds(product.categories);
        product.tags = getIds(product.tags);
      });

      dispatch(addListRequest(req));
      dispatch(loadProductsSuccess(nodes));
      dispatch(setListCurrentPage(currentPageIds));
      dispatch(setProductsListTotal(total));
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
      const product = response.data;
      product.categories = getIds(product.categories);
      product.tags = getIds(product.tags);
      dispatch(updateProductSuccess(product));
    }
  };
};

export const deleteProduct = (id) => {
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
      dispatch(deleteProductSuccess(id));
    }
  };
};

const loadingProducts = () => {
  return {
    type: LOADING_PRODUCTS,
  };
};

const setProductsListTotal = (total) => {
  return {
    type: SET_PRODUCTS_LIST_TOTAL,
    payload: total,
  };
};

const addListRequest = (req) => {
  return {
    type: ADD_PRODUCTS_LIST_REQUEST,
    payload: req,
  };
};

const setListCurrentPage = (ids) => {
  return {
    type: SET_PRODUCTS_LIST_CURRENT_PAGE,
    payload: ids,
  };
};

export const loadProductsSuccess = (products) => {
  return {
    type: LOAD_PRODUCTS_SUCCESS,
    payload: {
      items: buildObjectOfItems(deleteKeys(products, ['currency', 'product_type'])),
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

const updateProductSuccess = (product) => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload: deleteKeys([product], ['currency', 'product_type'])[0],
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

const deleteProductSuccess = (id) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: id,
  };
};

const deleteProductFailure = (message) => {
  return {
    type: DELETE_PRODUCT_FAILURE,
    payload: message,
  };
};
