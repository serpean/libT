import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/updateObject';

const initialState = {
  userId: null,
  token: null,
  authLoading: false,
  authRedirectPath: '/'
};
const authStart = (state, action) => {
  return updateObject(state, { authLoading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    authLoading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    authLoading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const updateUser = (state, action) => {
  return updateObject(state, { userId: action.userId });
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
    case actionTypes.UPDATE_USER:
      return updateUser(state, action);
    default:
      return state;
  }
};
