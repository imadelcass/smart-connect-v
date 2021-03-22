import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import { EmailContext } from './EmailContext';
import { db } from './firebase';
import Header from './Header';
function Suggestion() {
  const [current, friendsReq] = useContext(CurrentUserContext);
  //add to friends
  const addToFriends = e => {
    //1: add to firestore
    let newFriend = friendsReq.find(friend => {
      return friend.id == e.target.value;
    });
    db.collection('users')
      .doc(current.id)
      .collection('friendsList')
      .doc(e.target.value)
      .set(newFriend);
    // add current user to friend
    db.collection('users')
      .doc(e.target.value)
      .collection('friendsList')
      .doc(current.id)
      .set(current);
    // creat documet for the current/friend for messages
    db.collection('friends')
      .doc(current.id+e.target.value)
      .collection('messages')
      .add({
        body: 'hey man !!!',
      })
      .then(() => {
        db.collection('friends')
          .doc(current.id+e.target.value)
          .set({
            id: current.id + e.target.value,
          });
      });
    //2: remove it from the friendsRequest
    db.collection('users')
      .doc(current.id)
      .collection('friendsRequest')
      .doc(e.target.value)
      .delete()
      .then(e => console.log('deleted successfully', e))
      .catch(e => console.log('something went wrong', e));
  };
  return (
    <div>
      <Header />
      {/* <button onClick={() => console.log(current)}>click</button> */}
      <div className='margin__bottom'></div>
      <div className='friendReq__container'>
        {friendsReq.map(friend => {
          const { age, email, id, image, name } = friend;
          return (
            <section className='friendReq' key={id}>
              <img className='friendReq__img' src={image} alt={name} />
              <div className='friendReq__info'>
                <h3 style={{ paddingBottom: '1.3rem' }}>{name}</h3>
                <h5>{age} years</h5>
              </div>
              <div className='friendReq__btns'>
                <button className='friendReq__btnReject'>reject</button>
                <button
                  value={id}
                  onClick={addToFriends}
                  className='friendReq__btnAccept'
                >
                  accept
                </button>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
export default Suggestion;
