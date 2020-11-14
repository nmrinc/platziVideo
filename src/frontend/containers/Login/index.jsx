/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { loginRequest } from '../../actions';
import DebouncedInput from '../../components/DebouncedInput';

const Login = (props) => {

  const [form, setValues] = useState({
    email: '',
    password: '',
  });

  const handleInput = ({ val, tn }) => {
    setValues({
      ...form,
      [tn]: val,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    props.loginRequest(form);
    props.history.push('/');
  };

  return (
    <>
      <section className='login'>
        <section className='login__container'>
          <h2 className='text-center'>Login</h2>
          <form className='login__container--form'>
            <div className='login__container--input-container'>
              <FontAwesomeIcon icon='envelope' fixedWidth className='icon' />
              <DebouncedInput
                onDebouncedValChange={(val, tn) => {
                  handleInput({ val, tn });
                }}
                className='login__container--input'
                placeholder='email'
                name='email'
                typeO='text'
                delay={300}
              />
            </div>
            <div className='login__container--input-container'>
              <FontAwesomeIcon icon='key' fixedWidth className='icon' />
              <DebouncedInput
                onDebouncedValChange={(val, tn) => {
                  handleInput({ val, tn });
                }}
                className='login__container--input'
                placeholder='Password'
                name='password'
                typeO='password'
                delay={300}
              />
            </div>
            <button className='login__container--button' type='submit' onClick={handleSubmit}>Login</button>
            <div className='login__container--remember-me'>
              <label>
                <input type='checkbox' id='logRme' value='rme' />
                Remember me
              </label>
              <button type='button'>Forgot password</button>
            </div>
          </form>
          <section className='login__container--social-media'>
            <div>
              <FontAwesomeIcon icon={faGoogle} fixedWidth />
              {' '}
              Login with Google
            </div>
            <div>
              <FontAwesomeIcon icon={faTwitter} fixedWidth />
              {' '}
              Login with Twitter
            </div>
          </section>
          <p className='login__container--register'>
            Don&apos;t have an account?
            {' '}
            <Link to='/signup'>Register</Link>
          </p>
        </section>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  loginRequest,
};

Login.propTypes = {
  loginRequest: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Login);
