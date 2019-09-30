import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/default.png';

const Profile = ({ profile }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '1rem',
        marginBottom: '1em',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f4f4f4',
        padding: '1rem',
        borderRadius: '.5em',
        background: '#24334e'
      }}
      className='profile-item'
    >
      <img style={{ width: '120px', height: '120px', borderRadius: '3rem' }} src={avatar} alt='' />
      <div className='profile-details'>
        <h4 className=''>{profile.name}</h4>
        <p className='lead mb-0'>{profile.location}</p>
      </div>
      <Link to={`/profiles/${profile._id}`} className='btn btn-sm btn-light'>
        Check
      </Link>
    </div>
  );
};

export default Profile;
