import React, { useEffect, useState } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVideoSource } from '../../actions';
import NotFound from '../NotFound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Player = props => {
  const { id } = props.match.params;
  const hasPlaying = Object.keys(props.playing).length > 0;

  const [loading, setloading] = useState(true);

  useEffect(() => {
    props.getVideoSource(id);
    setloading(false);
  }, [])

  // return hasPlaying ?( Another solution is to get a loading state and then load the component
  if (loading) {
    return <div className="loading"><FontAwesomeIcon icon="spinner" spin size="6x" /></div>
  } else if (!hasPlaying) {
    return <NotFound />
  } else {
    return (
      <div className="player">
        <video controls autoplay="autoplay">
          <source src={props.playing.source} type="video/mp4" />
        </video>
        <div className="Player-back">
          <button type="button" onClick={() => props.history.goBack()}>
            Home
        </button>
        </div>
      </div>
    );
  }
  //) : <Redirect to="/404/" />; With this solution, our app load the 404 element quicker than the validation of the video.
  //) : <NotFound /> // One solution to this error could be calling the notfound object directly and since it last a little more to load it gives that effect.
}

const mapStateToProps = state => {
  return {
    playing: state.playing,
  }
}

const mapDispatchToProps = {
  getVideoSource,
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);