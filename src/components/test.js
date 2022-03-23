import React, { useRef, useState } from 'react';

export const Test = () => {
  const [input, setInput] = useState('');
  const ref = useRef();
  return (
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)} />

      <div> {input}</div>
      <input ref={ref} />
      <div> {ref?.current?.value} </div>
    </>
  );
};
