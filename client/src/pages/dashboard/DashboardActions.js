import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const DashboardActions = ({ auth: { user } }) => {
  return (
    <Fragment>
      <Link to='/notes' className='btn btn-lg btn-create-note'>
        Create Notes
      </Link>
      {user.profile ? (
        <Link
          to='/profiles/me'
          className='btn btn-outline-light btn-lg btn-visit-profile'
        >
          Visit Profile
        </Link>
      ) : (
        <Link
          to='/profiles/create'
          className='btn btn-lg btn-create-profile btn-outline-light'
        >
          Create Profile
        </Link>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(DashboardActions);
