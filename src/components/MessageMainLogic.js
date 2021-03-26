import {
  Button,
  TextField,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from './axios';
import { db } from './firebase';
import firebase from 'firebase';
import { DocumentContext } from './DocumentContext';
import { CurrentUserContext } from './CurrentUserContext';
const image =
  'https://firebasestorage.googleapis.com/v0/b/clone-12b84.appspot.com/o/images%2Fimad.jpg?alt=media&token=005c8f74-c327-491e-badc-eaf25a17e1ff';
function MessageMainLogic() {
  const [current, friendsReq] = useContext(CurrentUserContext);
  const [doc, setDoc] = useContext(DocumentContext);
  const [users, setusers] = useState([]);
  const [singleMsg, setsingleMsg] = useState('');
  const [messages, setmessages] = useState([]);
  const [usersStyle, setusersStyle] = useState({
    display: 'none',
    position: 'absolute',
    top: '18vh',
    width: '60%',
  });
  // 1
  // get messages from firestore
  useEffect(() => {
    if (doc.state == true) {
      db.collection('friends')
        .doc(doc.id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
          setmessages(snapshot.docs.map(doc => doc.data()));
        });
    }
  }, [doc]);

  //add message to firestore:
  const addMessage = e => {
    e.preventDefault();
    db.collection('friends').doc(doc.id).collection('messages').add({
      transmitter: current.name,
      body: singleMsg,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setsingleMsg('');
  };
  const [targetElement, settargetElement] = useState('');
  const [filtredUsers, setfiltredUsers] = useState([]);
  let inputRef = useRef();

  // 2
  const abortController = new AbortController();
  const signal = abortController.signal;
  useEffect(() => {
    axios.get('/demo/users', { signal: signal }).then(e => {
      setusers(e.data);
      setfiltredUsers(e.data);
    });

    //clean
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  // 3
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

  return {
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
  };
}

export default MessageMainLogic;
