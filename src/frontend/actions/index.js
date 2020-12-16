import axios from 'axios';
import actionTypes from './actionTypes';

export const setFavourite = (payload) => ({
  type: actionTypes.SET_FAVOURITE,
  payload,
});

export const removeFavourite = (payload) => ({
  type: actionTypes.REMOVE_FAVOURITE,
  payload,
});

export const loginRequest = (payload) => ({
  type: actionTypes.LOGIN_REQUEST,
  payload,
});

export const logoutRequest = (payload) => ({
  type: actionTypes.LOGOUT_REQUEST,
  payload,
});

export const signupRequest = (payload) => ({
  type: actionTypes.SIGNUP_REQUEST,
  payload,
});

export const getVideoSource = (payload) => ({
  type: actionTypes.GET_VIDEO_SOURCE,
  payload,
});

export const searchVideo = (payload) => ({
  type: actionTypes.SEARCH_VIDEO,
  payload,
});

export const setError = (payload) => ({
  type: actionTypes.SET_ERROR,
  payload,
});

//@context Sign up action
export const registerUser = (payload, redirectUrl) => {
  //@o We'll return a function that will make an axios post call passing the payload to the api endpoint.
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)
      //@a pass the data to the signup request action created before.
      .then(({ data }) => dispatch(signupRequest(data)))
      //@a Set a redirection to the given url.
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => dispatch(setError(err)));
  };
};

//@context Sign in action
export const loginUser = ({ email, password }, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        password,
        username: email,
      },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`;
        document.cookie = `id=${data.user.id}`;
        dispatch(loginRequest(data.user));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => dispatch(setError(err)));
  };
};
