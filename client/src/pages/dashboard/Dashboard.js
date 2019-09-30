import React, { Fragment } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Spinner from '../../layouts/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = ({ auth: { user, loading } }) => {
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='Dashboard'>
        <div className='dashboard-content'>
          <h1 className='display-4 mb-0'>Dashboard</h1>
          <br />
          <p className='lead'>Welcome {user.username}</p>
          <br />
          {!user.profile && (
            <p className='lead'>
              It seems you have not setup your profile yet, Let's create one!
            </p>
          )}
          <br />
          <div className='btn-group'>
            <DashboardActions />
          </div>
        </div>
        <div className='dashboard-side'></div>
      </div>
      <div className='dashboard-overlay'></div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
