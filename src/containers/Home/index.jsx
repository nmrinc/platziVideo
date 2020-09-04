import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Seeker from '../../components/Seeker';
import Carousel from '../../components/Carousel';
import Thumbnail from '../../components/Thumbnail';
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

  const itemCreator = (props) => {
    let items = props.map(item =>
      <Thumbnail key={item.id} {...item} />
    );

    return (<>{items}</>);
  }

  const cats = [ 'My list', 'Trends', 'Platzi originals' ];

  return (
    <>
      <Header />
      <Seeker />
      {
        videos && Object.keys(videos).map((category, key) => {
          if (videos[category].length) {
            return (
              <Carousel key={`${key}_${category}`} category={cats[key]}>
                {
                  itemCreator(videos[category])
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