import axios from 'axios';
import {
  GET_NOTES,
  GET_NOTE,
  ADD_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE,
  NOTE_ERROR
} from './types';

// REDUX
import setAlert from '../actions/alert';

const uri = 'http://localhost:5000';

// GET POSTS
export const getNotes = () => async dispatch => {
  // SET HEADERS
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.get(`${uri}/api/notes/user/notes`, config);

    // DISPATCH GET_NOTES
    dispatch({ type: GET_NOTES, payload: data });
  } catch (error) {
    console.log(error.response.data);

    // DISPATCH NOTE_ERROR
    dispatch({
      type: NOTE_ERROR,
      payload: { msg: error.response.data, status: error.response.status }
    });

    // DISPATCH SET ALERT
    // dispatch(
    //   setAlert(
    //     error.response.data,
    //     error.response.status,
    //     'danger',
    //     'NOTE_ERROR'
    //   )
    // );
  }
};
