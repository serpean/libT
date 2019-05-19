import * as actionTypes from './actionTypes';

export const feedStart = () => {
  return {
    postsLoading: true,
    posts: [],
    type: actionTypes.FEED_START
  };
};

export const feedSuccess = data => {
  return {
    posts: data.posts.map(post => {
      return {
        ...post,
        imagePath: post.imageUrl
      };
    }),
    totalPosts: data.totalItems,
    postsLoading: false,
    type: actionTypes.FEED_SUCCESS
  };
};

export const feedFail = error => {
  return {
    type: actionTypes.FEED_FAIL,
    postsLoading: false,
    error: error
  };
};

export const updatePages = page => {
  return {
    postPage: page,
    type: actionTypes.UPDATE_PAGES
  };
};

export const loadPosts = (token, direction, page) => {
  return dispatch => {
    if (direction) {
      dispatch(feedStart());
    }
    let postPage = page || 1;
    if (direction === 'next') {
      page++;
      dispatch(updatePages(page));
    }
    if (direction === 'previous') {
      page--;
      dispatch(updatePages(page));
    }
    fetch('http://localhost:3001/api/index/posts?page=' + postPage, {
      headers: {
        Authorization: 'Bearer ' + token
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
        dispatch(feedFail(err));
      });
  };
};
