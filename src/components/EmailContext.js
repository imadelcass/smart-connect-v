import React, { createContext, useState } from 'react';

export const EmailContext = createContext();

export const EmailProvider = props => {
  const [nameEmail, setNameEmail] = useState('imadelcass@gmail.com');

  return (
    <EmailContext.Provider value={[nameEmail, setNameEmail]}>
      {props.children}
    </EmailContext.Provider>
  );
};
