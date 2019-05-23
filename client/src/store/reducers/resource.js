import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/updateObject';

const initialState = {
  status: 0
};

const resourceStart = (state, action) => {
  return updateObject(state, { status: 0 });
};

const resourceSuccess = (state, action) => {
  return updateObject(state, { status: action.status });
};

const resourceFail = (state, action) => {
  return updateObject(state, { status: 0 });
};

export default (state = initialState, action) => {
  switch (action.actionType) {
    case actionTypes.RESOURCE_START:
      return resourceStart(state, action);
    case actionTypes.RESOURCE_SUCCESS:
      return resourceSuccess(state, action);
    case actionTypes.RESOURCE_FAIL:
      return resourceFail(state, action);
    default:
      return state;
  }
};
