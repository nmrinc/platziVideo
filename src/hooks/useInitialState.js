import { useState, useEffect } from 'react';

const useInitialState = (API) => {
  const [props, setprops] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(data => setprops(data))
      .catch(err => console.error(`There was an error: ${err}`));
  }, []);
  return props;
}

export default useInitialState;