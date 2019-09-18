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
    const { data } = await axios.get(`${uri}/api/users/auth/user`, config);

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

// REGISTER USERS
export const registerUser = formData => async dispatch => {
  // SET HEADERS
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.post(`${uri}/api/users/add`, formData, config);

    // DISPATCH REGISTER SUCCESS
    dispatch({ type: REGISTER_SUCCESS, payload: data });

    // DISPATCH LOAD USER
    dispatch(loadUser());
  } catch (error) {
    // DISPATCH REGISTER FAIL
    if (error.response.data.errors) {
      const { errors } = error.response.data;
      errors.map(err => {
        console.log(err.msg);
        dispatch(setAlert(err.msg, 400, 'danger', 'REGISTER_FAIL'));
      });
    } else {
      console.log(error.response.data);
      dispatch(
        setAlert(
          error.response.data,
          error.response.status,
          'danger',
          'REGISTER_FAIL'
        )
      );
    }
  }
};
