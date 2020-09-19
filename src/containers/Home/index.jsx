import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Seeker from '../../components/Seeker';
import Carousel from '../../components/Carousel';
import Thumbnail from '../../components/Thumbnail';

import useCreateItems from '../../hooks/useCreateItems';
import { setFavourite, removeFavourite, searchVideo } from '../../actions';

const Home = (props) => {
  const categories = {
    findings: props.findings,
    mylist: props.mylist,
    trends: props.trends,
    originals: props.originals,
  };
  const cats = ['Finders Keepers','My list', 'Trends', 'Platzi originals'];

  const handleSetFavourite = (used) => {
    const action = props.setFavourite;

    if (categories['mylist'].length) {
      if (categories['mylist'].indexOf(used) === -1) action(used);
    } else {
      action(used);
    }
  }

  const handleRemoveFavourite = (itemId) => props.removeFavourite(itemId);

  const handleSearch = async (payload) => await props.searchVideo(payload);

  return (
    <>
      <section className="seeker">
        <h2 className="seeker__title">What would you want to see today?</h2>
        <Seeker isHome searchAction={handleSearch} />
      </section>
      {
        Object.keys(categories).map((category, key) => {
          if (categories[category].length) {
            return (
              <Carousel key={`${key}_${category}`} category={cats[key]}>
                {
                  useCreateItems({ props: categories[category], Comp: Thumbnail, plus: handleSetFavourite, minus: handleRemoveFavourite, belong: category })
                }
              </Carousel>
            )
          }
        })
      }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    findings: state.findings,
    mylist: state.mylist,
    trends: state.trends,
    originals: state.originals,
  }
}

const mapDispatchToProps = {
  setFavourite,
  removeFavourite,
  searchVideo,
}

Home.propTypes = {
  props: PropTypes.object,
  setFavourite: PropTypes.func,
  removeFavourite: PropTypes.func,
  searchVideo: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);