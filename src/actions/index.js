import actionTypes from "./actionTypes";

export const setFavourite = payload => ({
  type: actionTypes.SET_FAVOURITE,
  payload: payload,
});

export const removeFavourite = payload => ({
  type: actionTypes.REMOVE_FAVOURITE,
  payload: payload,
});