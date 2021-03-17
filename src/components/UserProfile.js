import axios from './axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from './firebase';
import Header from './Header';
import { CurrentUserContext } from './CurrentUserContext';

function UserProfile() {
  const [user, setuser] = useState('');
  const [current, setcurrent] = useContext(CurrentUserContext);
  // const [currentUser, setcurrentUser] = useContext(urrentUserContext);
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

  useEffect(() => {
    axios.get(`/demo/users/${id}`).then(user => setuser(user.data));
  }, [id]);
  // add friend request for every user;
  const askToBefriend = () => {
    db.collection('users').doc(user.idUser).collection('friendsRequest').add({
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
          <button onClick={askToBefriend}>ask to be friends</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
