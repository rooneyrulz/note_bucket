import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Spinner from '../../layouts/Spinner';

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

  return loading ? <Spinner /> : <div>My Profile</div>;
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(MyProfile);
