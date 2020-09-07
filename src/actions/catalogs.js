import axios from '../utils/axios';
import {
  ADD_CATALOG,
  ADD_CATALOGS,
  SET_CATALOG_LOADING,
  SET_CATALOG_REQUEST,
  SET_CATALOG_IDS,
  RESET_CATALOG,
  CATALOG_API,
} from '../constants/catalogs';
import { addProducts } from './products';
import { getIds, getValues, buildObjectOfItems } from '../utils/objects';

export const loadCatalogs = (page = 1, limit = 5) => {
  return async (dispatch, getState) => {
    const {
      catalogs: { req },
    } = getState();

    let ids;
    for (let item of req) {
      if (item.page === page && item.limit === limit) {
        ids = [...item.ids];
      }
    }

    if (ids) {
      dispatch(setCatalogIds(ids));
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${CATALOG_API}?page=${page}&limit=${limit}`,
      method: 'get',
    });

    const { nodes, total } = response.data;
    const currentPageIds = getIds(nodes);
    const currentReq = { page: page, limit: limit, ids: currentPageIds };
    dispatch(setCatalogRequest(currentReq, total));
    dispatch(addCatalogs(nodes));
    dispatch(setCatalogIds(currentPageIds));

    dispatch(setLoading(false));
  };
};

export const createCatalog = (data) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    await axios({
      url: CATALOG_API,
      method: 'post',
      data: data,
    });

    dispatch(resetCatalog());
    dispatch(setLoading(false));
  };
};

export const updateCatalog = (id, data) => {
  return async (dispatch, getState) => {
    let url = `${CATALOG_API}/${id}`;

    dispatch(setLoading(true));

    const response = await axios({
      url: url,
      method: 'put',
      data: data,
    });

    dispatch(addCatalog(response.data));
    dispatch(setLoading(false));
  };
};

export const deleteCatalog = (id) => {
  return async (dispatch, getState) => {
    let url = `${CATALOG_API}/${id}`;

    dispatch(setLoading(true));

    await axios({
      url: url,
      method: 'delete',
    });

    dispatch(resetCatalog());
    dispatch(setLoading(false));
  };
};

export const getCatalog = (id) => {
  return async (dispatch, getState) => {
    const {
      catalogs: { items },
    } = getState();

    if (items[id]) {
      return;
    }

    dispatch(setLoading(true));

    const response = await axios({
      url: `${CATALOG_API}/${id}`,
      method: 'get',
    });
    dispatch(addCatalog(response.data));

    dispatch(setLoading(false));
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_CATALOG_LOADING,
    payload: { loading },
  };
};

export const addCatalog = (catalog) => (dispatch) => {
  const products = getValues([catalog], 'products');
  dispatch(addProducts(products));

  catalog.products = getIds(catalog.products);

  dispatch({
    type: ADD_CATALOG,
    payload: { catalog },
  });
};

export const addCatalogs = (catalogs) => (dispatch) => {
  const products = getValues(catalogs, 'products');
  dispatch(addProducts(products));

  catalogs.forEach((catalog) => {
    catalog.products = getIds(catalog.products);
  });

  dispatch({
    type: ADD_CATALOGS,
    payload: {
      catalogs: buildObjectOfItems(catalogs),
    },
  });
};

export const setCatalogRequest = (req, total) => {
  return {
    type: SET_CATALOG_REQUEST,
    payload: { req, total },
  };
};

export const setCatalogIds = (ids) => {
  return {
    type: SET_CATALOG_IDS,
    payload: { ids },
  };
};

export const resetCatalog = () => {
  return {
    type: RESET_CATALOG,
  };
};
