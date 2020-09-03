import React from 'react';
import Thumbnail from  './../Thumbnail';


const Carousel = (props) => {
  let { category, images } = props;

  const thumbMaker = () => {
    let thumbs = [];

    for (let i = 0; i<images.length; i++){
      thumbs.push(<Thumbnail imgURL={images[i]} title='Descriptive title' details='2019 16+ 114min' />)
    }

    return(
      <> {thumbs} </>
    );
  }

  return (
    <section className="carousel">
      <h2>{category}</h2>
      <hr />
      <div className="carousel__container">
        { thumbMaker() }
      </div>
    </section>
  );
}

export default Carousel;