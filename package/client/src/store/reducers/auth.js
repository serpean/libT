import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/updateObject';

const initialState = {
  userId: null,
  token: null,
  authLoading: false,
  error: null,
  authRedirectPath: '/'
};
const authStart = (state, action) => {
  return updateObject(state, { error: null, authLoading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    authLoading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    authLoading: false
  });
};

const errorHandler = (state, action) => {
  return updateObject(state, {
    error: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.ERROR_HANDLER:
      return errorHandler(state, action);
    default:
      return state;
  }
};
