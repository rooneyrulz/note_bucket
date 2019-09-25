import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// REDUX
import { logOutUser } from '../../actions/auth';

const LogOut = ({ logOutUser, history }) => {
  const onHandleLogOut = e => {
    logOutUser(history);
  };

  return (
    <NavLink className='nav-link' onClick={e => onHandleLogOut(e)}>
      Logout
    </NavLink>
  );
};

export default connect(
  null,
  { logOutUser }
)(withRouter(LogOut));
