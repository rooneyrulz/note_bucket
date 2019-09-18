import axios from 'axios';
import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

// REDUX
import setAlert from './alert';

const uri = 'http://localhost:5000';

// LOAD USER
export const loadUser = () => async dispatch => {
  if (localStorage.token) setAuthToken(localStorage.token);

  // SET HEADERS
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.get('/api/users/auth/user', config);
    console.log(data);

    // DISPATCH USER_LOADED
    dispatch({ type: USER_LOADED, payload: data });
  } catch (error) {
    console.log(error.message);

    // DISPATCH AUTH_ERROR
    dispatch({ type: AUTH_ERROR });

    // dispatch(
    //   setAlert(error.message, error.response.status, 'danger', 'AUTH_ERROR')
    // );
  }
};
