import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Thumbnail = ({ props, useMe, killMe, isList }) => {

  const { cover, title, year, contentRating, duration, id } = props;

  return (
    <div className="carousel-thumbnail">
      <img className="carousel-thumbnail__img" src={cover} alt="" />
      <div className="carousel-thumbnail__details">
        <button className="playButt"><FontAwesomeIcon icon="play-circle" size="2x" /></button>
        {
          isList
            ?
            <button
              className="minusButt"
              onClick={() => killMe(id)}>
              <FontAwesomeIcon icon="minus-circle" size="2x" />
            </button>
            :
            <button
              className="plusButt"
              onClick={() => useMe(props)}>
              <FontAwesomeIcon icon="plus-circle" size="2x" />
            </button>
        }
        <p className="carousel-thumbnail__details--title">{title}</p>
        <p className="carousel-thumbnail__details--subtitle">{
          `${year} | ${contentRating} | ${duration}m`
        }</p>
      </div>
    </div>
  );
}

Thumbnail.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
  id: PropTypes.number,
  useMe: PropTypes.func,
  killMe: PropTypes.func,
  isList: PropTypes.bool,
}

export default Thumbnail;