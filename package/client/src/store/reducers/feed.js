import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/updateObject';

const initialState = {
  posts: [],
  totalPosts: 0,
  postPage: 1,
  postsLoading: true
};

const feedStart = (state, action) => {
  return updateObject(state, {
    postsLoading: true,
    posts: []
  });
};

const feedSuccess = (state, action) => {
  console.log([...state.posts, ...action.posts]);
  return updateObject(state, {
    posts: [...state.posts, ...action.posts],
    totalPosts: action.totalPosts,
    postsLoading: false
  });
};

const feedFail = (state, action) => {
  return updateObject(state, {
    postsLoading: false
  });
};

const updatePages = (state, action) => {
  return updateObject(state, {
    postPage: action.postPage
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
    default:
      return state;
  }
};
