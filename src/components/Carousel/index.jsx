import React from 'react';


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

export default Carousel;