import * as actionTypes from './actionTypes';

export const errorHandler = () => {
  return { type: actionTypes.ERROR_HANDLER, error: null };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};
