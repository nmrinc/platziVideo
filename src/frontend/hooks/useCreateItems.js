import React from 'react';
import PropTypes from 'prop-types';

const useCreateItems = ({ props, Comp, plus, minus, belong }) => {

  const items = props.map((item) => (belong === 'myList' ?
    <Comp key={item.id} props={item} useMe={plus} killMe={minus} isList /> :
    <Comp key={item.id} props={item} useMe={plus} killMe={minus} />));

  return (<>{items}</>);
};

useCreateItems.propTypes = {
  props: PropTypes.object,
  Comp: PropTypes.object,
  plus: PropTypes.func,
  minus: PropTypes.func,
  belong: PropTypes.bool,
};

export default useCreateItems;
