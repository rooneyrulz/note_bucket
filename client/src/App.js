import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import './App.css';

// COMPONENTS
import AppHeader from './layouts/AppHeader';
import AppFooter from './layouts/AppFooter';
import Routes from './components/routing/Routes';

// REDUX
import Store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={Store}>
      <Router>
        <Fragment>
          <header>
            <AppHeader />
          </header>
          <main className='container my-5'>
            <Switch>
              <Redirect exact from='/' to='/home' />
              <Route exact component={Routes} />
            </Switch>
          </main>
          <footer>
            <AppFooter />
          </footer>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
