import React, { useState } from 'react';

function Friend({id, name, image }) {

  const displayMessages = e => {
    
  }


  return (
    <div
      key ={id}
      onClick={displayMessages}
      style={{
        display: 'flex',
        border: '1px solid #333',
        borderRadius: '10px',
        padding: '5px',
        cursor: 'pointer',
      }}
    >
      <img
        style={{
          objectFit: 'cover',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          marginRight: '15px',
        }}
        src={image}
      />
      <div>
        <h3 style={{ paddingBottom: '5px' }}>{name}</h3>
        <h5>on ligne</h5>
      </div>
    </div>
  );
}
export default Friend;
