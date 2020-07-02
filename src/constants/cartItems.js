export const ADD_CARTITEMS = 'ADD_CARTITEMS';
export const SET_CARTITEM_LOADING = 'SET_CARTITEM_LOADING';
export const SET_CARTITEM_REQUEST = 'SET_CARTITEM_REQUEST';
export const SET_CARTITEM_IDS = 'SET_CARTITEM_IDS';

export const CARTITEM_API = (id) => `${process.env.REACT_APP_API_URL}/carts/${id}/items`;
