import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  Input,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Alert
} from 'reactstrap';

// REDUX
import { registerUser } from '../../actions/auth';
import setAlert from '../../actions/alert';

const RegisterForm = ({
  auth: { isAuthenticated },
  alert,
  registerUser,
  setAlert,
  history
}) => {
  const [formData, setformData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { username, email, password, password2 } = formData;

  const onHandleChange = e =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onHandleSubmit = e => {
    e.preventDefault();
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !password2.trim()
    ) {
      setAlert('Please fill out all fields!', 400, 'danger', 'REGISTER_FAIL');
    } else {
      registerUser(formData);
    }
  };

  if (isAuthenticated) history.push('/dashboard');

  return (
    <Card color='dark' style={{ width: '60%', margin: 'auto' }}>
      <CardHeader className='text-center'>
        <CardTitle>
          <h1 className='text-light'>Sign Up</h1>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={e => onHandleSubmit(e)}>
          <Fragment>
            {alert.map(
              alrt =>
                alrt.textId === 'REGISTER_FAIL' && (
                  <span key={alrt.id}>
                    <Alert color={alrt.alertType}>{alrt.msg}</Alert>
                  </span>
                )
            )}
          </Fragment>
          <FormGroup>
            <Input
              type='text'
              id='username'
              name='username'
              placeholder='Enter username'
              className='form-control-lg'
              onChange={e => onHandleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type='email'
              id='email'
              name='email'
              placeholder='Enter email'
              className='form-control-lg'
              onChange={e => onHandleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type='password'
              id='password'
              name='password'
              placeholder='Enter password'
              className='form-control-lg'
              onChange={e => onHandleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type='password'
              id='password2'
              name='password2'
              placeholder='Confirm password'
              className='form-control-lg'
              onChange={e => onHandleChange(e)}
            />
          </FormGroup>
          <ButtonGroup>
            <Button className='btn-lg' type='submit' color='outline-success'>
              Sign Up
            </Button>
            <Button className='btn-lg' type='button' color='outline-light'>
              Back
            </Button>
          </ButtonGroup>
        </Form>
      </CardBody>
      <CardFooter className='text-muted text-center'>
        If you already have an account, Let's <Link to='/sign-in'>Sign In</Link>
      </CardFooter>
    </Card>
  );
};

RegisterForm.propTypes = {
  auth: PropTypes.object.isRequired,
  alert: PropTypes.array.isRequired,
  registerUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { registerUser, setAlert }
)(withRouter(RegisterForm));
