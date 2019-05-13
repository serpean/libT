import common from './common';
import auth from './auth';
import feed from './feed';
import { combineReducers } from 'redux';

export default combineReducers({
  common,
  auth,
  feed
});
