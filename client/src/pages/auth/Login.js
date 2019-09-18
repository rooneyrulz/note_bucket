import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import LoginForm from '../../components/auth-forms/LoginForm';

const Login = () => {
  return (
    <div className="Login">
      <Fragment>
        <LoginForm />
      </Fragment>
      <br />
      <p className="text-muted lead text-center">
        If you didn't have an account, Let's <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
