import React from 'react';

const Header = () => (
  <header className="header">
        <img className="header__img" src="./../../assets/img/png/logo-platzi-video-BW2.png" alt="Platzi Video" />
        <div className="header__menu">
            <div className="header__menu--profile">
                <i className="fi-cnsux3-user-circle-solid profile-icon"></i>
                <p>Profile</p>
            </div>
            <ul>
                <li><a href="/">Account</a></li>
                <li><a href="/">Logout</a></li>
            </ul>
        </div>
    </header>
);

export default Header;