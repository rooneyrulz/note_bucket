import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// COMPONENTS
import Spinner from '../../layouts/Spinner';

import avatar from '../../assets/default.png';

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
          {profile.name}
        </h2>
        <div className='btn-group'>
          <Link to='/dashboard' className='btn btn-outline-dark'>
            Back
          </Link>
        </div>
      </header>
      <hr />
      <br />
      <div className='row'>
        <div className='col-sm-6'>
          <img
            style={{ width: '400px', height: '400px' }}
            src={avatar}
            alt=''
          />
          <br />
          <br />
          <h4 style={{ fontWeight: 'bold' }}>{profile.name}</h4>
          <p className='lead'>{profile.location}</p>
          {user.profile === profile._id && (
            <p>
              <strong>Email: </strong> <span>{user.email}</span>
            </p>
          )}
          {profile.website && (
            <p>
              <strong>Website: </strong>{' '}
              <Link to={profile.website}>{profile.website}</Link>
            </p>
          )}
        </div>
        <div className='col-sm-6'>
          <div class='card'>
            <div class='card-body'>
              <h4 class='card-title text-center'>{profile.profession}</h4>
              <br />
              {profile.company && (
                <p class='card-text'>
                  <strong>Company</strong>
                  <span className='float-right'>{profile.company}</span>
                </p>
              )}
              <p class='card-text'>
                <strong>Gender</strong>
                <span className='float-right'>{profile.status}</span>
              </p>
              <p class='card-text'>
                <strong>Age</strong>
                <span className='float-right'>{profile.age}</span>
              </p>
              <br />
              {profile.skills.length > 1 && (
                <li className='list-group'>
                  <li className='list-group-item'>
                    <h4>Skills</h4>
                  </li>
                  {profile.skills.map(skill => (
                    <li className='list-group-item'>{skill}</li>
                  ))}
                </li>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <br />
      <div className='row'>
        <div className='col-sm-12'>
          <h4>About</h4>
          {profile.bio ? (
            <p className='lead'>{profile.bio}</p>
          ) : (
            <p className='lead'>No info yet..</p>
          )}
        </div>
      </div>
      <hr />
      <br />
      {profile.social && (
        <div className='row'>
          <div className='col-sm-12'>
            <h4>Follow</h4>
            <br />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridGap: '1rem',
                justifyContent: 'center',
                alignItem: 'center',
                marginBottom: '2rem',
                textAlign: 'center'
              }}
              className='social'
            >
              {profile.social.youtube && (
                <div>
                  <Link to={profile.social.youtube}>Youtube</Link>
                </div>
              )}
              {profile.social.facebook && (
                <div>
                  <Link to={profile.social.facebook}>Facebook</Link>
                </div>
              )}
              {profile.social.twitter && (
                <div>
                  <Link to={profile.social.twitter}>Twitter</Link>
                </div>
              )}
              {profile.social.linkedin && (
                <div>
                  <Link to={profile.social.linkedin}>LinkedIn</Link>
                </div>
              )}
              {profile.social.instagram && (
                <div>
                  <Link to={profile.social.instagram}>Instagram</Link>
                </div>
              )}
              {profile.social.github && (
                <div>
                  <Link to={profile.social.github}>Github</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
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
