import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Seeker from '../../components/Seeker';
import Carousel from '../../components/Carousel';
import Thumbnail from '../../components/Thumbnail';

import useCreateItems from '../../hooks/useCreateItems';
import { setFavourite, removeFavourite, searchVideo } from '../../actions';

const Home = (props) => {

  const { data, searchVideo, removeFavourite } = props;

  const { findings, myList, trends, originals } = data;

  const categories = {
    findings,
    myList,
    trends,
    originals,
  };
  const cats = ['Finders Keepers', 'My list', 'Trends', 'Platzi originals'];

  const handleSetFavourite = (used) => {
    const action = props.setFavourite;

    if (categories['myList'].length) {
      if (categories['myList'].indexOf(used) === -1) action(used);
    } else {
      action(used);
    }
  };

  const handleRemoveFavourite = (payload) => removeFavourite(payload);

  const handleSearch = async (payload) => searchVideo(payload);

  const CreateItems = (args) => {
    return useCreateItems({ props: args.props, Comp: Thumbnail, plus: handleSetFavourite, minus: handleRemoveFavourite, belong: args.belong });
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
  setFavourite,
  removeFavourite,
  searchVideo,
};

Home.propTypes = {
  setFavourite: PropTypes.func,
  removeFavourite: PropTypes.func,
  searchVideo: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
