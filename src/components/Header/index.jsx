import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from './../../assets/img/png/logo-platzi-video-BW2.png';

/* const Header = (props) => (
    <header className="header">
        <img className="header__img" src={logo} alt="Platzi Video" />
        {
            props.logged && ( <div className="header__menu">
                <div className="header__menu--profile">
                    <FontAwesomeIcon icon="user-circle" size="3x" className="profile-icon" />
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
        <Link to="/">
            <img className="header__img" src={logo} alt="Platzi Video" />
        </Link>
        <div className="header__menu">
            <div className="header__menu--profile">
                <FontAwesomeIcon icon="user-circle" size="3x" className="profile-icon" />
                <p>Profile</p>
            </div>
            <ul>
                <li><a href="/">Account</a></li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </div>
    </header>
);

export default Header;