import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const DashboardActions = ({ auth: { user } }) => {
  return (
    <Fragment>
      <Link to='/notes' className='btn btn-lg btn-outline-info'>
        Create Notes
      </Link>
      {user.profile ? (
        <Link to='/profiles/me' className='btn btn-lg btn-outline-dark'>
          Visit Profile
        </Link>
      ) : (
        <Link to='/profiles/create' className='btn btn-lg btn-outline-dark'>
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
