import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// COMPONENTS
import Spinner from '../../layouts/Spinner';

// REDUX
import { getProfile } from '../../actions/profile';

const Profile = ({
  auth: { user },
  profile: { loading, profile },
  getProfile,
  history,
  match
}) => {
  useEffect(() => {
    getProfile(match.params.id);
  }, [getProfile, match.params.id]);

  if (profile !== null)
    user._id === profile.user && history.push('/profiles/me');

  return loading || profile === null ? (
    <Spinner />
  ) : (
    <div className='profile-details'>
      <header
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h2 style={{ fontWeight: 'bold' }} className='text-info mb-0'>
          Profile Details
        </h2>
        <div className='btn-group'>
          <Link to='#!' className='btn btn-dark'>
            Back
          </Link>
        </div>
      </header>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Profile);
