// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { CurrentUserContext } from './CurrentUserContext';
// import { db } from './firebase';

// export const FriendsReqContext = createContext();

// export const FriendsReqProvider = props => {
//   // const [current, setcurrent] = useContext(CurrentUserContext);
//   const [friendsReq, setfriendsReq] = useState([]);

//   useEffect(() => {
//     db.collection('users')
//       .doc('gKIu3l8QrW0aVgPBwwWx')
//       .collection('friendsRequest')
//       .onSnapshot(snapshot => {
//         setfriendsReq(snapshot.docs.map(doc => doc.data()))
//       });
//   }, []);
//   return (
//     <FriendsReqContext.Provider value={[friendsReq, setfriendsReq]}>
//       {props.children}
//     </FriendsReqContext.Provider>
//   );
// };
