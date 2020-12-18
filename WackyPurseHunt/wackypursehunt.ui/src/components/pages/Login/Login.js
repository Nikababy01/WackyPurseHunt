import React from 'react';
import firebase from 'firebase';

// import { Link } from 'react-router-dom';
import './Login.scss';

import authRequests from '../../../helpers/data/authData';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  }

   loginClickEvent = (e) => {
     const { user } = this.state;
     e.preventDefault();
     authRequests
       .loginUser(user)
       .then(() => {
         this.props.history.push('/home');
       })
       .catch((error) => {
         console.error('there was an error in registering', error);
       });
   };

  firstNameChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.firstName = e.target.value;
    this.setState({ user: tempUser });
  };

  lastNameChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.lastName = e.target.value;
    this.setState({ user: tempUser });
  };

  emailChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  passwordChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };

  render() {
    const { user } = this.state;
    const { authed } = this.props;

    const buildLogButtons = () => {
      if (authed) {
        return (
          <div className="btn container">
            <button
              type="submit"
              className="btn btn-outline-dark"
              onClick={this.logoutClickEvent}
            >
              Log Out
            </button>
          </div>
        );
      }
      return (
        <div className="Login" {...this.props}>
        <div className="form-group">
              <label htmlFor="inputEmail" className="col-sm-4 control-label">
                Email:
              </label>
              <div>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Please enter email"
                  value={this.state.user.email}
                  onChange={this.emailChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="col-sm-4 control-label">
                Password:
              </label>
              <div>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Please enter password"
                  value={this.state.user.password}
                  onChange={this.passwordChange}
                />
              </div>
            </div>
        <div className="btn container">
          <div>
            <button m-5px
              type="submit"
              className="btn btn-outline-dark"
              onClick={this.loginClickEvent}
            >
              Log In
            </button>
          </div>
          </div>
          </div>
      );
    };
    return (
      <div className="Login" {...this.props}>
        <div className="box-container">
          <h1 className="text-center"><em>Welcome</em></h1>
        <div id="login-form">
          <form className="form-horizontal col-sm-12 col-sm-offset-3">
            {buildLogButtons()}
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default Login;
