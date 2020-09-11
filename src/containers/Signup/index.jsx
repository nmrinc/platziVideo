import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signupRequest } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DebouncedInput from '../../components/DebouncedInput';

const Signup = props => {
  const [form, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInput = ({val,tn}) => {
    setValues({
      ...form,
      [tn]: val
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
		e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    props.signupRequest(form);
    props.history.push('/');
  }

  return (
    <>
      <section className="login">
        <section className="login__container">
          <h2 className="text-center">Sign up</h2>
          <form className="login__container--form" onSubmit={handleSubmit}>
            <div className="login__container--input-container">
              <FontAwesomeIcon icon="user" fixedWidth className="icon" />
              <DebouncedInput
                onDebouncedValChange={(val, tn) => {
                  handleInput({ val, tn });
                }}
                className="login__container--input"
                placeholder="Name"
                name="name"
                typeO='text'
                delay={300}
              />
            </div>
            <div className="login__container--input-container">
              <FontAwesomeIcon icon="envelope" fixedWidth className="icon" />
              <DebouncedInput
                onDebouncedValChange={(val, tn) => {
                  handleInput({ val, tn });
                }}
                className="login__container--input"
                placeholder="email"
                name="email"
                typeO='text'
                delay={300}
              />
            </div>
            <div className="login__container--input-container">
              <FontAwesomeIcon icon="key" fixedWidth className="icon" />
              <DebouncedInput
                onDebouncedValChange={(val,tn) => {
                  handleInput({ val, tn });
                }}
                className="login__container--input"
                placeholder="Password"
                name="password"
                typeO='password'
                delay={300}
              />
            </div>
            <button className="login__container--button" type="submit">Sign up</button>
          </form>
          <hr />
          <p className="login__container--login text-center">Already a member? <Link to="/login">Login</Link></p>
        </section>
      </section>
    </>
  );
}

const mapDispatchToProps = {
  signupRequest,
}

export default connect(null, mapDispatchToProps)(Signup);