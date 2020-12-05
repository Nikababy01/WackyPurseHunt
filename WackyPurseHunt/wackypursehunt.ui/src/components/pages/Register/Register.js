import React from 'react';
import firebase from 'firebase';

// import { Link } from 'react-router-dom';
import './Register.scss';

import authRequests from '../../../helpers/data/authData';

class Register extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      streetAddress: '',
      city: '',
      cityState: '',
      zipcode: '',
      phoneNumber: '',
    },
  }

  registerClickEvent = (e) => {
    const { user } = this.state;
    console.error('userinfo', user);
    e.preventDefault();
    authRequests
      .registerUser(user)
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

  streetAddressChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.streetAddress = e.target.value;
    this.setState({ user: tempUser });
  };

  cityChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.city = e.target.value;
    this.setState({ user: tempUser });
  };

  cityStateChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.cityState = e.target.value;
    this.setState({ user: tempUser });
  };

  zipcodeChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.zipcode = e.target.value;
    this.setState({ user: tempUser });
  };

  phoneNumberChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.phoneNumber = e.target.value;
    this.setState({ user: tempUser });
  };

  render() {
    const { user } = this.state;

    return (
      <div className="box-container">
          <h1 className="text-center"><em>Please Signup</em></h1>

          <form className="form-horizontal col-sm-12 col-sm-offset-3">
          <div className="form-group">
              <label htmlFor="inputFirstName" className="col-sm-4 control-label">
                FirstName:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputFirstName"
                  placeholder="Please enter first name"
                  value={this.state.user.firstName}
                  onChange={this.firstNameChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputLastName" className="col-sm-4 control-label">
                LastName:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputLastName"
                  placeholder="Please enter last name"
                  value={this.state.user.lastName}
                  onChange={this.lastNameChange}
                />
              </div>
            </div>
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
              <div className="form-group">
              <label htmlFor="inputStreetAddress" className="col-sm-4 control-label">
                StreetAddress:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputStreetAddress"
                  placeholder="Please enter street address"
                  value={this.state.user.streetAddress}
                  onChange={this.streetAddressChange}
                />
              </div>
            </div>
             <div className="form-group">
              <label htmlFor="inputCity" className="col-sm-4 control-label">
                City:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  placeholder="Please enter city"
                  value={this.state.user.city}
                  onChange={this.cityChange}
                />
              </div>
            </div>
             <div className="form-group">
              <label htmlFor="inputCityState" className="col-sm-4 control-label">
               City State:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputCityState"
                  placeholder="Please enter state"
                  value={this.state.user.cityState}
                  onChange={this.cityStateChange}
                />
              </div>
            </div>
              <div className="form-group">
              <label htmlFor="inputZipcode" className="col-sm-4 control-label">
                Zipcode:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputZipcode"
                  placeholder="Please enter zipcode"
                  value={this.state.user.zipcode}
                  onChange={this.zipcodeChange}
                />
              </div>
            </div>
             <div className="form-group">
              <label htmlFor="inputPhoneNumber" className="col-sm-4 control-label">
                Phone Number:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputPhoneNumber"
                  placeholder="Please enter phone number"
                  value={this.state.user.phoneNumber}
                  onChange={this.phoneNumberChange}
                />
              </div>
            </div>
            <div className="form-group mt-15px">
              <div>
                <button
                  className="btn btn-primary text-center"
                  onClick={this.registerClickEvent}>
                  SignUp
                </button>
              </div>
            </div>
          </form>
          </div>
    );
  }
}
export default Register;
