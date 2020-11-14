import React, { useEffect, useState } from 'react';
import className from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDebounceValue from '../../hooks/useDebounceValue';

const Seeker = ({ isHome, searchAction }) => {

  const [form, setValues] = useState('');

  const clearInput = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    setValues('');
  };

  const debouncedValue = useDebounceValue(form, 500);

  useEffect(() => {
    let didCancel = false;
    !didCancel && searchAction(debouncedValue ? form : '');
    return () => { didCancel = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, form]);

  const inputStyles = className('seeker__input-container', {
    isHome,
  });

  return (
    <>
      <form>
        <div className={inputStyles}>
          <input
            className='seeker__input'
            placeholder='Search...'
            name='Search'
            type='text'
            value={form}
            onChange={(e) => setValues(e.target.value)}
          />
          <button
            type='button'
            className='seeker__search-butt'
            onClick={clearInput}
          >
            {
              form.length > 0 ?
                <FontAwesomeIcon icon='times' fixedWidth /> :
                <FontAwesomeIcon icon='search' fixedWidth />
            }
          </button>
        </div>
      </form>
    </>
  );
};
export default Seeker;
