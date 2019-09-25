import React, { Fragment, useState, useEffect } from 'react';
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
import { loginUser } from '../../actions/auth';
import setAlert from '../../actions/alert';

const LoginForm = ({
  auth: { isAuthenticated },
  alert,
  loginUser,
  setAlert,
  history
}) => {
  const [formData, setformData] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {}, []);

  const { username, password } = formData;

  const onHandleChange = e =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onHandleSubmit = e => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setAlert('Please fill out all fields!', 400, 'danger', 'LOGIN_FAIL');
    } else {
      loginUser(formData);
    }
  };

  if (isAuthenticated) history.push('/dashboard');

  return (
    <Card color='dark' style={{ width: '60%', margin: 'auto' }}>
      <CardHeader className='text-center'>
        <CardTitle>
          <h1 className='text-light'>Sign In</h1>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={e => onHandleSubmit(e)}>
          <Fragment>
            {alert.map(
              alrt =>
                alrt.textId === 'LOGIN_FAIL' && (
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
              type='password'
              id='password'
              name='password'
              placeholder='Enter password'
              className='form-control-lg'
              onChange={e => onHandleChange(e)}
            />
          </FormGroup>
          <ButtonGroup>
            <Button className='btn-lg' type='submit' color='info'>
              Sign In
            </Button>
            <Button className='btn-lg' type='button' color='light'>
              Back
            </Button>
          </ButtonGroup>
        </Form>
      </CardBody>
      <CardFooter className='text-center text-muted'>
        If you didn't have an account, Let's <Link to='/register'>Sign Up</Link>
      </CardFooter>
    </Card>
  );
};

LoginForm.propTypes = {
  auth: PropTypes.object.isRequired,
  alert: PropTypes.array.isRequired,
  loginUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { loginUser, setAlert }
)(withRouter(LoginForm));
