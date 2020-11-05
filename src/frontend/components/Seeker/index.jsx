import React, { useEffect, useState } from 'react';
import className from 'classnames';
import useDebounceValue from '../../hooks/useDebounceValue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Seeker = ({ isHome, searchAction }) => {

  const [form, setValues] = useState('');

  const clearInput = e => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    setValues('');
  }

  const debouncedValue = useDebounceValue(form, 500);

  useEffect(() => {
    let didCancel = false;
    if (debouncedValue) {
      !didCancel && searchAction(form);
    } else {
      !didCancel && searchAction('');
    }
    return () => { didCancel = true; }
  }, [debouncedValue]);

  const inputStyles = className('seeker__input-container', {
    isHome
  })

  return (
    <>
      <form>
        <div className={inputStyles}>
          <input
            className="seeker__input"
            placeholder="Search..."
            name="Search"
            type='text'
            value={form}
            onChange={e => setValues(e.target.value)}
          />
          <button
            type="reset"
            className="seeker__search-butt"
            onClick={clearInput}
          >
            {
              form.length > 0
                ?
                <FontAwesomeIcon icon="times" fixedWidth />
                :
                <FontAwesomeIcon icon="search" fixedWidth />
            }
          </button>
        </div>
      </form>
    </>
  );
}
export default Seeker;