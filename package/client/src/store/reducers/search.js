import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/updateObject';

const initialState = {
  res: [],
  totalResources: 0,
  resourcePage: 1,
  loading: false
};

const searchStartOne = (state, action) => {
  return updateObject(state, {
    query: action.query
  });
};

const searchStartTwo = (state, action) => {
  return updateObject(state, {
    res: []
  });
};

const searchStartThree = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const searchSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    res: [...state.res, ...action.res],
    totalResources: action.totalResources
  });
};

const updateRes = (state, action) => {
  return updateObject(state, {
    resourcePage: action.resourcePage
  });
};

const searchFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_START_ONE:
      return searchStartOne(state, action);
    case actionTypes.SEARCH_START_TWO:
      return searchStartTwo(state, action);
    case actionTypes.SEARCH_START_THREE:
      return searchStartThree(state, action);
    case actionTypes.SEARCH_SUCCESS:
      return searchSuccess(state, action);
    case actionTypes.SEARCH_FAIL:
      return searchFail(state, action);
    case actionTypes.UPDATE_SEARCH:
      return updateRes(state, action);
    default:
      return state;
  }
};
