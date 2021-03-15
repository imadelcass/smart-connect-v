import React, { createContext, useState } from 'react';
import { auth, db } from './firebase';

export const CurrentUserContext = createContext();

export const CurrentUserProvider = props => {
  const [current, setcurrent] = useState();
  auth.onAuthStateChanged(user => {
    db.collection('users')
      .get()
      .then(docs =>
        setcurrent(
          docs.docChanges().filter(doc => {
            if (doc.doc.data().email == user.email) {
              return doc;
            }
          })
        )
      );
  });
  return (
    <CurrentUserContext.Provider value={[current, setcurrent]}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};
