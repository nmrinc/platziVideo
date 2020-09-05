import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const NotFound = () => {

  return (
    <div className="four0four__bg">
      <Header logged={false} />
      <section className="four0four">
        <div className="four0four__pulseContainer">
          <h1 className="pulse">404</h1>
          <h1 className="pulse">404</h1>
          <h1>404</h1>
        </div>
        <h2>Such an empty space...</h2>
      </section>
      <Footer logged={false} />
    </div>
  );
}

export default NotFound;