import React from 'react';
import logo from './../../assets/img/png/logo-platzi-video-BW2.png';

/* const Header = (props) => (
    <header className="header">
        <img className="header__img" src={logo} alt="Platzi Video" />
        {
            props.logged && ( <div className="header__menu">
                <div className="header__menu--profile">
                    <i className="fi-cnsux3-user-circle-solid profile-icon"></i>
                    <p>Profile</p>
                </div>
                <ul>
                    <li><a href="/">Account</a></li>
                    <li><a href="/">Logout</a></li>
                </ul>
            </div> )
        }
    </header>
); */

const Header = () => (
    <header className="header">
        <img className="header__img" src={logo} alt="Platzi Video" />
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