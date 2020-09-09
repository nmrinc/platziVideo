import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Login = () => {

  return (
    <>
      <section className="login">
        <section className="login__container">
          <h2 className="text-center">Login</h2>
          <form className="login__container--form">
            <div className="login__container--input-container">
              <FontAwesomeIcon icon="envelope" fixedWidth className="icon" /> <input type="text" className="login__container--input" placeholder="email" />
            </div>
            <div className="login__container--input-container">
              <FontAwesomeIcon icon="key" fixedWidth className="icon" /> <input type="password" className="login__container--input" placeholder="Password" />
            </div>
            <button className="login__container--button">Login</button>
            <div className="login__container--remember-me">
              <label>
                <input type="checkbox" id="logRme" value="rme" /> Remember me
                    </label>
              <a href="#">Forgot password</a>
            </div>
          </form>
          <section className="login__container--social-media">
            <div><FontAwesomeIcon icon={faGoogle} fixedWidth /> Login with Google</div>
            <div><FontAwesomeIcon icon={faTwitter} fixedWidth /> Login with Twitter</div>
          </section>
          <p className="login__container--register">Don't have an account? <Link to="/signup">Register</Link></p>
        </section>
      </section>
    </>
  );
}

export default Login;