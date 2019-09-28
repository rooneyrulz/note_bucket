import React from 'react';
import avatar from '../../assets/default.png';

const Profile = ({ profile }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f4f4f4',
        padding: '1rem',
        borderRadius: '.5em'
      }}
      className='profile-item bg-dark'
    >
      <img style={{ width: '120px', height: '120px' }} src={avatar} alt='' />
      <div className='profile-details'>
        <p className='lead mb-0'>{profile.name}</p>
        <span className='text-muted'>{profile.profession}</span>
      </div>
      <a href='' className='btn btn-sm btn-light'>
        Check
      </a>
    </div>
  );
};

export default Profile;
