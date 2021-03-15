import React from 'react';
import Header from './Header';
import MessageSide from './MessageSide';
import MessageMain from './MessageMain';

function Message() {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{flex : '1'}}>
          <MessageSide />
        </div>
        <div style={{flex : '2'}}>
          <MessageMain />
        </div>
      </div>
    </div>
  );
}

export default Message;
