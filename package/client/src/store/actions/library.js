import AppApi from '../../util/appApi';
import * as actionTypes from './actionTypes';
import { addError } from './common';

export const listStart = () => {
  return {
    loadingList: true,
    type: actionTypes.LIST_START
  };
};

export const listSuccess = (data, listId) => {
  return {
    type: actionTypes.LIST_SUCCESS,
    actualList: data,
    loadingList: false
  };
};

export const listFail = () => {
  return {
    type: actionTypes.LIST_FAIL,
    loadingList: false
  };
};

export const listsStart = () => {
  return {
    type: actionTypes.LISTS_START,
    loadingLists: true
  };
};

export const listsSuccess = data => {
  let wantList,
    inProgressList,
    doneList,
    extraLists = [];
  data.forEach(element => {
    switch (element.type) {
      case 1:
        wantList = element;
        break;
      case 2:
        inProgressList = element;
        break;
      case 3:
        doneList = element;
        break;
      default:
        extraLists.push(element);
    }
  });
  return {
    wantList: wantList,
    inProgressList: inProgressList,
    doneList: doneList,
    extraLists: extraLists,
    type: actionTypes.LISTS_SUCCESS,
    loadingLists: false
  };
};

export const listsFail = () => {
  return {
    type: actionTypes.LISTS_FAIL,
    loadingLists: false
  };
};

export const loadLists = (username, listId) => {
  return dispatch => {
    dispatch(listsStart());
    const token = localStorage.getItem('token');
    AppApi.get(`/api/lists/user/${username}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch Lists.');
        }
        return res.data;
      })
      .then(resData => {
        if (listId && listId !== null) {
          dispatch(loadList(listId));
        } else if (resData.length !== 0) dispatch(loadList(resData[0]._id));
        dispatch(listsSuccess(resData));
      })
      .catch(err => {
        dispatch(listsFail());
        dispatch(addError(err));
      });
  };
};

export const loadList = listId => {
  return dispatch => {
    dispatch(listStart());
    const token = localStorage.getItem('token');
    AppApi.get(`/api/lists/list/${listId}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch Lists.');
        }
        return res.data;
      })
      .then(resData => {
        dispatch(listSuccess(resData));
      })
      .catch(err => {
        dispatch(listFail());
        dispatch(addError(err));
      });
  };
};

export const editListStart = data => {
  return {
    isEditing: true,
    editList: data,
    type: actionTypes.EDIT_LIST_START
  };
};

export const editListSuccess = () => {
  return {
    isEditing: false,
    editPost: null,
    editListLoading: false,
    type: actionTypes.EDIT_LIST_SUCCESS
  };
};

export const editListFail = () => {
  return {
    isEditing: false,
    editList: null,
    editListLoading: false,
    type: actionTypes.EDIT_LIST_FAIL
  };
};

export const editListLoadStart = () => {
  return {
    editLoading: true,
    type: actionTypes.EDIT_LIST_LOAD_START
  };
};

export const newLibraryHandler = () => {
  return dispatch => dispatch(editListStart());
};

export const updateLibraryHandler = list => {
  return dispatch => dispatch(editListStart(list));
};

export const cancelEditHandler = () => {
  return dispatch => dispatch(editListFail());
};

export const finishEditHandler = (listData, editList) => {
  return dispatch => {
    dispatch(editListLoadStart());
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', listData.title);
    formData.append('description', listData.description);
    formData.append('public', listData.public);
    let url = '/api/lists/';
    let method = 'POST';
    if (editList) {
      url = '/api/lists/' + editList._id;
      method = 'PUT';
    }

    AppApi.request({
      url: url,
      method: method,
      data: formData,
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating or Editing a list failed!');
        }
        return res.data;
      })
      .then(resData => {
        const userId = localStorage.getItem('userId');
        dispatch(loadLists(userId, resData.list._id));
        dispatch(editListSuccess());
      })
      .catch(err => {
        dispatch(editListFail(err));
        dispatch(addError(err));
      });
  };
};

export const deletePostHandler = (listId, nextList) => {
  return dispatch => {
    dispatch(listsStart());
    const token = localStorage.getItem('token');
    AppApi.delete(`/api/lists/${listId}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Deleting a list failed!');
        }
        return res.data;
      })
      .then(resData => {
        const userId = localStorage.getItem('userId');
        dispatch(loadLists(userId));
        dispatch(loadList(nextList));
      })
      .catch(err => {
        dispatch(listsFail(err));
        dispatch(addError(err));
      });
  };
};
