import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import Friend from './Friend';
import { CurrentUserContext } from './CurrentUserContext';
import { db } from './firebase';
import WaitData from './WaitData';

function MessageSide() {
  const [current, friendsReq] = useContext(CurrentUserContext);
  const [friends, setfriends] = useState([]);
  const [dataState, setdataState] = useState(false);
  // get all friends from friendsList collection in firestore:
  useEffect(() => {
    if (current.id == undefined) {
      setdataState(false);
    } else {
      db.collection('users')
        .doc(current.id)
        .collection('friendsList')
        .onSnapshot(snap => {
          setfriends(snap.docs.map(friend => friend.data()));
        });
      setdataState(true);
    }
  }, [current]);
  return (
    <div className='MessageSide'>
      <div className='MessageSide__profile'>
        <img className='MessageSide__profileImg' src={current.image} />
        <h2 className='MessageSide__profileTitle'>Discussions</h2>
      </div>
      <div className='friends'>
        {!dataState ? (
          <WaitData />
        ) : (
          friends.map(friend => {
            return (
              <Friend
                key={friend.id}
                value={friend.id}
                name={friend.name}
                image={friend.image}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default MessageSide;
