import * as actionTypes from './actionTypes';

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

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
    authLoading: false
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
    token: null
  };
};

export const errorHandler = () => {
  return { type: actionTypes.ERROR_HANDLER, error: null };
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
    dispatch(authStart);
    let options, url;
    if (params.isSignUp) {
      url = 'http://localhost:3001/api/auth/login';
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: params.email,
          password: params.password
        })
      };
    } else {
      url = 'http://localhost:3001/api/auth/signup';
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: params.email,
          password: params.password,
          name: params.password
        })
      };
    }

    fetch(url, options)
      .then(res => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        return res.json();
      })
      .then(resData => {
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);

        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        dispatch(authSuccess(resData.token, resData.userId));
        dispatch(checkAuthTimeout(remainingMilliseconds));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

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
