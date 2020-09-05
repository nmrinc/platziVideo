import React from 'react';
import PropTypes from 'prop-types';


const Carousel = ({ category,children }) => {

  return (
    <section className="carousel">
      <h2>{category}</h2>
      <hr />
      <div className="carousel__container">
        {children}
      </div>
    </section>
  );
}

Carousel.propTypes = {
  category: PropTypes.string,
  children: PropTypes.object,
}

export default Carousel;