import { combineReducers } from 'redux';

// REDUCERS
import auth from './auth';
import alert from './alert';

export default combineReducers({
  auth,
  alert
});
