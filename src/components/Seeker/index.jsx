import React from 'react';
import className from 'classnames';

const Seeker = ({ isHome }) => {

  const inputStyles = className('seeker__input', {
    isHome
  })

  return (
    <section className={"seeker"}>
      <h2 className="seeker__title">What would you like to see today?</h2>
      <input className={inputStyles} type="text" placeholder="Search..." />
    </section>
  );
}
export default Seeker;