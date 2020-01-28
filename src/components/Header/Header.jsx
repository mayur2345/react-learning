import React from 'react';
import '../../scss/Header.scss';

const Header = () => (
  <header className="headerWrapper">
    <img className="headerLogo" alt="" />
    <div className="verticalLine" />
    <div className="userImgWrapper" />

    <div className="notificationWrapper">
      <div className="notification">
        <div className="rectangle">
          <p className="notificationNum">5</p>
        </div>
      </div>
    </div>
    <div className="location">
      <div className="locationText">London, UK</div>
      <div className="fa fa-caret-down arrow" />
    </div>
  </header>
);

export default Header;
