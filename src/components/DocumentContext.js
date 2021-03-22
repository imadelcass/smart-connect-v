import React, { createContext, useState } from 'react';
import { Children } from 'react';

export const DocumentContext = createContext();

export const DocumentContextProvider = props => {
  const [document, setDocument] = useState({
    state: false,
    id: '',
  });

  return (
    <DocumentContext.Provider value={[document, setDocument]}>
      {props.children}
    </DocumentContext.Provider>
  );
};
