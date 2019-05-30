import * as actionTypes from './actionTypes';
import { addError } from './common';

export const feedStart = () => {
  return {
    postsLoading: true,
    posts: [],
    type: actionTypes.FEED_START
  };
};

export const feedSuccess = data => {
  console.log(data);
  return {
    posts: data.posts,
    totalPosts: data.totalPosts,
    postsLoading: false,
    type: actionTypes.FEED_SUCCESS
  };
};

export const feedFail = () => {
  return {
    type: actionTypes.FEED_FAIL,
    postsLoading: false
  };
};

export const updatePages = page => {
  return {
    postPage: page,
    type: actionTypes.UPDATE_PAGES
  };
};

export const loadPosts = (direction, page) => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!direction) {
      dispatch(feedStart());
    }
    if (direction === 'more') {
      page++;
      dispatch(updatePages(page));
    }
    let postPage = page || 1;

    console.log('http://localhost:3001/api/posts/posts?page=' + postPage);
    fetch('http://localhost:3001/api/posts/posts?page=' + postPage, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch posts.');
        }
        return res.json();
      })
      .then(resData => {
        dispatch(feedSuccess(resData));
      })
      .catch(err => {
        dispatch(feedFail());
        dispatch(addError(err));
      });
  };
};
