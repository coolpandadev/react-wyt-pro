import React from 'react';

const StickyButton = ({cb, classnames, children, disabled}) => {
  return (
        <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-2 w-screen">
            <p 
                className={`rounded-md py-2 px-4 m-auto w-full inline-flex justify-center items-center font-header text-lg ${classnames}`}
                onClick={ disabled ? null : ()=>cb() }
                >
                {children}</p>
        </div>
  );
};

export default StickyButton;
