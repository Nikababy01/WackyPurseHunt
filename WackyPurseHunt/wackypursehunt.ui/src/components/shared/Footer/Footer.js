import React, { Component } from 'react';
import './Footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <React.Fragment>
      <div className="Footer">
      <div className="box-container footer-contact col-5">
        <h2 className="contact-header">Contact Us</h2>
        <p className="mr-auto"><i class="fas fa-map-marker-alt"></i> 252 Designer Rd Nashville, TN 37207</p>
        <p className="mr-auto"><i class="fas fa-phone-alt"></i> 1-800-555-2252</p>
        <p className="mr-auto"><i className="fas fa-envelope-open-text"></i> PurseRUs@gmail.com</p>
          </div>
      <div className="footer-about col-7">
        <h2>About Us</h2>
        <p className="text-center">"Founded in 2018, The Wacky Purse Hunt is an international B2C online fashion shopping destination.
In recent years, we are developing globally at a rapid pace, winning recognition and trust from customers
throughout America, Europe, and Australia. While our main intention is women’s bags. Our goal is to have
a wide variety of high quality, fashionable products at low prices. We offers fashion-forward styles
and innovative designs all delivered with a truly class-leading professional service that all our customers deserve."</p>
      <div className="footer-social">
        <a href="#"><i className="fab fa-facebook-square"></i></a>
        <a href="#"><i className="fab fa-twitter-square"></i></a>
        <a href="#"><i className="fab fa-linkedin"></i></a>
        <a href="#"><i className="fab fa-github-square"></i></a>

      </div>
      </div>
      </div>
      </React.Fragment>
    );
  }
}
export default Footer;
