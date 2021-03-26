import React from 'react';
import Header from './Header';
import MessageSide from './MessageSide';
import MessageMain from './MessageMain';

function Message() {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
          <MessageSide />
          <MessageMain />
      </div>
    </div>
  );
}

export default Message;
