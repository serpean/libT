import * as actionTypes from './actionTypes';

export const errorHandler = () => {
  return { type: actionTypes.ERROR_HANDLER, error: null };
};

export const addError = error => {
  return { type: actionTypes.ADD_ERROR, error: error };
};
