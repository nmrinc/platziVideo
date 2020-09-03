import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Seeker from '../../components/Seeker';
import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';

const API = 'http://localhost:3000/initalState';

const Home = () => {

  const [videos, setvideos] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(data => setvideos(data))
      .catch(err => console.error(`There was an error: ${err}`));
  }, []);

  return (
    <>
      <Header />
      <Seeker />
      {
        videos && Object.keys(videos).map((item,key) => {
          if (videos[item].length) {
            let category = '';

            switch (item) {
              case 'trends': {
                category = 'Trends';
                break;
              }
              case 'originals': {
                category = 'Platzi originals';
                break;
              }
              default: {
                category = 'My list'
              }
            }

            return ( <Carousel key={`${key}_${item}`} category={category} data={videos[item]} /> )
          }
        })
      }
      <Footer />
    </>
  );
}

export default Home;