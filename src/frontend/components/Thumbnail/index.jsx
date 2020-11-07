import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Thumbnail = ({ props, useMe, killMe, isList }) => {

  const { cover, title, year, contentRating, duration, id } = props;

  return (
    <div className='carousel-thumbnail'>
      <img className='carousel-thumbnail__img' src={cover} alt='' />
      <div className='carousel-thumbnail__details'>
        <Link className='playButt' to={`/player/${id}`}>
          <FontAwesomeIcon icon='play-circle' size='lg' />
        </Link>
        {
          isList ? (
            <button
              type='button'
              className='minusButt'
              onClick={() => killMe(id)}
            >
              <FontAwesomeIcon icon='trash-alt' size='lg' />
            </button>
          ) : (
            <button
              type='button'
              className='plusButt'
              onClick={() => useMe(props)}
            >
              <FontAwesomeIcon icon='plus-circle' size='lg' />
            </button>
          )
        }
        <p className='carousel-thumbnail__details--title'>{title}</p>
        <p className='carousel-thumbnail__details--subtitle'>
          {
            `${year} | ${contentRating} | ${duration}m`
          }
        </p>
      </div>
    </div>
  );
};

Thumbnail.propTypes = {
  props: PropTypes.object,
  useMe: PropTypes.func,
  killMe: PropTypes.func,
  isList: PropTypes.bool,
};

export default Thumbnail;
