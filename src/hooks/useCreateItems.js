import React from 'react';

const useCreateItems = ({props, Comp}) => {
  let items = props.map(item =>
    <Comp key={item.id} {...item} />
  );

  return (<>{items}</>);
}

export default useCreateItems;