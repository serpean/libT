import AppApi from '../../util/appApi';
import * as actionTypes from './actionTypes';
import { addError } from './common';
import SearchApi from '../../util/searchApi';

export const feedStart = () => {
  return {
    postsLoading: true,
    posts: [],
    type: actionTypes.FEED_START
  };
};

export const feedSuccess = data => {
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

    let posts, totalPosts;
    AppApi.get(`/api/posts/posts?page=${postPage}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch posts.');
        }
        posts = res.data;
        totalPosts = res.data.totalPosts;
        return res.data;
      })
      .then(res => {
        return Promise.all(
          res.posts.map(post => {
            const { searchId, type } = post.resource;

            const [id] = searchId.split('__');
            return SearchApi.get(`/${type}/${id}`);
          })
        );
      })
      .then(res => {
        return posts.posts.map((e, i) => {
          return { ...e, resource: { ...e.resource, ...res[i].data } };
        });
      })
      .then(resData => {
        dispatch(feedSuccess({ posts: resData, totalPosts: totalPosts }));
      })
      .catch(err => {
        dispatch(feedFail());
        dispatch(addError(err));
      });
  };
};
