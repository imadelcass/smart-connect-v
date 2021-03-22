import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from './context';
import { EmailContext } from './EmailContext';
import { auth, db, storage } from './firebase';
import './style/CompletProfile.css';
import { UserContext } from './UserContext';
import axios from './axios';
function CompletProfile() {
  const history = useHistory();
  const [nameEmail, setNameEmail] = useContext(EmailContext);
  const [name, setName] = useState('');
  const [age, setage] = useState('');
  let userid = '';
  //const [user, setuser] = useContext(UserContext);
  const blankImg =
    'http://www.puckagency.com/wp-content/uploads/2017/09/blank-profile.jpg';
  const [profileImage, setprofileImage] = useState(blankImg);

  const updateName = e => {
    setName(e.target.value);
  };
  const updateAge = e => {
    setage(e.target.value);
  };
  const extname = nameEmail.slice(0, nameEmail.indexOf('@'));

  // give us user ID :
  const getUsers = e => {
    e.preventDefault();
    // complet this first :
    const userID = () => {
      return new Promise((resolve, reject) => {
        db.collection('users').onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().email == nameEmail) {
              resolve(doc.id);
            }
          });
        });
      });
    };
    // and then do that :
    userID()
      .then(id => {
        //setuserid(id);
        userid = id;
        db.collection('users').doc(id).update({
          age: age,
          image: profileImage,
          name: name,
          id: id,
        });
        history.push('/profile');
      })
      .then(() => {
        //Post data to API
        // const postData = e => {
        axios
          .post('/demo/users', {
            idUser: userid,
            name: name,
            image: profileImage,
            email: nameEmail,
            age: age,
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        //};
      });
  };
  // upload profile image to firebase storage
  const updateImage = e => {
    const uploadTask = storage
      .ref(`images/${e.target.files[0].name}`)
      .put(e.target.files[0]);
    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then(url => {
            setprofileImage(url);
          });
      }
    );
  };

  auth.onAuthStateChanged(user => {
    setNameEmail(user.email);
  });
  return (
    <div className='completProfile'>
      <h1>Hi {extname} , one more step to done</h1>
      <img
        src={profileImage}
        className='completProfile__profileImg'
        alt='profile'
      />
      <form className='completProfil__form'>
        <label className='completProfile__age' htmlFor='age'>
          Your name :
        </label>
        <input type='text' id='age' value={name} onChange={updateName} />
        <label className='completProfile__age' htmlFor='age'>
          Your age :
        </label>
        <input type='text' id='age' value={age} onChange={updateAge} />
        <label className='completProfile__uploadImg' access='image/*'>
          Choose your image :
        </label>
        <input
          className='completProfile__inputFile'
          type='file'
          id='uploadImg'
          onChange={updateImage}
        />
        <button className='completProfile__button' onClick={getUsers}>
          submit
        </button>
      </form>
    </div>
  );
}
export default CompletProfile;
