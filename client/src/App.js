import React, { Fragment } from 'react';
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

const App = () => {
  return (
    <Router>
      <Fragment>
        <header></header>
        <main>
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
  );
};

export default App;
