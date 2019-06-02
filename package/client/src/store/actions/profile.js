import * as actionTypes from './actionTypes';
import { addError } from './common';

export const profileStart = () => {
  return {
    profileLoading: true,
    type: actionTypes.PROFILE_START
  };
};

export const profileSuccess = user => {
  return {
    user: user,
    profileLoading: false,
    type: actionTypes.PROFILE_SUCCESS
  };
};

export const profileFail = () => {
  return {
    type: actionTypes.PROFILE_FAIL,
    profileLoading: false
  };
};

export const loadProfile = username => {
  return async dispatch => {
    try {
      dispatch(profileStart());
      const res = await fetch(`/api/user/${username}`);
      if (res.status !== 200 && res.status !== 304) {
        throw new Error('Failed to fetch user.');
      }
      const resData = await res.json();
      console.log(resData);
      dispatch(profileSuccess(resData.user));
    } catch (err) {
      dispatch(profileFail());
      dispatch(addError(err));
    }
  };
};

export const handleTab = tab => {
  return {
    type: actionTypes.HANDLE_TAB,
    tab: tab
  };
};

export const editProfileStart = data => {
  return {
    isEditing: true,
    editProfile: data,
    type: actionTypes.EDIT_PROFILE_START
  };
};

export const editProfileSuccess = () => {
  return {
    isEditing: false,
    editPost: null,
    editProfileLoading: false,
    type: actionTypes.EDIT_PROFILE_SUCCESS
  };
};

export const editProfileFail = () => {
  return {
    isEditing: false,
    editProfile: null,
    editProfileLoading: false,
    type: actionTypes.EDIT_PROFILE_FAIL
  };
};

export const editProfileLoadStart = () => {
  return {
    editLoading: true,
    type: actionTypes.EDIT_PROFILE_LOAD_START
  };
};

export const updateProfileHandler = user => {
  return dispatch => dispatch(editProfileStart(user));
};

export const cancelProfileEditHandler = () => {
  return dispatch => dispatch(editProfileFail());
};

export const finishProfileEditHandler = (profileData, editProfile) => {
  return async dispatch => {
    dispatch(editProfileLoadStart());
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('username', profileData.username);
    formData.append('bio', profileData.bio);
    formData.append('image', profileData.public);
    let url = '/api/user/' + editProfile.username;
    let method = 'PUT';
    try {
      const res = await fetch(url, {
        method: method,
        body: formData,
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Creating or Editing a list failed!');
      }
      const resData = await res.json();
      dispatch(editProfileSuccess(resData));
      //cambiar userId del estado
    } catch (err) {
      dispatch(editProfileFail(err));
      dispatch(addError(err));
    }
  };
};
