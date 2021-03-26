import React, { useEffect, useState } from 'react';
import Header from './Header';
import ProfileLogic from './ProfileLogic';
import BorderColorIcon from '@material-ui/icons/BorderColor';
function Profile() {
  const { profileBackground, profileImg, email, name, age } = ProfileLogic();
  const [profileGr, setProfileGr] = useState(false);
  useEffect(() => {
    console.log(profileGr);
  }, [profileGr]);
  return (
    <>
      <Header />
      <div className='profile'>
        <div className='profile__inner'>
          <div
            id='profile__ground'
            onMouseMove={() => setProfileGr(true)}
            onMouseLeave={() => setProfileGr(false)}
          >
            <img
              className='profile__groundImg'
              id={profileGr ? 'profile__hover' : ''}
              src={profileBackground}
            />
            <input type='file' id='uploadProfile' style={{ display: 'none' }} />
            <BorderColorIcon
              for='uploadProfile'
              onMouseMove={() => setProfileGr(true)}
              id={profileGr ? '' : 'profile__groundDisabled'}
              className='profile__groundUpdate'
            />
          </div>

          <div className='profile__img'>
            <img src={profileImg} />
            <h1>{name}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;

{
  /* <img className='profile__Ground' src={profileImg} />
<img className='profile__Img' src={profileBackground} /> */
}
{
  /* <div style={{ padding: '40px' }} className='profile__info'>
          <div style={{ paddingTop: '60px' }} className='profile__person'>
            <h3 style={{ position: 'relative', left: '2px', fontSize: '26px' }}>
              {name}
            </h3>
            <h3>{`Age : ${age}`}</h3>
            <h3>{`Email : ${email}`}</h3>
          </div>
          <div className='profile__auth'></div>
        </div> */
}
