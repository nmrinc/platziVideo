import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Seeker from '../../components/Seeker';
import Carousel from '../../components/Carousel';
import Thumbnail from '../../components/Thumbnail';

import useCreateItems from '../../hooks/useCreateItems';
import { setUserMovie, deleteUserMovie, searchVideo } from '../../actions';

const Home = (props) => {

  const { data, searchVideo, setUserMovie, deleteUserMovie } = props;

  const { findings, myList, trends, originals } = data;

  const categories = {
    findings,
    myList,
    trends,
    originals,
  };
  const cats = ['Finders Keepers', 'My list', 'Trends', 'Platzi originals'];

  const handleSetUserMovie = (used) => {
    const fIndex = (el) => el._id === used;
    const copyCat = myList.findIndex(fIndex);

    if (myList.length) {
      if (copyCat === -1) setUserMovie(used);
    } else {
      setUserMovie(used);
    }
  };

  const handleDeleteUserMovie = (payload) => deleteUserMovie(payload);

  const handleSearch = async (payload) => searchVideo(payload);

  const CreateItems = (args) => {
    return useCreateItems({ props: args.props, Comp: Thumbnail, plus: handleSetUserMovie, minus: handleDeleteUserMovie, belong: args.belong });
  };

  return (
    <>
      <section className='seeker'>
        <h2 className='seeker__title'>What would you like to see today?</h2>
        <Seeker isHome searchAction={handleSearch} />
      </section>
      {
        Object.keys(categories).map((category, key) => {
          if (categories[category].length) {
            return (
              <Carousel key={`${category}`} category={cats[key]}>
                {
                  CreateItems({ props: categories[category], belong: category })
                }
              </Carousel>
            );
          }
          return null;
        })
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

const mapDispatchToProps = {
  setUserMovie,
  deleteUserMovie,
  searchVideo,
};

Home.propTypes = {
  setUserMovie: PropTypes.func,
  deleteUserMovie: PropTypes.func,
  searchVideo: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
