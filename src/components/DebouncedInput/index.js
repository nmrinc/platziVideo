import React, { useState, useCallback } from "react";

function useDebouncedValue(initialVal, delay, callback) {
  // state to store value of the input
  const [val, setValue] = useState(initialVal);
  // state to store the timer
  const [timer, setTimer] = useState(null);

  // function to be called on every change of input
  const handleInputChange = useCallback(
    event => {
      const tn = event.target.name;
      // assigning the value to a local variable
      // Or you can make the event persist if you want to pass around the event obj
      const inputVal = event.target.value;
      // setting the value for immediate use
      setValue(inputVal);
      // the same old code checking & clearing if a callback is already scheduled
      if (timer) {
        clearTimeout(timer);
      }
      // setting a new callback to execute
      const timerId = setTimeout(() => callback(inputVal,tn), delay);
      setTimer(timerId);

      // if components unmounts when there is a scheduled callback
      // then clearing out the callback
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    },
    [callback, delay, timer]
  );

  // returning the val and the debounceChange which can be assigned
  // to a input onchange handler

  return [val, handleInputChange];
}

export default function InputComp({ onDebouncedValChange, delay, typeO, className, placeholder, name }) {
  const [val, handleInputChange] = useDebouncedValue(
    "",
    delay,
    onDebouncedValChange,
  );

  return <input type={typeO} value={val} onChange={handleInputChange} className={className} placeholder={placeholder} name={name} />;
}


{/*
    /// USE OF DEBOUNCE HOOK
    <DebouncedInput
      onDebouncedValChange={val => {
        console.log("called with val ", val);
      }}
      type='password'
      delay={300}
    />
*/}