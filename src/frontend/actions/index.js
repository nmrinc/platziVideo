import actionTypes from "./actionTypes";

export const setFavourite = payload => ({
  type: actionTypes.SET_FAVOURITE,
  payload: payload,
});

export const removeFavourite = payload => ({
  type: actionTypes.REMOVE_FAVOURITE,
  payload: payload,
});

export const loginRequest = payload => ({
  type: actionTypes.LOGIN_REQUEST,
  payload: payload
});

export const logoutRequest = payload => ({
  type: actionTypes.LOGOUT_REQUEST,
  payload: payload
});

export const signupRequest = payload => ({
  type: actionTypes.SIGNUP_REQUEST,
  payload: payload
});

export const getVideoSource = payload => ({
  type: actionTypes.GET_VIDEO_SOURCE,
  payload: payload
});

export const searchVideo = payload => ({
  type: actionTypes.SEARCH_VIDEO,
  payload: payload
});