import React, { useState } from 'react';
import { auth, db } from './firebase';

const ProfileLogic = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const profileBackground =
    'https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_960_720.png';

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
  return {
    profileBackground,
    profileImg,
    email,
    name,
    age,
  };
};

export default ProfileLogic;
