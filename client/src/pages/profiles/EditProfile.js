import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// COMPONENTS
import Spinner from '../../layouts/Spinner';
import EditProfileForm from '../../components/profile-forms/EditProfileForm';

const EditProfile = ({ auth: { user }, profile: { loading }, history }) => {
  if (user.profile === null) history.push('/dashboard');

  return (
    <div className='my-profile'>
      <header
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h2 style={{ fontWeight: 'bold' }} className='text-info'>
          Update Profile
        </h2>
        <div className='btn-group'>
          <Link to='/dashboard' className='btn btn-outline-dark'>
            Back
          </Link>
        </div>
      </header>
      <hr />
      <br />
      <Fragment>
        <EditProfileForm />
      </Fragment>
    </div>
  );
};

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps)(EditProfile);
