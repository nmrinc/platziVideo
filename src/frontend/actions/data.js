import actionTypes from './actionTypes';
import jsonData from '../data/initialState.json';


export const getData = () => async dispatch => {
  try {
    await dispatch(getDataPending());
    const response = jsonData;
    await dispatch(getDataFulfilled(response));
  } catch (error) {
    dispatch(getDataRejected(error.message));
  }
}

export const getDataPending = () => ({
  type: `${actionTypes.GET_DATA}_PENDING`,
});

export const getDataFulfilled = response => ({
  type: `${actionTypes.GET_DATA}_FULFILLED`,
  payload: response,
});

export const getDataRejected = error => ({
  type: `${actionTypes.GET_DATA}_REJECTED`,
  payload: error,
});
