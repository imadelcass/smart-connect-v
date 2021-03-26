import React, { createContext, useEffect, useState } from 'react';
import { auth, db } from './firebase';

export const CurrentUserContext = createContext();
export const CurrentUserProvider = props => {
  const [current, setcurrent] = useState({});
  const [friendsReq, setfriendsReq] = useState([]);
  // get the current user
  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        db.collection('users')
          .get()
          .then(docs => {
            docs.docChanges().some(docs => {
              if (user == null) {
                return true;
              } else if (docs.doc.data().email == user.email) {
                setcurrent(docs.doc.data());
                resolve(docs.doc.data().id);
              }
            });
          });
      });
    });
  };
  useEffect(() => {
    getCurrentUser().then(id => {
      // get all friends request
      db.collection('users')
        .doc(id)
        .collection('friendsRequest')
        .onSnapshot(snapshot => {
          setfriendsReq(snapshot.docs.map(doc => doc.data()));
        });
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={[current, friendsReq]}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};

