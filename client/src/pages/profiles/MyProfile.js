import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// COMPONENTS
import Spinner from '../../layouts/Spinner';
import avatar from '../../assets/default.png';

// REDUX
import { getCurrentProfile, deleteProfile } from '../../actions/profile';

const MyProfile = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
  deleteProfile,
  history
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const onHandleDeleteAccount = id => deleteProfile(id);

  if (user && !user.profile) history.push('/dashboard');

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
        <h2 style={{ fontWeight: 'bold' }} className='page-heading'>
          {profile.name}
        </h2>
        <div className='btn-group'>
          <Link to='/profiles/edit' className='btn btn-blue'>
            Edit
          </Link>
          <Link to='/dashboard' className='btn btn-blue'>
            Back
          </Link>
        </div>
      </header>
      <hr />
      <br />
      <div className='row'>
        <div className='col-sm-6'>
          <img
            style={{ width: '400px', height: '400px', borderRadius: '10rem' }}
            src={avatar}
            alt=''
          />
          <br />
          <br />
          <h4 style={{ fontWeight: 'bold' }}>{profile.name}</h4>
          <p className='lead'>{profile.location}</p>
          <p>
            <strong>Email: </strong> <span>{user.email}</span>
          </p>
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
            <p className='lead'>You did not provide any info yet..</p>
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
      <hr />
      <br />
      {profile._id === user.profile && (
        <div class='card border-danger'>
          <div class='card-body text-center'>
            <h4>Privacy Zone</h4>
            <p className='lead text-muted'>
              You can not go back once the action done!
            </p>
            <a
              href='#!'
              className='btn btn-danger btn-lg'
              onClick={e => onHandleDeleteAccount(profile._id)}
            >
              Delete Account
            </a>
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
  { getCurrentProfile, deleteProfile }
)(MyProfile);
