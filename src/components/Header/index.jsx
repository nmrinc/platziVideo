import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import gravatar from '../../utils/gravatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from './../../assets/img/png/logo-platzi-video-BW2.png';

const Header = props => {
    const { user } = props;
    const hasUser = Object.keys(user).length > 0;

    return (
        <header className="header">
            <Link to="/">
                <img className="header__img" src={logo} alt="Platzi Video" />
            </Link>
            <div className="header__menu">
                <div className="header__menu--profile">
                    {
                        hasUser
                            ?
                            <img src={gravatar(user.email)} alt={user.email} className="gravatar-icon" />
                            :
                            <FontAwesomeIcon icon="user-circle" size="3x" className="profile-icon" />
                    }
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
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Header);