import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

// COMPONENTS
import Home from '../../pages/home/Home';
import About from '../../pages/about/About';
import Register from '../../pages/auth/Register';
import Login from '../../pages/auth/Login';
import Dashboard from '../../pages/dashboard/Dashboard';
import Notes from '../../pages/notes/Notes';
import Profiles from '../../pages/profiles/Profiles';

import PrivateRoute from '../../components/routing/PrivateRoute';

const Routes = ({ alert }) => (
  <div className='App'>
    <Fragment>
      <Fragment>
        {alert.map(
          alrt =>
            alrt.textId !== 'REGISTER_FAIL' &&
            alrt.textId !== 'LOGIN_FAIL' && (
              <span key={alrt.id}>
                <Alert color={alrt.alertType}>{alrt.msg}</Alert>
              </span>
            )
        )}
      </Fragment>
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/products' component={null} />
        <Route exact path='/about' component={About} />
        <Route exact path='/cart' component={null} />
        <Route exact path='/profile' component={null} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/notes' component={Notes} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/sign-in' component={Login} />
      </Switch>
    </Fragment>
  </div>
);

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Routes);
