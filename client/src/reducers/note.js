import {
  GET_NOTES,
  GET_NOTE,
  ADD_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE,
  NOTE_ERROR
} from '../actions/types';

const initialState = {
  loading: true,
  notes: [],
  note: null,
  errors: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTES:
      return {
        ...state,
        loading: false,
        notes: payload
      };

    case GET_NOTE:
      return {
        ...state,
        loading: false,
        note: payload
      };

    case ADD_NOTE:
      return {
        ...state,
        loading: false,
        notes: [...state.notes, payload]
      };

    case UPDATE_NOTE:
      return {
        ...state,
        loading: false,
        notes: state.notes.map(note =>
          note._id === payload.id ? { ...payload.note } : note
        )
      };

    case REMOVE_NOTE:
      return {
        ...state,
        loading: false,
        notes: state.notes.filter(note => note._id !== payload)
      };

    case NOTE_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload
      };

    default:
      return state;
  }
};
