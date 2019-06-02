import * as actionTypes from './actionTypes';
import { addError } from './common';
import { updateUser } from './auth';

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

export const editProfileSuccess = user => {
  return {
    user: user,
    isEditing: false,
    editProfile: null,
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
  console.log(user);
  return dispatch => dispatch(editProfileStart(user));
};

export const cancelProfileEditHandler = () => {
  return dispatch => dispatch(editProfileFail());
};

export const finishProfileEditHandler = profileData => {
  return async dispatch => {
    dispatch(editProfileLoadStart());
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('username', profileData.username);
    formData.append('bio', profileData.bio);
    formData.append('image', profileData.image);
    let url = `/api/user/${userId}`;
    let method = 'PUT';
    try {
      const res = await fetch(url, {
        method: method,
        body: formData,
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      if (res.status === 401) {
        throw new Error('Username already take it!');
      }
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('User update failed!');
      }
      const resData = await res.json();
      dispatch(editProfileSuccess(resData.user));
      dispatch(updateUser(resData.user.username));
    } catch (err) {
      dispatch(editProfileFail(err));
      dispatch(addError(err));
    }
  };
};

export const followUser = (followers, following) => {
  return {
    type: actionTypes.FOLLOW_USER,
    followers: followers,
    following: following
  };
};

export const onFollow = followUser => {
  return async dispatch => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/user/follow/${followUser}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resData = await res.json();

    // get followers and following
  };
};
