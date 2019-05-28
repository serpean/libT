import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/updateObject';

const initialState = {
  wantList: null,
  inProgressList: null,
  doneList: null,
  extraLists: [],
  actualList: null,
  loadingList: false,
  loadingLists: false,
  error: null,
  isEditing: false,
  editList: null,
  editLoading: false
};

const listsStart = (state, action) => {
  return updateObject(state, {
    loadingLists: true,
    extraLists: []
  });
};

const listsSuccess = (state, action) => {
  return updateObject(state, {
    wantList: action.wantList,
    inProgressList: action.inProgressList,
    doneList: action.doneList,
    extraLists: action.extraLists,
    loadingLists: false
  });
};

const listsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingLists: false
  });
};

const listStart = (state, action) => {
  return updateObject(state, {
    loadingList: true
  });
};

const listSuccess = (state, action) => {
  return updateObject(state, {
    actualList: action.actualList,
    loadingList: false
  });
};

const listFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingList: false
  });
};

const errorHandler = (state, action) => {
  return updateObject(state, {
    error: false
  });
};

const editListStart = (state, action) => {
  return updateObject(state, {
    editList: action.editList,
    isEditing: true,
    editLoading: false
  });
};

const editListLoadStart = (state, action) => {
  return updateObject(state, {
    editLoading: true
  });
};

const editListSuccess = (state, action) => {
  return updateObject(state, {
    isEditing: false,
    editLoading: false
  });
};

const editListFail = (state, action) => {
  return updateObject(state, {
    isEditing: false,
    editLoading: false,
    error: action.error
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LISTS_START:
      return listsStart(state, action);
    case actionTypes.LISTS_SUCCESS:
      return listsSuccess(state, action);
    case actionTypes.LISTS_FAIL:
      return listsFail(state, action);
    case actionTypes.LIST_START:
      return listStart(state, action);
    case actionTypes.LIST_SUCCESS:
      return listSuccess(state, action);
    case actionTypes.LIST_FAIL:
      return listFail(state, action);
    case actionTypes.EDIT_LIST_START:
      return editListStart(state, action);
    case actionTypes.EDIT_LIST_LOAD_START:
      return editListLoadStart(state, action);
    case actionTypes.EDIT_LIST_SUCCESS:
      return editListSuccess(state, action);
    case actionTypes.EDIT_LIST_FAIL:
      return editListFail(state, action);
    case actionTypes.ERROR_HANDLER:
      return errorHandler(state, action);
    default:
      return state;
  }
};
