import * as actionTypes from './actionTypes';
import { addError } from './common';
import SearchApi from '../../util/searchApi';

export const searchStartOne = value => {
  return {
    type: actionTypes.SEARCH_START_ONE,
    query: value
  };
};
export const searchStartTwo = () => {
  return {
    type: actionTypes.SEARCH_START_TWO,
    res: []
  };
};
export const searchStartThree = () => {
  return {
    type: actionTypes.SEARCH_START_THREE,
    loading: true
  };
};

export const searchSuccess = data => {
  console.log(data);
  return {
    type: actionTypes.SEARCH_SUCCESS,
    loading: false,
    res: data.search,
    totalResources: data.totalResults
  };
};

export const searchFail = () => {
  return {
    type: actionTypes.SEARCH_FAIL,
    loading: false
  };
};

export const updateSearch = page => {
  return {
    type: actionTypes.UPDATE_SEARCH,
    resourcePage: page
  };
};

export const onSearch = (id, value, direction, page) => {
  return async dispatch => {
    try {
      dispatch(searchStartOne(value));
      let isDirection = false;

      let resourcePage = page || 1;

      if (direction === 'more') {
        resourcePage++;
        dispatch(updateSearch(resourcePage));
        isDirection = true;
      }

      !isDirection && dispatch(searchStartTwo());

      if (value.length >= 3) {
        !isDirection && dispatch(searchStartThree(value));
        const res = await SearchApi.get(
          `/?name=${value}&page=${resourcePage}`
        );
        if (res.status !== 200 && res.status !== 201 && res.status !== 301) {
          throw new Error('Could not authenticate you!');
        }
        const resData = await res.data;
        if (resData.response) {
          dispatch(searchSuccess(resData));
        }
      }
    } catch (err) {
      dispatch(addError(err));
      dispatch(searchFail());
    }
  };
};

export const handleFilter = event => {
  return {
    type: actionTypes.FILTER_HANDLER,
    filterBy: event.target.value
  };
};
