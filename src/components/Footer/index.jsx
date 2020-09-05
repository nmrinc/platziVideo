import React from 'react';

const Footer = (props) => (
  <footer className={ `footer ${!props.logged && 'fixed--bottom'}` }>
    <a href="#">Terms</a>
    <a href="#">Privacy</a>
    <a href="#">Help Centre</a>
  </footer>
)

export default Footer;