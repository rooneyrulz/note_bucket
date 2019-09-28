import React from 'react';
import { connect } from 'react-redux';
import { Jumbotron } from 'reactstrap';

// COMPONENTS
import Spinner from '../../layouts/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = ({ auth: { user, loading } }) => {
  return loading ? (
    <Spinner />
  ) : (
    <div className='Dashboard'>
      <Jumbotron style={{ background: 'transparent' }}>
        <h1 className='text-info display-4'>Dashboard</h1>
        <p className='lead text-info'>Welcome {user.username}</p>
        {!user.profile && (
          <p className='lead text-muted'>
            It seems you have not setup your profile yet, Let's create one!
          </p>
        )}
        <br />
        <br />
        <div className='btn-group'>
          <DashboardActions />
        </div>
      </Jumbotron>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
