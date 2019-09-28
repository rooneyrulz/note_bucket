import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// REDUX
import { getProfiles } from '../../actions/profile';

const Profiles = ({ profile: { profiles }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <div className='Profiles'>
      <h1>Profiles</h1>
      {profiles.map(profile => (
        <p className='lead'>{profile.name}</p>
      ))}
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
