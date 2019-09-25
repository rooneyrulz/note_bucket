import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import RegisterForm from '../../components/auth/RegisterForm';

const Register = () => {
  return (
    <div className='Register'>
      <Fragment>
        <RegisterForm />
      </Fragment>
      <br />
      <p className='text-muted lead text-center'>
        If you already have an account, Let's <Link to='/sign-in'>Sign In</Link>
      </p>
    </div>
  );
};

export default Register;
