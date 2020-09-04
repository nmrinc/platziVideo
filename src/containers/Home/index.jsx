import React from 'react';

import Header from '../../components/Header';
import Seeker from '../../components/Seeker';
import Carousel from '../../components/Carousel';
import Thumbnail from '../../components/Thumbnail';
import Footer from '../../components/Footer';

import useInitialState from './../../hooks/useInitialState';
import useCreateItems from '../../hooks/useCreateItems';

const API = 'http://localhost:3000/initalState';

const Home = () => {

  const initialState = useInitialState(API);
  const cats = [ 'My list', 'Trends', 'Platzi originals' ];

  return (
    <>
      <Header />
      <Seeker />
      {
        initialState && Object.keys(initialState).map((category, key) => {
          if (initialState[category].length) {
            return (
              <Carousel key={`${key}_${category}`} category={cats[key]}>
                {
                  useCreateItems({props:initialState[category], Comp:Thumbnail })
                }
              </Carousel>
            )
          }
        })
      }
      <Footer />
    </>
  );
}

export default Home;