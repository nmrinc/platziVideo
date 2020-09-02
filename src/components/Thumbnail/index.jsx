import React from 'react';

const Thumbnail = (props) => {
  let { imgURL, title, details } = props;

  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={imgURL} alt="" />
      <div className="carousel-item__details">
        <button className="playButt"><i className="fi-cnsrx2-caret-solid"></i></button>
        <button className="plusButt"><i className="fi-cwsux2-plus-solid"></i></button>
        <p className="carousel-item__details--title">{title}</p>
        <p className="carousel-item__details--subtitle">{details}</p>
      </div>
    </div>
  )
}

export default Thumbnail;