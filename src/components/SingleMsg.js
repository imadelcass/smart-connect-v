import React from 'react';

const SingleMsg = ({ body, current, transmitter }) => {
  return (
    <div
        id='SingleMsg__both'
      className={
        current == transmitter ? 'SingleMsg__Current' : 'SingleMsg__Transmitter'
      }
    >
      <h3 className='SingleMsg__body'>{body}</h3>
    </div>
  );
};
export default SingleMsg;
