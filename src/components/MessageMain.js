import {
  Button,
  TextField,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from './axios';
import { db } from './firebase';
import firebase from 'firebase';
const image =
  'https://firebasestorage.googleapis.com/v0/b/clone-12b84.appspot.com/o/images%2Fimad.jpg?alt=media&token=005c8f74-c327-491e-badc-eaf25a17e1ff';
function MessageMain() {
  const [users, setusers] = useState([]);
  const [singleMsg, setsingleMsg] = useState('');
  const [messages, setmessages] = useState([]);

  const [myArr, setmyArr] = useState([{ body: 'sss' }]);
  useEffect(e => {
    db.collection('friends')
      .doc('vH9G5htiv9xjr0Yofi8I')
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setmessages(snapshot.docs.map(doc => doc.data()));
      });
  }, []);
  //add message to firestore:
  const addMessage = e => {
    e.preventDefault();
    db.collection('friends')
      .doc('vH9G5htiv9xjr0Yofi8I')
      .collection('messages')
      .add({
        body: singleMsg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setsingleMsg('');
  };
  const [targetElement, settargetElement] = useState('');
  const [usersStyle, setusersStyle] = useState({
    display: 'none',
    position: 'absolute',
    top: '18vh',
    width: '60%',
  });
  const [filtredUsers, setfiltredUsers] = useState([]);
  const [userStyle, setuserStyle] = useState({
    padding: '15px',
    border: '1px solid #333',
    marginBottom: '5px',
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    width: '95%',
  });

  useEffect(() => {
    axios.get('/demo/users').then(e => {
      setusers(e.data);
      setfiltredUsers(e.data);
    });
  }, []);
  let inputRef = useRef();
  useEffect(() => {
    let handler = e => {
      if (!inputRef.current.contains(e.target))
        setusersStyle({ display: 'none' });
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });
  const displayUsers = e => {
    settargetElement(e.target);
    setusersStyle({ display: 'block' });
  };
  const filterUsers = e => {
    setfiltredUsers(
      users.filter(user => {
        // return the user contien letter from input
        if (user.name.toLowerCase().includes(e.target.value)) {
          return user;
        }
      })
    );
  };
  const maskUsers = e => {
    // if you click outside the input
    if (e.target != targetElement) {
      setusersStyle({ display: 'none' });
    }
  };
  return (
    <div>
      <div>
        <input
          style={{ width: '95%', marginTop: '20px' }}
          type='text'
          onClick={displayUsers}
          onKeyUp={filterUsers}
        />
        <div ref={inputRef} style={usersStyle}>
          {filtredUsers.map(user => {
            return (
              <Link to={`/users/${user._id}`}>
                <div key={user.name} style={userStyle}>
                  <h4>{user.name}</h4>
                  <img style={{ width: '50px' }} src={user.image} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div style={{ border: '1px solid #333', width: '95%', height: '80vh' }}>
        <form
          noValidate
          autoComplete='off'
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '19px',
            width: '60%',
            height: '40px',
          }}
        >
          <Input
            id='outlined-basic'
            onChange={e => setsingleMsg(e.target.value)}
            style={{ width: '90%' }}
            value={singleMsg}
          />
          <Button
            disabled={!singleMsg}
            variant='contained'
            color='secondary'
            onClick={addMessage}
            style={{ width: '10%' }}
          >
            Send
          </Button>
        </form>
        <div
          style={{
            margin: '4px, 4px',
            padding: '4px',
            width: '100%',
            height: '80%',
            overflowX: 'auto',
            overflowY: 'auto',
            textAlign: 'justify',
            display: 'flex',
            flexDirection:'column-reverse',
            // top: '0',
            // bottom:'0',
          }}
        >
          {messages.map(message => {
            return (
              <div
                style={{
                  padding: '10px',
                  background: 'gray',
                  margin: '10px',
                  maxWidth: 'fit-content',
                  borderRadius: '5px',
                  position: 'relative',
                  bottom: '0',
                }}
              >
                <h3>{message.body}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MessageMain;
