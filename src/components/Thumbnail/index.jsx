import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setFavourite } from '../../actions';

const Thumbnail = (props) => {

  const { cover, title, year, contentRating, duration, id } = props;

  const handleSetFavourite = () => {
    props.setFavourite({
      cover, title, year, contentRating, duration, id
    });
  }

  return (
    <div className="carousel-thumbnail">
      <img className="carousel-thumbnail__img" src={cover} alt="" />
      <div className="carousel-thumbnail__details">
        <button className="playButt"><FontAwesomeIcon icon="play-circle" size="2x" /></button>
        <button className="plusButt" onClick={handleSetFavourite}><FontAwesomeIcon icon="plus-circle" size="2x" /></button>
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
  handleSetFavourite: PropTypes.func,
}

const mapDispatchToProps = {
  setFavourite
}

export default connect(null, mapDispatchToProps)(Thumbnail);