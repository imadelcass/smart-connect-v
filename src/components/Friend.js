import { Avatar } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import { DocumentContext } from './DocumentContext';
import { db } from './firebase';

function Friend({ value, name, image, age, setFriend }) {
  const [document, setDocument] = useContext(DocumentContext);
  const [current, friendsReq] = useContext(CurrentUserContext);
  const displayMessages = e => {
    setFriend({ name: name, image: image, age: age, friendClicked: true });
    db.collection('friends')
      .doc(current.id + value)
      .get()
      .then(doc => {
        if (doc.exists) {
          setDocument({
            state: true,
            id: current.id + value,
          });
        } else {
          setDocument({
            state: true,
            id: value + current.id,
          });
        }
      });
  };

  return (
    <div className='friend' onClick={displayMessages}>
      <img className='friendImg' src={image} />
      <div>
        <h3 className='friendName'>{name}</h3>
        <h5 className='friendOnligne'>on ligne</h5>
      </div>
    </div>
  );
}
export default Friend;
