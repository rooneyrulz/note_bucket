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
import Routes from './components/routing/Routes';

// REDUX
import Store from './store';
import { loadUser } from './actions/auth';

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
          <footer></footer>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
