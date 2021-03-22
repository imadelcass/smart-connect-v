import axios from './axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from './firebase';
import Header from './Header';
import { CurrentUserContext } from './CurrentUserContext';
import { Button } from '@material-ui/core';

function UserProfile() {
  const [user, setuser] = useState('');
  const [askBtnState, setaskBtnState] = useState(true);
  const [current, friendsReq] = useContext(CurrentUserContext);
  const profileBackground = require('./img/logo.png').default;
  const styleGround = {
    width: '100%',
    height: '35vh',
    objectFit: 'cover',
  };
  const styleImg = {
    position: 'absolute',
    left: '30px',
    bottom: '-25%',
    width: '180px',
    borderRadius: '50%',
  };
  const { id } = useParams();
  const abortController = new AbortController();
  const signal = abortController.signal;
  useEffect(() => {
    axios
      .get(`/demo/users/${id}`, { signal, signal })
      .then(user => setuser(user.data));
    //clean
    return function cleanup() {
      abortController.abort();
    };
  }, [id]);

  useEffect(() => {
    if (current.id == undefined) {
      setaskBtnState(true);

    } else if (current.id != undefined) {
      setaskBtnState(false);
    }
  }, [current]);

  // add friend request for every user;
  const askToBefriend = () => {
    db.collection('users')
      .doc(user.idUser)
      .collection('friendsRequest')
      .doc(current.id)
      .set({
        id: current.id,
        name: current.name,
        email: current.email,
        age: current.age,
        image: current.image,
      });
  };

  return (
    <div className='profile'>
      <Header />
      <div style={{ position: 'relative' }}>
        <img style={styleGround} src={profileBackground} />
        <img style={styleImg} src={user.image} />
      </div>
      <div
        style={{
          padding: '40px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        className='profile__info'
      >
        <div style={{ paddingTop: '60px' }} className='profile__person'>
          <h3 style={{ position: 'relative', left: '2px', fontSize: '26px' }}>
            {user.name}
          </h3>
          <h3>{`Age : ${user.age}`}</h3>
          <h3>{`Email : ${user.email}`}</h3>
        </div>
        <div className='profile__auth'>
          <Button
            variant='contained'
            color='primary'
            disabled={askBtnState}
            onClick={askToBefriend}
          >
            ask to be friends
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
