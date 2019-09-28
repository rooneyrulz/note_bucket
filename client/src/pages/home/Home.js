import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Jumbotron } from 'reactstrap';

const Home = ({ isAuthenticated, history }) => {
  if (isAuthenticated) history.push('/dashboard');

  return (
    <div className='Home'>
      <Jumbotron style={{ background: 'transparent' }}>
        <h1 className='text-info display-4'>Note Bucket</h1>
        <br />
        <br />
        <div className='btn-group'>
          <a href='' className='btn btn-lg btn-info'>
            Register
          </a>
          <a href='' className='btn btn-lg btn-outline-secondary'>
            Log In
          </a>
        </div>
      </Jumbotron>
    </div>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);
