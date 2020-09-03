import React from 'react';

const Thumbnail = ({ cover, title, year, contentRating, duration }) => {

  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={cover} alt="" />
      <div className="carousel-item__details">
        <button className="playButt"><i className="fi-cnsrx2-caret-solid"></i></button>
        <button className="plusButt"><i className="fi-cwsux2-plus-solid"></i></button>
        <p className="carousel-item__details--title">{title}</p>
        <p className="carousel-item__details--subtitle">{
          `${year} | ${contentRating} | ${duration}m`
        }</p>
      </div>
    </div>
  )
}

export default Thumbnail;