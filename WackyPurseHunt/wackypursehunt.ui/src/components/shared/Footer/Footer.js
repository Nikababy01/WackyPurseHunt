import React, { Component } from 'react';
import './Footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <React.Fragment>
      <div className="Footer">
      <div className="box-container footer-contact col-5">
        <h2 className="contact-header">Contact Us</h2>
        <p className="mr-auto"><i class="fas fa-map-marker-alt"></i> 2525 Designer Lane Nashville, TN 37207</p>
        <p className="mr-auto"><i class="fas fa-phone-alt"></i> 1-800-555-2252</p>
        <p className="mr-auto"><i className="fas fa-envelope-open-text"></i> PurseRUs@gmail.com</p>
          </div>
      <div className="footer-about col-7">
        <h2>About Us</h2>
        <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
           sed do eiusmod tempor incididunt ut labore et dolore magna
           aliqua. Ut enim ad minim veniam, quis nostrud exercitation
           ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
             anim id est laborum."</p>
      </div>
      </div>
      </React.Fragment>
    );
  }
}
export default Footer;
