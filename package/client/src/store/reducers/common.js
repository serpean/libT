import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/updateObject';

const initialState = {
  error: null
};

const errorHandler = (state, action) => {
  return updateObject(state, {
    error: false
  });
};

const addError = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ERROR_HANDLER:
      return errorHandler(state, action);
    case actionTypes.ADD_ERROR:
      return addError(state, action);
    default:
      return state;
  }
};
