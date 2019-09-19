import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Jumbotron } from 'reactstrap';

const Home = ({ isAuthenticated, history }) => {
  if (isAuthenticated) history.push('/dashboard');

  return (
    <div className='Home'>
      <Jumbotron style={{ background: 'transparent' }}>
        <h1 className='text-primary display-4'>Home</h1>
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
