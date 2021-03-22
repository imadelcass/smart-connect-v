import React, { useContext, useState } from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import { DocumentContext } from './DocumentContext';
import { db } from './firebase';

function Friend({value, name, image }) {
  const [document, setDocument] = useContext(DocumentContext);
    const [current, friendsReq] = useContext(CurrentUserContext);
  const displayMessages = e => {
    db.collection('friends')
      .doc(current.id+value)
      .get()
      .then(doc => {
       if (doc.exists) {
        //  console.log('yes');
         setDocument({
             state: true,
             id: current.id+value,
           });
          } 
          else{
          // console.log('no');
          setDocument({
            state: true,
            id: value+current.id,
          });
        }
      });
  };

  return (
    <div
    className='friend'
      onClick={displayMessages}
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
        <h5 style={{color: 'var(--colrThr)'}}>on ligne</h5>
      </div>
    </div>
  );
}
export default Friend;
