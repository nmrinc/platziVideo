import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Footer = (props) => {

  const { history } = props;

  const [loc, setloc] = useState(false);

  const getLocation = (location) => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      setloc(true);
    } else {
      setloc(false);
    }
  };

  useEffect(() => {
    let didCancel = false;
    !didCancel && getLocation(props.location);
    return () => { didCancel = true; };
  // eslint-disable-next-line react/destructuring-assignment
  }, [props.location]);

  history.listen((location) => getLocation(location));

  return (
    <footer className={`footer ${loc && 'fixed--bottom'}`}>
      <button type='button'>Terms</button>
      <button type='button'>Privacy</button>
      <button type='button'>Help Centre</button>
    </footer>
  );
};

export default withRouter(connect(null, null)(Footer));
