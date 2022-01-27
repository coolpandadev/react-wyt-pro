import React from 'react';

const LinkButtons = ({url, children, color, classnames}) => {
  return (
    <a href={url} className={`${color} ${classnames} rounded-md py-1 px-4 font-header uppercase`}>
        {children}
    </a>
  );
};

export default LinkButtons;
