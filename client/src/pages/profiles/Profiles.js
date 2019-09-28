import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Profile from '../../components/profile/Profile';
import Spinner from '../../layouts/Spinner';

// REDUX
import { getProfiles } from '../../actions/profile';

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
  useEffect(() => {
    // setInterval(() => getProfiles(), 500);
    getProfiles();
  }, [getProfiles]);

  return loading && profiles.length < 1 ? (
    <Spinner />
  ) : (
    <div className='Profiles'>
      <div className='profile-header'>
        <h2 style={{ fontWeight: 'bold' }} className='text-info'>
          Profiles
        </h2>
      </div>
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
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
