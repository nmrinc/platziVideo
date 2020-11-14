/* eslint-disable no-unreachable */
import actionTypes from '../actions/actionTypes';

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_FAVOURITE:
      return {
        ...state,
        mylist: [...state.mylist, action.payload],
      };
      break;
    case actionTypes.REMOVE_FAVOURITE:
      return {
        ...state,
        mylist: state.mylist.filter((items) => items.id !== action.payload),
      };
      break;
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        user: action.payload,
      };
      break;
    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        user: {},
      };
      break;
    case actionTypes.GET_VIDEO_SOURCE:
      return {
        ...state,
        playing: state.trends.find((item) => item.id === Number(action.payload)) || state.originals.find((item) => item.id === Number(action.payload)) || [],
      };
      break;
    case actionTypes.SEARCH_VIDEO:
      return {
        ...state,
        findings: action.payload ? [...state.trends, ...state.originals].filter((item) => item.title.toLowerCase().includes(action.payload.toLowerCase())) : [],
      };
      break;
    default:
      return state;
      break;
  }
};

export default reducer;
