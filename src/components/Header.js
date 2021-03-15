import React from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';

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
            <a href='#'>suggestion</a>
          </li>
          <li className='nav__item'>
            <Link to='/login'>login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
