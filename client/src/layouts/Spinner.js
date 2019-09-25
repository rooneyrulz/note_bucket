import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <img
      style={{
        display: 'block',
        alignItems: 'center',
        textAlign: 'center',
        margin: 'auto'
      }}
      src={spinner}
      alt=''
    />
  );
};

export default Spinner;
