import * as actionTypes from './actionTypes';
import { addError } from './common';

export const resourceStart = (type, id) => {
  return {
    type: actionTypes.RESOURCE_START,
    id: id,
    resourceType: type,
    title: null,
    authors: [],
    image: null,
    description: null,
    lists: [],
    loadingResource: true
  };
};

export const resourceSuccess = params => {
  return {
    type: actionTypes.RESOURCE_SUCCESS,
    id: params.id,
    resourceType: params.type,
    title: params.title,
    authors: params.authors ? params.authors : [],
    image: params.image,
    description: params.description,
    lists: params.lists,
    loadingResource: false
  };
};

export const resourceFail = () => {
  return {
    type: actionTypes.RESOURCE_FAIL,
    title: null,
    authors: [],
    image: null,
    description: null,
    lists: [],
    loadingResource: false
  };
};

export const resourceStatusStart = () => {
  return {
    type: actionTypes.RESOURCE_STATUS_START,
    loadingStatus: true,
    lists: [],
    status: 0
  };
};

export const resourceStatusSuccess = (status, lists) => {
  return {
    type: actionTypes.RESOURCE_STATUS_SUCCESS,
    loadingStatus: false,
    status: status,
    lists: lists
  };
};

export const resourceStatusFail = () => {
  return {
    type: actionTypes.RESOURCE_STATUS_FAIL,
    status: 0,
    lists: [],
    loadingStatus: false
  };
};

export const getResourceStatus = resourceId => {
  return dispatch => {
    dispatch(resourceStatusStart());
    const token = localStorage.getItem('token');
    fetch(`/api/info/status/${resourceId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch Lists.');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        dispatch(resourceStatusSuccess(resData.status, resData.lists));
      })
      .catch(err => {
        dispatch(resourceStatusFail());
        dispatch(addError(err));
      });
  };
};

export const loadResource = (type, searchId) => {
  return dispatch => {
    dispatch(resourceStart(type, searchId));
    const id = searchId.split('__')[0];
    fetch(`http://localhost:3030/${type}/${id}`)
      .then(res => {
        if (res.status !== 200 && res.status !== 201 && res.status !== 304) {
          throw new Error('Error!');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.response) {
          const params = {
            title: resData.title,
            image: resData.image,
            authors: resData.authors,
            description: resData.description
          };
          dispatch(resourceSuccess(params));
        }
      })
      .catch(err => {
        dispatch(addError(err));
        dispatch(resourceFail());
      });
  };
};
