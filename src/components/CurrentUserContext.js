import React, { createContext, useState } from 'react';
import { auth, db } from './firebase';

export const CurrentUserContext = createContext();
//yehh
export const CurrentUserProvider = props => {
  const [current, setcurrent] = useState({});
  auth.onAuthStateChanged(user => {
    db.collection('users')
      .get()
      .then(docs => {
        docs.docChanges().forEach(docs => {
          if (docs.doc.data().email == user.email) {
            setcurrent(docs.doc.data())
          }
        });
      });
  });
  return (
    <CurrentUserContext.Provider value={[current, setcurrent]}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};
// setcurrent(
//   docs.docChanges().filter(doc => {
//     if (doc.doc.data().email == user.email) {
//       return doc;
//     }
//   })
// );
// console.log(current);
