import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import { db } from './firebase';
import Friend from './Friend';
import Header from './Header';
import WaitData from './WaitData';
import './style/Friends.css';

const Friends = () => {
  const [current, friendsReq] = useContext(CurrentUserContext);
  const [friends, setFriends] = useState([]);
  const [dataState, setDataState] = useState(false);
  const [friend, setFriend] = useState({ name: '', image: '' });

  useEffect(() => {
    //   Get All friends
    if (current.id != undefined) {
      setDataState(true);
      db.collection('users')
        .doc(current.id)
        .collection('friendsList')
        .get()
        .then(data => setFriends(data.docs.map(friend => friend.data())));
    }
  }, [current]);
  return (
    <div className='Friends'>
      <Header />
      <Container maxWidth='lg' className='Friends__container'>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            {!dataState ? (
              <WaitData />
            ) : (
              friends.map(friend => {
                return (
                  <Friend
                    key={friend.id}
                    value={friend.id}
                    name={friend.name}
                    image={friend.image}
                    setFriend={data => setFriend(data)}
                  />
                );
              })
            )}
          </Grid>
          <Grid item xs={2} />

          <Grid item xs={6}>
            <div className='friend__card'>
              <img src={friend.image} />
              <h3>{friend.name}</h3>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Friends;
