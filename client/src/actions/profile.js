import axios from 'axios';
import {
  GET_PROFILES,
  GET_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_PROFILE,
  PROFILE_ERROR
} from './types';

import setAlert from './alert';

const uri = 'http://localhost:5000';

// GET CURRENT USER PROFILE
export const getCurrentProfile = () => async dispatch => {
  // SET HEADERS
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.get(`${uri}/api/profiles/me`, config);

    // DISPATCH GET PROFILE
    dispatch({ type: GET_PROFILE, payload: data });
  } catch (error) {
    console.log(error.message);

    // DISPACH PROFILE ERROR
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data, status: 500 }
    });
  }
};

// GET PROFILES
export const getProfiles = () => async dispatch => {
  // SET HEADERS
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    // DISPATCH CLEAR PROFILE
    dispatch({ type: CLEAR_PROFILE });

    const { data } = await axios.get(`${uri}/api/profiles`, config);

    // DISPATCH GET PROFILES
    dispatch({ type: GET_PROFILES, payload: data });
  } catch (error) {
    console.log(error.message);

    // DISPATCH PROFILE ERROR
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data, status: 500 }
    });
  }
};

// GET PROFILE BY ID
export const getProfile = id => async dispatch => {
  // SET HEADERS
  const config = {
    header: {
      'Content-Types': 'application/json'
    }
  };

  try {
    const { data } = await axios.get(`${uri}/api/profiles/${id}`, config);

    // DISPATCH GET PROFILE
    dispatch({ type: GET_PROFILE, payload: data });
  } catch (error) {
    console.log(error.message);

    // DISPATCH PROFILE ERROR
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data, status: 500 }
    });
  }
};

// CHANGE PROFILE
export const changeProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  // SET HEADERS
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.post(
      `${uri}/api/profiles/change`,
      formData,
      config
    );

    // DIPATCH UPDATE PROFILE
    dispatch({ type: UPDATE_PROFILE, payload: data });

    // DISPATCH SET ALERT
    dispatch(
      edit
        ? setAlert('Profile has been successfully updated!', 200, 'success')
        : setAlert('Profile has been successfully created!', 201, 'success')
    );

    // history.push('/profiles');
    return (window.location.href = '/profiles');
  } catch (error) {
    console.log(error.message);

    if (error.response) {
      // DISPATCH PROFILE ERROR
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error.response.data, status: 400 }
      });

      // DISPATCH SET ALERT
      if (error.response.data.errors) {
        const { errors } = error.response.data;

        errors.map(error =>
          dispatch(setAlert(error.msg, 400, 'danger', 'PROFILE_CREATE_ERROR'))
        );
      } else {
        dispatch(
          setAlert(error.response.data, 400, 'danger', 'PROFILE_CREATE_ERROR')
        );
      }
    }
  }
};
