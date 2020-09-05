import React from 'react';
import PropTypes from 'prop-types';

const useCreateItems = ({props, Comp}) => {
  let items = props.map(item =>
    <Comp key={item.id} {...item} />
  );

  return (<>{items}</>);
}

useCreateItems.propTypes = {
  props: PropTypes.object,
  Comp: PropTypes.object
}

export default useCreateItems;