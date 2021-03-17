import React from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
function Header() {
  return (
    <div className='header'>
      <div className='header__logo'>
        <h1>smart connect</h1>
      </div>
      <div className='header__nav'>
        <ul className='nav__list'>
          <li className='nav__item'>
            <Link to='/home'>home</Link>
          </li>
          <li className='nav__item'>
            <Link to='/profile'>profile</Link>
          </li>
          <li className='nav__item'>
            <Link to='/friend'>friend</Link>
          </li>
          <li className='nav__item'>
            <Link to='/message'>Message</Link>
          </li>
          <li className='nav__item'>
            <Link to='/login'>login</Link>
          </li>
          <li className='nav__item'>
            <Link to='/suggestion'>
              <Badge badgeContent={4} color='primary'>
                <NotificationsIcon />
              </Badge>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
