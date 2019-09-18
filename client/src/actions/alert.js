import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (
  msg,
  status,
  alertType,
  textId = null,
  timeout = 5000
) => dispatch => {
  const id = uuid.v4();

  // DISPATCH SET ALERT
  dispatch({
    type: SET_ALERT,
    payload: { id, msg, status, alertType, textId }
  });

  // DISPATCH REMOVE ALERT
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
