import React from 'react';
import Header from '../../components/Header';
import Seeker from '../../components/Seeker';
import Carousel from '../../components/Carousel';

const Home = () => (
  <>
  <Header />
  <Seeker />
  <Carousel category='My list' howMany={10} />
  <Carousel category='Trending' howMany={10} />
  <Carousel category='Platzi Originals' howMany={10} />
  </>
);

export default Home;