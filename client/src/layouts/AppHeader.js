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

const AppHeader = ({ isAuthenticated }) => {
  const [isOpen, setisOpen] = useState(false);

  const toggle = e => setisOpen(!isOpen);

  const onHandleLogOut = e => {};

  return (
    <Navbar dark color='dark' expand='lg'>
      <Container>
        <NavbarBrand href='#!'>Note Bucket</NavbarBrand>
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
                  <NavLink className='nav-link' exact to='/notes'>
                    Notes
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
              <NavItem>
                <NavLink className='nav-link' onClick={e => onHandleLogOut(e)}>
                  Logout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

AppHeader.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(AppHeader);
