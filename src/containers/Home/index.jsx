import React from 'react';
import { connect } from 'react-redux';

import Seeker from '../../components/Seeker';
import Carousel from '../../components/Carousel';
import Thumbnail from '../../components/Thumbnail';

import useCreateItems from '../../hooks/useCreateItems';
import { setFavourite, removeFavourite } from '../../actions';

const Home = (props) => {
  const categories= {
    mylist: props.mylist,
    trends: props.trends,
    originals: props.originals,
  };
  const cats = ['My list', 'Trends', 'Platzi originals'];

  const handleSetFavourite = (used) => {
    const action = props.setFavourite;

    if (categories['mylist'].length){
      if(categories['mylist'].indexOf(used) === -1) action(used);
    }else{
      action(used);
    }
  }

  const handleRemoveFavourite = (itemId) => {
    props.removeFavourite(itemId);
  }

  return (
    <>
      <Seeker isHome />
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
    mylist: state.mylist,
    trends: state.trends,
    originals: state.originals,
  }
}

const mapDispatchToProps = {
  setFavourite,
  removeFavourite,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);