import AppApi from "../../util/appApi";
import * as actionTypes from './actionTypes';
import { history } from '../configureStore';
import { addError } from './common';

export const authStart = () => {
  return {
    authLoading: true,
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    authLoading: false
  };
};

export const authFail = () => {
  return {
    type: actionTypes.AUTH_FAIL,
    authLoading: false
  };
};

export const logout = () => {
  history.push('/');
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
    token: null
  };
};
export const checkAuthTimeout = milliseconds => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, milliseconds);
  };
};

export const auth = params => {
  return dispatch => {
    dispatch(authStart());
    let reqData;
    if (params.isSignUp) {
      reqData = {
        url: '/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          email: params.email,
          password: params.password
        })
      };
    } else {
      reqData = {
        url: '/auth/signup',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          email: params.email,
          password: params.password,
          name: params.name
        })
      };
    }

    AppApi.request(reqData)
      .then(res => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Could not authenticate you!');
        }

        console.log(res)
        return res.data;
      })
      .then(resData => {
        localStorage.setItem('token', resData.user.token);
        localStorage.setItem('userId', resData.user.username);

        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        dispatch(authSuccess(resData.user.token, resData.user.username));
        dispatch(checkAuthTimeout(remainingMilliseconds));
        history.push('/');
      })
      .catch(err => {
        dispatch(authFail());
        console.log(err);
        dispatch(addError(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('expiryDate'));

    if (!token || expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem('userId');
      const remainingMilliseconds =
        new Date(expirationDate).getTime() - new Date().getTime();
      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout(remainingMilliseconds));
    }
  };
};

export const updateUser = userId => {
  localStorage.setItem('userId', userId);
  return {
    type: actionTypes.UPDATE_USER,
    userId: userId
  };
};
