export const ADD_ORDERITEMS = 'ADD_ORDERITEMS';
export const SET_ORDERITEM_LOADING = 'SET_ORDERITEM_LOADING';
export const SET_ORDERITEM_REQUEST = 'SET_ORDERITEM_REQUEST';
export const SET_ORDERITEM_IDS = 'SET_ORDERITEM_IDS';

export const ORDERITEM_API = (id) => `${process.env.REACT_APP_API_URL}/orders/${id}/items`;
