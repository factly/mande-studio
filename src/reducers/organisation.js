import {
  SET_ORGANISATION_LOADING,
  ADD_ORGANISATION
} from '../constants/organisations';

const initialState = {
  details: {},
  loading: true,
  selected: 0,
};

export default function organisations(state = initialState, action = {}) {
  if (!action.payload) {
    return state;
  }
  switch (action.type) {
    case SET_ORGANISATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_ORGANISATION:

      return {
        details: action.payload,
        selected: action.payload["id"],
        loading: false
      };
    default:
      return state;
  }
}
