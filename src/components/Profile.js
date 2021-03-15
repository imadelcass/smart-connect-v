import React, { useState } from 'react';
import { auth, db } from './firebase';
import Header from './Header';
import './style/Profile.css';

function Profile() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const profileBackground =
    'https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_960_720.png';
  const [profileImg, setProfileImg] = useState('');
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
    height: '150px',
    borderRadius: '50%',
  };
  auth.onAuthStateChanged(user => {
    setEmail(user.email);
  });
  const userInfo = () => {
    return new Promise((resolve, reject) => {
      db.collection('users').onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().email == email) {
            resolve(doc.data());
          }
        });
      });
    });
  };
  // and then do that :
  userInfo().then(data => {
    setName(data.name);
    setAge(data.age);
    setProfileImg(data.image);
  });
  return (
    <div className='profile'>
      <Header />
      <div style={{ position: 'relative' }}>
        <img style={styleGround} src={profileBackground} />
        <img style={styleImg} src={profileImg} />
      </div>
      <div style={{ padding: '40px' }} className='profile__info'>
        <div style={{ paddingTop: '60px' }} className='profile__person'>
          <h3 style={{ position: 'relative', left: '2px', fontSize: '26px' }}>
            {name}
          </h3>
          <h3>{`Age : ${age}`}</h3>
          <h3>{`Email : ${email}`}</h3>
        </div>
        <div className='profile__auth'>
        </div>
      </div>
    </div>
  );
}

export default Profile;
