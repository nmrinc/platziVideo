import React from 'react';
import Header from '../../components/Header';
import Seeker from '../../components/Seeker';
import Carousel from '../../components/Carousel';

import img1 from './../../assets/img/jpg/1.jpg';
import img2 from './../../assets/img/jpg/2.jpg';
import img3 from './../../assets/img/jpg/3.jpg';
import img0 from './../../assets/img/jpg/0.jpg';
import img4 from './../../assets/img/jpg/4.jpg';
import img5 from './../../assets/img/jpg/5.jpg';
import img6 from './../../assets/img/jpg/6.jpg';
import img7 from './../../assets/img/jpg/7.jpg';
import img8 from './../../assets/img/jpg/8.jpg';
import img9 from './../../assets/img/jpg/9.jpg';

let images= [img0,img1,img2,img3,img4,img5,img6,img7,img8,img9];

const Home = () => (
  <>
  <Header />
  <Seeker />
  <Carousel category='My list' images={images} />
  <Carousel category='Trending' images={images} />
  <Carousel category='Platzi Originals' images={images} />
  </>
);

export default Home;