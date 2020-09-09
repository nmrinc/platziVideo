import React from 'react';
import { connect } from 'react-redux';

import Seeker from '../../components/Seeker';
import Carousel from '../../components/Carousel';
import Thumbnail from '../../components/Thumbnail';

import useCreateItems from '../../hooks/useCreateItems';

const Home = ({ categories }) => {
  const cats = [ 'My list', 'Trends', 'Platzi originals' ];

  return (
    <>
      <Seeker />
      {
        Object.keys(categories).map((category, key) => {
          if (categories[category].length) {
            return (
              <Carousel key={`${key}_${category}`} category={cats[key]}>
                {
                  useCreateItems({props:categories[category], Comp:Thumbnail })
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
    categories: state.cats,
  }
}

export default connect(mapStateToProps, null)(Home);