import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// COMPONENTS
import CreateProfileForm from '../../components/profile-forms/CreateProfileForm';

const CreateProfile = ({ auth: { user }, profile: { loading }, history }) => {
  if (user.profile) history.push('/dashboard');

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
        <h2 style={{ fontWeight: 'bold' }} className='page-heading'>
          Create Profile
        </h2>
        <div className='btn-group'>
          <Link to='/dashboard' className='btn btn-blue'>
            Back
          </Link>
        </div>
      </header>
      <hr />
      <br />
      <Fragment>
        <CreateProfileForm />
      </Fragment>
    </div>
  );
};

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps)(CreateProfile);
