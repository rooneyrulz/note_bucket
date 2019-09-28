import { combineReducers } from 'redux';

// REDUCERS
import auth from './auth';
import note from './note';
import profile from './profile';
import alert from './alert';

export default combineReducers({
  auth,
  note,
  profile,
  alert
});
