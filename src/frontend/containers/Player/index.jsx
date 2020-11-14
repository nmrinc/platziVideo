import React, { useEffect, useState } from 'react';
//import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVideoSource } from '../../actions';
import NotFound from '../NotFound';
import Loader from '../../components/Loader';

const Player = (props) => {

  const { playing, getVideoSource } = props;

  const { id } = useParams();
  const [hasPlaying, sethasPlaying] = useState(false);
  //const hasPlaying = Object.keys(props.playing).length > 0;

  const [loading, setloading] = useState(true);

  useEffect(() => {
    let didCancel = false;
    (async () => {
      !didCancel && setloading(true);
      try {
        await getVideoSource(id);
        !didCancel && sethasPlaying(true);
      } catch (err) {
        sethasPlaying(false);
      } finally {
        !didCancel && setloading(false);
      }
    })();
    return () => { didCancel = true; };
  }, [id, getVideoSource]);

  // return hasPlaying ?( Another solution is to get a loading state and then load the component
  if (loading) {
    return <Loader />;
  }

  return (
    !hasPlaying ?
      <NotFound /> : (
        <div className='player'>
          <video controls autoPlay='autoPlay'>
            <source src={playing.source} type='video/mp4' />
          </video>
          <div className='Player-back'>
            <button type='button' onClick={() => props.history.goBack()}>
              Home
            </button>
          </div>
        </div>
      )
  );

  //) : <Redirect to="/404/" />; With this solution, our app load the 404 element quicker than the validation of the video.
  //) : <NotFound /> // One solution to this error could be calling the notfound object directly and since it last a little more to load it gives that effect.
};

const mapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};

const mapDispatchToProps = {
  getVideoSource,
};

Player.propTypes = {
  getVideoSource: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
