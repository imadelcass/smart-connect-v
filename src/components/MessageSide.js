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
    <div
      style={{
        padding: '20px',
        width: '30vw',
        height: '90vh',
        borderRight: '1px solid #333',
      }}
    >
      <div
        style={{ display: 'flex', marginBottom: '20px' }}
        className='Message__head'
      >
        <img
          style={{
            objectFit: 'cover',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
          }}
          src={current.image}
        />
        <h2 style={{ paddingLeft: '20px', position: 'relative', top: '10px' }}>
          Discussions
        </h2>
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

// const [nameEmail, setNameEmail] = useState('');
// const [imgUser, setimgUser] = useState('');
// const abortController = new AbortController();
// const signal = abortController.signal;
// const [user, setuser] = useState('');
// useEffect(() => {
//   auth.onAuthStateChanged(user => {
//     setNameEmail(user.email);
//   });
// }, []);
// const fetchData = new Promise((resolve, reject) => {
//     resolve(axios.get('/demo/users', { signal: signal }));
//   });
// const getUser = users => {
//     users.filter(user => {
//       if (user.email == nameEmail) {
//         console.log(user);
//         setuser(user);
//       }
//   });
// };
//   fetchData
//   .then(users => {
//     console.log(users.data);
//   //   users.data.map(user => {
//   //     if (user.email == nameEmail) {
//   //       setuser(user);
//   //     }
//   // });
// })
// function getuserdata(user) {
//   return user.email == nameEmail;
// }
// let data = [];
// useEffect(async () => {
//   const response = await fetch('https://creat-api.herokuapp.com/demo/users', { signal: signal });
//   data = await response.json();
//   // console.log(data);
//   setuser(data.filter(getuserdata))
//   console.log(user);

//    //clean
//   return function cleanup() {
//     abortController.abort();
//   };
// }, []);
