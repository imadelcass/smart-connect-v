import { Button, Input } from '@material-ui/core';
import React from 'react';
import MessageMainLogic from './MessageMainLogic';
import SearchUsers from './SearchUsers';
import SingleMsg from './SingleMsg';
function MessageMain() {
  const {
    displayUsers,
    usersStyle,
    filterUsers,
    inputRef,
    filtredUsers,
    singleMsg,
    messages,
    current,
    setsingleMsg,
    addMessage,
  } = MessageMainLogic();
  return (
    <div className='MessageMain'>
      <SearchUsers
        usersStyle={usersStyle}
        displayUsers={displayUsers}
        filterUsers={filterUsers}
        filtredUsers={filtredUsers}
        inputRef={inputRef}
      />
      <div className='MessageMain__msgBoard'>
        <div className='MessageMain__sendMsgWrapper'>
          <div className='MessageMain__sendMsg'>
            <input
              className='MessageMain__sendMsgInput'
              onChange={e => setsingleMsg(e.target.value)}
              value={singleMsg}
            />
            <Button
              className='MessageMain__sendMsgBtn'
              disabled={!singleMsg}
              variant='contained'
              color='secondary'
              onClick={addMessage}
            >
              Send
            </Button>
          </div>
        </div>
        <div className='MessageMain__messages'>
          {messages.map(message => {
            return (
              <SingleMsg
                key={message.body}
                body={message.body}
                current={current.name}
                transmitter={message.transmitter}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MessageMain;
