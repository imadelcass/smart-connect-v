import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import axios from './axios';
import { auth } from './firebase';
import Friend from './Friend';

function MessageSide() {
  const [nameEmail, setNameEmail] = useState('');
  const [friends, setfriends] = useState([
    {
      _id: '604608d1842ad404403d27f2',
      idUser: '8U5fFFvEHOcIVq54Wt6S',
      name: 'mohamed elcass',
      image:
        'https://firebasestorage.googleapis.com/v0/b/clone-12b84.appspot.com/o/images%2Fimages.jpg?alt=media&token=3fa25ca0-85d8-4bd4-9d36-0694db25013b',
      email: 'mohamed@gmail.com',
      age: '45',
    },
  ]);
  const [user, setuser] = useState({
    name: '',
    email: '',
    image: '',
    idUser: '',
  });
  const getEmail = () => {
    auth.onAuthStateChanged(user => {
      setNameEmail(user.email);
    });
  };
  useEffect(() => {
    getEmail();
  }, []);
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      resolve(axios.get('/demo/users'));
    });
  };

  const getUser = users => {
    return new Promise((resolve, reject) => {
      users.filter(user => {
        if (user.email == nameEmail) {
          resolve(user);
        }
      });
    });
  };

  fetchData()
    .then(users => getUser(users.data))
    .then(user =>
      setuser({
        name: user.name,
        email: user.email,
        image: user.image,
        idUser: user.idUser,
      })
    );

  return (
    <div
      style={{
        padding: '20px',
        width: '30vw',
        height: '90vh',
        borderRight: '1px solid #333',
      }}
    >
      <div
        style={{ display: 'flex', marginBottom: '20px' }}
        className='Message__head'
      >
        <img
          style={{
            objectFit: 'cover',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
          }}
          src={user.image}
        />
        <h2 style={{ paddingLeft: '20px', position: 'relative', top: '10px' }}>
          Discussions
        </h2>
      </div>
      <div className='friends'>
        {friends.map((friend) => {
          return <Friend name={friend.name} image={friend.image}/>;
        })}
      </div>
    </div>
  );
}

export default MessageSide;
