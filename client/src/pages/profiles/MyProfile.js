import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// COMPONENTS
import Spinner from '../../layouts/Spinner';
import avatar from '../../assets/default.png';

// REDUX
import { getCurrentProfile } from '../../actions/profile';

const MyProfile = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
  history
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (!user.profile) history.push('/dashboard');

  return loading || profile === null ? (
    <Spinner />
  ) : (
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
          My Profile
        </h2>
        <div className='btn-group'>
          <Link to='#!' className='btn btn-outline-info'>
            Edit
          </Link>
          <Link to='#!' className='btn btn-dark'>
            Back
          </Link>
        </div>
      </header>
      <hr />
      <br />
      <div className='row'>
        <div className='col-sm-6'>
          <img src={avatar} alt='' />
          <br />
          <br />
          <h4 style={{ fontWeight: 'bold' }}>{profile.name}</h4>
          <p className='lead'>{user.email}</p>
          {profile.location && <p className='lead'>{profile.location}</p>}
        </div>
        <div className='col-sm-6'>some content</div>
      </div>
      <div className='row'></div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(MyProfile);
