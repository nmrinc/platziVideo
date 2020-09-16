import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Footer = props => {

  const [loc, setloc] = useState(false);

  const getLocation = (location) => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      setloc(true);
    } else {
      setloc(false);
    }
  }

  useEffect(() => {
    let didCancel = false;
    !didCancel && getLocation(props.location);
    return () => { didCancel = true; }
  }, []);


  props.history.listen((location) => getLocation(location) );

  return (
    <footer className={`footer ${loc && 'fixed--bottom'}`}>
      <a href="#">Terms</a>
      <a href="#">Privacy</a>
      <a href="#">Help Centre</a>
    </footer>
  );
}

Footer.propTypes = {
  props: PropTypes.object,
}

export default withRouter(connect(null, null)(Footer));