import React from 'react';
import { connect } from 'react-redux';
import { Jumbotron } from 'reactstrap';

const Dashboard = ({ auth: { user } }) => {
  return (
    <div className='Dashboard'>
      <Jumbotron style={{ background: 'transparent' }}>
        <h1 className='text-info display-4'>Dashboard</h1>
        <p className='lead text-info'>Welcome {user.username}</p>
        <br />
        <br />
        <div className='btn-group'>
          <a href='' className='btn btn-lg btn-info'>
            Create Notes
          </a>
          <a href='' className='btn btn-lg btn-outline-secondary'>
            Create Profile
          </a>
        </div>
      </Jumbotron>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
