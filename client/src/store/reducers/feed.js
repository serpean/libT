import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/updateObject';

const initialState = {
  posts: [],
  totalPosts: 0,
  postPage: 1,
  postsLoading: true,
  error: null
};

const feedStart = (state, action) => {
  return updateObject(state, {
    postsLoading: true,
    posts: []
  });
};

const feedSuccess = (state, action) => {
  return updateObject(state, {
    posts: action.posts,
    totalPosts: action.totalPosts,
    postsLoading: false
  });
};

const feedFail = (state, action) => {
  return updateObject(state, {
    postsLoading: false,
    error: action.error
  });
};

const updatePages = (state, action) => {
  return updateObject(state, {
    postPage: action.page
  });
};

const errorHandler = (state, action) => {
  return updateObject(state, {
    error: false
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FEED_START:
      return feedStart(state, action);
    case actionTypes.FEED_SUCCESS:
      return feedSuccess(state, action);
    case actionTypes.FEED_FAIL:
      return feedFail(state, action);
    case actionTypes.UPDATE_PAGES:
      return updatePages(state, action);
    case actionTypes.ERROR_HANDLER:
      return errorHandler(state, action);
    default:
      return state;
  }
};
