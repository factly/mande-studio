export const LOADING_DATASETS = 'LOADING_DATASETS';
export const LOAD_DATASETS_SUCCESS = 'LOAD_DATASETS_SUCCESS';
export const SET_DATASETS_LIST_TOTAL = 'SET_DATASETS_LIST_TOTAL';
export const ADD_DATASETS_LIST_REQUEST = 'ADD_DATASETS_LIST_REQUEST';
export const SET_DATASETS_LIST_CURRENT_PAGE = 'SET_DATASETS_LIST_CURRENT_PAGE';
export const LOAD_DATASETS_FAILURE = 'LOAD_DATASETS_FAILURE';
export const CREATING_DATASET = 'CREATING_DATASET';
export const CREATE_DATASET_SUCCESS = 'CREATE_DATASET_SUCCESS';
export const CREATE_DATASET_FAILURE = 'CREATE_DATASET_FAILURE';
export const UPDATING_DATASET = 'UPDATING_DATASET';
export const UPDATE_DATASET_SUCCESS = 'UPDATE_DATASET_SUCCESS';
export const UPDATE_DATASET_FAILURE = 'UPDATE_DATASET_FAILURE';
export const DELETING_DATASET = 'DELETING_DATASET';
export const DELETE_DATASET_SUCCESS = 'DELETE_DATASET_SUCCESS';
export const DELETE_DATASET_FAILURE = 'DELETE_DATASET_FAILURE';

export const baseUrl = `${process.env.REACT_APP_API_URL}/datasets`;