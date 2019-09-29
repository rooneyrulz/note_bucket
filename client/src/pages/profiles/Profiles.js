import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// COMPONENTS
import Profile from '../../components/profile/Profile';
import Spinner from '../../layouts/Spinner';

// REDUX
import { getProfiles } from '../../actions/profile';

const Profiles = ({
  auth: { user },
  profile: { profiles, loading },
  getProfiles
}) => {
  useEffect(() => {
    // setInterval(() => getProfiles(), 500);
    getProfiles();
  }, [getProfiles]);

  return loading && profiles.length < 1 ? (
    <Spinner />
  ) : (
    <div className='Profiles'>
      <header
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        className='profile-header'
      >
        <h2 style={{ fontWeight: 'bold' }} className='text-info'>
          Profiles
        </h2>
        {user && !user.profile && (
          <Link className='btn btn-outline-info' to='/profiles/create'>
            Create Profile
          </Link>
        )}
      </header>
      <hr />
      <br />
      {profiles.length < 1 ? (
        <p className='lead text-muted'>No profiles found!</p>
      ) : (
        profiles.map(profile => <Profile key={profile._id} profile={profile} />)
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
