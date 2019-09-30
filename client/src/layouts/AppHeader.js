import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  Collapse
} from 'reactstrap';

// COMPONENTS
import LogOut from '../components/auth/LogOut';

const AppHeader = ({ auth: { isAuthenticated, user } }) => {
  const [isOpen, setisOpen] = useState(false);

  const toggle = e => setisOpen(!isOpen);

  return (
    <Navbar dark color='dark' expand='lg'>
      <Container>
        <NavbarBrand href={isAuthenticated ? '/dashboard' : '/home'}>
          Note Bucket
        </NavbarBrand>
        <NavbarToggler onClick={e => toggle(e)} />
        <Collapse navbar isOpen={isOpen}>
          <Nav navbar className='ml-auto'>
            {!isAuthenticated ? (
              <Fragment>
                <NavItem>
                  <NavLink className='nav-link' exact to='/home'>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' exact to='/profiles'>
                    Profiles
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' exact to='/about'>
                    About
                  </NavLink>
                </NavItem>
              </Fragment>
            ) : (
              <Fragment>
                <NavItem>
                  <NavLink className='nav-link' exact to='/dashboard'>
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' exact to='/profiles'>
                    Profiles
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' exact to='/notes'>
                    Notes
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' exact to='/about'>
                    About
                  </NavLink>
                </NavItem>
              </Fragment>
            )}
          </Nav>
          <Nav navbar className='ml-auto'>
            {!isAuthenticated ? (
              <Fragment>
                <NavItem>
                  <NavLink className='nav-link' exact to='/register'>
                    Register
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' exact to='/sign-in'>
                    Sign In
                  </NavLink>
                </NavItem>
              </Fragment>
            ) : (
              <Fragment>
                {user && user.profile && (
                  <NavItem>
                    <NavLink className='nav-link' exact to='/profiles/me'>
                      Profile
                    </NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <LogOut />
                </NavItem>
              </Fragment>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

AppHeader.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AppHeader);
