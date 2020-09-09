import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {

  return (
    <>
      <section className="login">
        <section className="login__container">
          <h2 className="text-center">Sign up</h2>
          <form class="login__container--form">
            <div class="login__container--input-container">
              <i class="fi-xnsuxl-user-solid"></i> <input type="text" required class="login__container--input" placeholder="Name" />
            </div>
            <div class="login__container--input-container">
              <i class="fi-xnsuxl-close-envelope-solid"></i> <input type="email" required class="login__container--input" placeholder="email" />
            </div>
            <div class="login__container--input-container">
              <i class="fi-nnsuxl-key-alt-solid"></i> <input type="password" required class="login__container--input" placeholder="Password" />
            </div>
            <button class="login__container--button">Sign up</button>
          </form>
          <hr />
          <p class="login__container--login text-center">Already a member? <Link to="/login">Login</Link></p>
        </section>
      </section>
    </>
  );
}

export default Signup;