import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import authRequests from '../../../helpers/data/authData';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
state = {
  isOpen: false,
}

toggle = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

logoutClickEvent = (e) => {
  const { user } = this.state;
  e.preventDefault();
  authRequests
    .logoutUser(user)
    .then(() => {
      this.props.history.push('/home');
    })
    .catch((error) => {
      console.error('there was an error logging out', error);
    });
};

render() {
  const { isOpen } = this.state;
  const buildNavbar = () => {
    const { authed } = this.props;
    if (authed) {
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
          <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
          </NavItem>
          <NavItem>
          <NavLink tag={RRNavLink} to='/products' authed={authed}>Products</NavLink>
          </NavItem>
          <NavItem>
          <NavLink tag={RRNavLink} to='/cart'>Cart</NavLink>
          </NavItem>
          <NavItem>
          <NavLink tag={RRNavLink} to='/newproduct'>Add New Product</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.logoutClickEvent}>Logout</NavLink>
            </NavItem>
        </Nav>
      );
    }
    return <Nav className="ml-auto" navbar>
      <NavItem>
          <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
          </NavItem>
          <NavItem>
          <NavLink tag={RRNavLink} to='/products'>Products</NavLink>
          </NavItem>
          <NavItem>
          <NavLink tag={RRNavLink} to='/login'>Login</NavLink>
          </NavItem>
          <NavItem>
          <NavLink tag={RRNavLink} to='/register'>Signup</NavLink>
          </NavItem>

    </Nav>;
  };
  return (
    <div className="MyNavbar">
    <Navbar expand="md">
        <div className="wph">
          <NavbarBrand tag={RRNavLink} to="/home" className='ml-3 active'><img className="logo" src="https://wiseabundance.files.wordpress.com/2014/11/messy_purse_clipart.jpg"
          alt="logo"/>The Wacky Purse Hunt</NavbarBrand>
        </div>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
        {buildNavbar()}
        </Collapse>
        </Navbar>
    </div>
  );
}
}

export default MyNavbar;
