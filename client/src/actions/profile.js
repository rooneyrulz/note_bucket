import axios from 'axios';
import {
  GET_PROFILES,
  GET_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_PROFILE,
  PROFILE_ERROR
} from './types';

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
