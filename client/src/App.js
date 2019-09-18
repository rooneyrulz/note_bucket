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
import Home from './pages/home/Home';
import About from './pages/about/About';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';

// REDUX
import Store from './store';
import { loadUser } from './actions/auth';

const App = () => {
  useEffect(() => Store.dispatch(loadUser()), []);

  return (
    <Provider store={Store}>
      <Router>
        <Fragment>
          <header></header>
          <main className="container my-5">
            <Switch>
              <Redirect exact from="/" to="/home" />
              <div className="App">
                <Route exact path="/home" component={Home} />
                <Route exact path="/products" component={null} />
                <Route exact path="/about" component={About} />
                <Route exact path="/cart" component={null} />
                <Route exact path="/profile" component={null} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/sign-in" component={Login} />
              </div>
            </Switch>
          </main>
          <footer></footer>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
