import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/updateObject';

const initialState = {
  status: 0,
  id: null,
  type: null,
  title: null,
  authors: [],
  image: null,
  description: null,
  lists: [],
  error: null,
  loadingResource: false,
  loadingStatus: false
};

const resourceStart = (state, action) => {
  return updateObject(state, {
    id: action.id,
    type: action.resourceType,
    title: null,
    authors: [],
    image: null,
    description: null,
    error: null,
    loadingResource: true
  });
};

const resourceSuccess = (state, action) => {
  return updateObject(state, {
    title: action.title,
    authors: action.authors,
    image: action.image,
    description: action.description,
    loadingResource: false
  });
};

const resourceFail = (state, action) => {
  return updateObject(state, {
    id: null,
    type: null,
    title: null,
    authors: [],
    image: null,
    description: null,
    error: action.error,
    loadingResource: false
  });
};

const resourceStatusStart = (state, action) => {
  return updateObject(state, {
    status: 0,
    lists: [],
    loadingStatus: true
  });
};

const resourceStatusSuccess = (state, action) => {
  return updateObject(state, {
    status: action.status,
    lists: action.lists,
    loadingStatus: false
  });
};

const resourceStatusFail = (state, action) => {
  return updateObject(state, {
    status: 0,
    lists: [],
    loadingStatus: false,
    error: action.error
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESOURCE_START:
      return resourceStart(state, action);
    case actionTypes.RESOURCE_SUCCESS:
      return resourceSuccess(state, action);
    case actionTypes.RESOURCE_FAIL:
      return resourceFail(state, action);
    case actionTypes.RESOURCE_STATUS_START:
      return resourceStatusStart(state, action);
    case actionTypes.RESOURCE_STATUS_SUCCESS:
      return resourceStatusSuccess(state, action);
    case actionTypes.RESOURCE_STATUS_FAIL:
      return resourceStatusFail(state, action);
    default:
      return state;
  }
};
