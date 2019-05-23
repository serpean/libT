import * as actionTypes from './actionTypes';

export const resourceStart = () => {
  return {
    type: actionTypes.RESOURCE_START,
    status: null
  };
};

export const resourceSuccess = status => {
  return {
    type: actionTypes.RESOURCE_SUCCESS,
    status: status
  };
};

export const resourceFail = error => {
  return {
    type: actionTypes.RESOURCE_FAIL,
    status: null,
    error: error
  };
};

export const getResourceStatus = () => {
  return dispatch => {
    dispatch(resourceStart());
    //fetch()
  };
};
