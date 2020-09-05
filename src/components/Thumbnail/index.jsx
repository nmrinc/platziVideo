import React from 'react';
import PropTypes from 'prop-types';

const Thumbnail = ({ cover, title, year, contentRating, duration }) => {

  return (
    <div className="carousel-thumbnail">
      <img className="carousel-thumbnail__img" src={cover} alt="" />
      <div className="carousel-thumbnail__details">
        <button className="playButt"><i className="fi-cnsrx2-caret-solid"></i></button>
        <button className="plusButt"><i className="fi-cwsux2-plus-solid"></i></button>
        <p className="carousel-thumbnail__details--title">{title}</p>
        <p className="carousel-thumbnail__details--subtitle">{
          `${year} | ${contentRating} | ${duration}m`
        }</p>
      </div>
    </div>
  )
}

Thumbnail.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
}

export default Thumbnail;