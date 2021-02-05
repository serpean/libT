import common from './common';
import auth from './auth';
import feed from './feed';
import library from './library';
import resource from './resource';
import search from './search';
import profile from './profile';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export default history =>
  combineReducers({
    router: connectRouter(history),
    common,
    auth,
    feed,
    library,
    resource,
    search,
    profile
  });
