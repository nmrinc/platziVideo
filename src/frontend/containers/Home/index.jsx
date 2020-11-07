import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Seeker from '../../components/Seeker';
import Carousel from '../../components/Carousel';
import Thumbnail from '../../components/Thumbnail';

import useCreateItems from '../../hooks/useCreateItems';
import { setFavourite, removeFavourite, searchVideo } from '../../actions';

const Home = (props) => {

  const { data } = props;

  const { findings, mylist, trends, originals } = data;

  const categories = {
    findings,
    mylist,
    trends,
    originals,
  };
  const cats = ['Finders Keepers', 'My list', 'Trends', 'Platzi originals'];

  const handleSetFavourite = (used) => {
    const action = props.setFavourite;

    if (categories['mylist'].length) {
      if (categories['mylist'].indexOf(used) === -1) action(used);
    } else {
      action(used);
    }
  };

  const handleRemoveFavourite = (payload) => props.removeFavourite(payload);

  const handleSearch = async (payload) => props.searchVideo(payload);

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
                  useCreateItems({ props: categories[category], Comp: Thumbnail, plus: handleSetFavourite, minus: handleRemoveFavourite, belong: category })
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
