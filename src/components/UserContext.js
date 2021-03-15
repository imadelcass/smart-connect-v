import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
  const [user, setuser] = useState({
    name: '',
    age: '',
    email: '',
    image: '',
  });
  return (
    <UserContext.Provider value={[user, setuser]}>
      {props.children}
    </UserContext.Provider>
  );
};
