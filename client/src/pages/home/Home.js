import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Home = ({ isAuthenticated, history }) => {
  if (isAuthenticated) history.push('/dashboard');

  return (
    <Fragment>
      <div className='Home'>
        <div className='home-content'>
          <h1 className='display-4'>Note Bucket</h1>
          <br />
          <br />
          <div className='btn-group'>
            <Link to='/register' className='btn btn-register btn-lg'>
              Register
            </Link>
            <Link to='/sign-in' className='btn btn-outline-light btn-lg'>
              Log In
            </Link>
          </div>
        </div>
        <div className='home-side'></div>
      </div>
      <div className='home-overlay'></div>
    </Fragment>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);
