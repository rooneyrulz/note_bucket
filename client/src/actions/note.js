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
  }
};

// GET NOTE
export const getNote = id => async dispatch => {
  // SET HEADERS
  const config = {
    header: {
      'Content-Types': 'application/json'
    }
  };

  try {
    const { data } = await axios.get(`${uri}/api/notes/${id}`, config);

    // DISPATCH GET_NOTE
    dispatch({ type: GET_NOTE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// ADD NOTES
export const addNote = (formData, history) => async dispatch => {
  // SET HEADERS
  const config = {
    header: {
      'Content-Types': 'application/json'
    }
  };

  try {
    const { data } = await axios.post(`${uri}/api/notes/add`, formData, config);

    // DISPATCH ADD_NOTE
    dispatch({ type: ADD_NOTE, payload: data });

    history.push('/notes');
  } catch (error) {
    // DISPATCH NOTE_ERROR

    if (error.response) {
      dispatch({
        type: NOTE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      });

      if (error.response.data.errors) {
        const { errors } = error.response.data;

        errors.map(error =>
          dispatch(setAlert(error.msg, 400, 'danger', 'NOTE_CREATE_ERROR'))
        );
      } else {
        dispatch(
          setAlert(error.response.data, 400, 'danger', 'NOTE_CREATE_ERROR')
        );
      }
    }
  }
};

// UPDATE NOTE
export const updateNote = (formData, id) => async dispatch => {
  // SET HEADERS
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.put(
      `${uri}/api/notes/${id}`,
      formData,
      config
    );

    // DISPATCH UPDATE NOTE
    dispatch({ type: UPDATE_NOTE, payload: { note: data, id } });
  } catch (error) {
    console.log(error.message);

    // DISPATCH NOTE_ERROR
    dispatch({
      type: NOTE_ERROR,
      payload: {
        msg: error.response.data,
        status: error.response.status
      }
    });

    if (error.response.data.errors) {
      const { errors } = error.response.data;

      errors.map(error =>
        dispatch(setAlert(error.msg, 400, 'danger', 'NOTE_UPDATE_ERROR'))
      );
    } else {
      dispatch(
        setAlert(error.response.data, 400, 'danger', 'NOTE_UPDATE_ERROR')
      );
    }
  }
};

// DELETE NOTE
export const deleteNote = id => async dispatch => {
  // SET HEADERS
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.delete(`${uri}/api/notes/${id}`, config);

    // DISPATCH REMOVE NOTE
    dispatch({ type: REMOVE_NOTE, payload: id });
  } catch (error) {
    console.log(error.message);

    // DISPATCH NOTE ERROR
    dispatch({
      type: NOTE_ERROR,
      payload: { msg: error.response.data, status: error.response.status }
    });

    // DISPATCH SET ALERT
    dispatch(setAlert(error.response.data, 400, 'danger', 'NOTE_REMOVE_ERROR'));
  }
};
