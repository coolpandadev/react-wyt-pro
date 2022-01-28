import React from 'react';

const Button = ({cb, color, children, classnames, type}) => {
  return (
    <button type={type} onClick={cb} className={`${color} ${classnames} rounded-md py-1 px-4 font-header uppercase`}>
        {children}
    </button>
  )
};

export default Button;
