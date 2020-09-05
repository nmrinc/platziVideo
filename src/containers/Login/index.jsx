import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Login = () => {

  return (
    <>
      <Header logged={false} />
      <section className="login">
        <section className="login__container">
          <h2 className="text-center">Login</h2>
          <form className="login__container--form">
            <div className="login__container--input-container">
              <i className="fi-xnsuxl-close-envelope-solid"></i> <input type="text" className="login__container--input" placeholder="Correo" />
            </div>
            <div className="login__container--input-container">
              <i className="fi-nnsuxl-key-alt-solid"></i> <input type="password" className="login__container--input" placeholder="Contraseña" />
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
            <div><i className="fi-snsuxl-google-logo"></i> Login with Google</div>
            <div><i className="fi-snsuxl-twitter"></i> Login with Twitter</div>
          </section>
          <p className="login__container--register">Don't have an account? <a href="#">Register</a></p>
        </section>
      </section>
      <Footer logged={false} />
    </>
  );
}

export default Login;