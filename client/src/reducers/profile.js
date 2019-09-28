import {
  GET_PROFILES,
  GET_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE
} from '../actions/types';

const initialState = {
  loading: true,
  profile: null,
  profiles: [],
  errors: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILES:
    case UPDATE_PROFILE:
      return {
        ...state,
        loading: false,
        profiles: payload
      };

    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload
      };

    case CREATE_PROFILE:
      return {
        ...state,
        loading: false,
        profiles: [...state.profiles, payload]
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null
      };

    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload
      };

    case DELETE_PROFILE:
      return {
        ...state,
        loading: false,
        profiles: state.profiles.filter(profile => profile.id !== payload)
      };

    default:
      return state;
  }
};
