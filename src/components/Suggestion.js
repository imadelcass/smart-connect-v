import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import { EmailContext } from './EmailContext';
import { db } from './firebase';
import Header from './Header';
function Suggestion() {
  const [current, setcurrent] = useContext(CurrentUserContext);
  const [nameEmail, setNameEmail] = useContext(EmailContext);
  const [friendsReq, setfriendsReq] = useState([]);

  useEffect(() => {
    db.collection('users')
      .doc(current.id)
      .collection('friendsRequest')
      .onSnapshot(snapshot => {
        // setfriendsReq(
        snapshot.docs.map(doc => {
          // doc.data();
          setfriendsReq([doc.data()]);
        });
        // );
      });
  }, []);

  return (
    <div>
      <Header />
      <button onClick={() => console.log(current)}>{nameEmail}</button>
      <div>
        {friendsReq.map(friendReq => {
          return <h1 key={friendReq.name}>{friendReq.name}</h1>;
        })}
      </div>
    </div>
  );
}

export default Suggestion;
