import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/updateObject';

const initialState = {
  user: null,
  loadingProfile: false,
  tab: 0,
  isFollowing: false,
  isEditing: false,
  editProfile: null,
  editLoading: false,
  loadingFollowing: false
};

const profileStart = (state, action) => {
  return updateObject(state, {
    loadingProfile: true
  });
};

const profileSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    loadingProfile: false
  });
};

const profileFail = (state, action) => {
  return updateObject(state, {
    loadingProfile: false
  });
};

const handleTab = (state, action) => {
  return updateObject(state, {
    tab: action.tab
  });
};

const editProfileStart = (state, action) => {
  return updateObject(state, {
    editProfile: action.editProfile,
    isEditing: true,
    editLoading: false
  });
};

const editProfileLoadStart = (state, action) => {
  return updateObject(state, {
    editLoading: true
  });
};

const editProfileSuccess = (state, action) => {
  return updateObject(state, {
    user: {
      ...state.user,
      username: action.user.username,
      bio: action.user.bio,
      image: action.user.image
    },
    isEditing: false,
    editLoading: false
  });
};

const editProfileFail = (state, action) => {
  return updateObject(state, {
    isEditing: false,
    editProfile: null,
    editLoading: false
  });
};

const followUser = (state, action) => {
  return updateObject(state, {
    isFollowing: action.isFollowing
  });
};

const isFollowingStart = (state, action) => {
  return updateObject(state, {
    isFollowing: false,
    loadingFollowing: true
  });
};

const isFollowingSuccess = (state, action) => {
  return updateObject(state, {
    isFollowing: action.isFollowing,
    loadingFollowing: false
  });
};

const isFollowingFail = (state, action) => {
  return updateObject(state, {
    isFollowing: false,
    loadingFollowing: false
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_START:
      return profileStart(state, action);
    case actionTypes.PROFILE_SUCCESS:
      return profileSuccess(state, action);
    case actionTypes.PROFILE_FAIL:
      return profileFail(state, action);
    case actionTypes.HANDLE_TAB:
      return handleTab(state, action);
    case actionTypes.EDIT_PROFILE_START:
      return editProfileStart(state, action);
    case actionTypes.EDIT_PROFILE_LOAD_START:
      return editProfileLoadStart(state, action);
    case actionTypes.EDIT_PROFILE_SUCCESS:
      return editProfileSuccess(state, action);
    case actionTypes.EDIT_PROFILE_FAIL:
      return editProfileFail(state, action);
    case actionTypes.FOLLOW_USER:
      return followUser(state, action);
    case actionTypes.ISFOLLOWING_START:
      return isFollowingStart(state, action);
    case actionTypes.ISFOLLOWING_SUCCESS:
      return isFollowingSuccess(state, action);
    case actionTypes.ISFOLLOWING_FAIL:
      return isFollowingFail(state, action);
    default:
      return state;
  }
};
