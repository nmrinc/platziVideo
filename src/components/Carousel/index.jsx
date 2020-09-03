import React from 'react';
import Thumbnail from  './../Thumbnail';


const Carousel = (props) => {
  const { category, data } = props;

  return (
    <section className="carousel">
      <h2>{category}</h2>
      <hr />
      <div className="carousel__container">
        {
          data.map(item =>
            <Thumbnail key={item.id} {...item} />
          )
         }
      </div>
    </section>
  );
}

export default Carousel;