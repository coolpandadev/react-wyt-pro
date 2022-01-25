import React from 'react';

const Button = ({cb, color, children}) => {
  return (
    <button onClick={cb} className={`${color} rounded-full py-1 px-4`}>
        {children}
    </button>
  )
};

export default Button;
