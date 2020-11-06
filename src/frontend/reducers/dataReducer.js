/* eslint-disable no-unreachable */
import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  errMsg: null,
  data: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${actionTypes.GET_DATA}_PENDING`:
      return {
        ...state,
        isLoading: true,
        data: null,
      };
      break;
    case `${actionTypes.GET_DATA}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
      };
      break;
    case `${actionTypes.GET_DATA}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
      break;
    case actionTypes.SET_FAVOURITE:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        data: {
          ...state.data,
          mylist: [...state.data.mylist, action.payload],
        },
      };
      break;
    case actionTypes.REMOVE_FAVOURITE:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        data: {
          ...state.data,
          mylist: state.data.mylist.filter((items) => items.id !== action.payload),
        },
      };
      break;
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        data: {
          ...state.data,
          user: action.payload,
        },
      };
      break;
    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        data: {
          ...state.data,
          user: {},
        },
      };
      break;
    case actionTypes.GET_VIDEO_SOURCE:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        data: {
          ...state.data,
          playing: state.data.trends.find((item) => item.id === Number(action.payload)) || state.data.originals.find((item) => item.id === Number(action.payload)) || [],
        },
      };
      break;
    case actionTypes.SEARCH_VIDEO:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        data: {
          ...state.data,
          findings: action.payload ? [...state.data.trends, ...state.data.originals].filter((item) => item.title.toLowerCase().includes(action.payload.toLowerCase())) : [],
        },
      };
      break;
    default:
      return state;
      break;
  }
};

export default dataReducer;
