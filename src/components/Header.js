import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { CurrentUserContext } from './CurrentUserContext';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
function Header() {
  const [current, friendsReq] = useContext(CurrentUserContext);
  const [toggel, setToggel] = useState(false);

  return (
    <div className='header'>
      <div className='header__logo'>
        <h1>smart connect</h1>
      </div>
      <div className='header__nav'>
        <ul className='nav__list'>
          <li className='nav__item'>
            <Link to='/home'>
              <HomeIcon />
            </Link>
          </li>
          <li className='nav__item'>
            <Link to='/profile'>
              <PersonIcon />
            </Link>
          </li>
          <li className='nav__item'>
            <Link to='/friends'>
              <PeopleIcon />
            </Link>
          </li>
          <li className='nav__item'>
            <Link to='/message'>
              <QuestionAnswerIcon />
            </Link>
          </li>
          <li className='nav__item'>
            <Link to='/login'>login</Link>
          </li>
          <li className='nav__item'>
            <Link to='/suggestion'>
              <Badge badgeContent={friendsReq.length} color='primary'>
                <NotificationsIcon />
              </Badge>
            </Link>
          </li>
        </ul>
        <div className='toggelIcon' onClick={() => setToggel(!toggel)}>
          {toggel ? <ClearIcon /> : <MenuIcon />}
        </div>
        <ul className={toggel ? 'nav__listBurgerShow' : 'nav__listBurgerHide'}>
          <li className='nav__itemBurger'>
            <Link to='/home'>home</Link>
          </li>
          <li className='nav__itemBurger'>
            <Link to='/profile'>profile</Link>
          </li>
          <li className='nav__itemBurger'>
            <Link to='/friends'>friend</Link>
          </li>
          <li className='nav__itemBurger'>
            <Link to='/message'>Message</Link>
          </li>
          <li className='nav__itemBurger'>
            <Link to='/login'>login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
